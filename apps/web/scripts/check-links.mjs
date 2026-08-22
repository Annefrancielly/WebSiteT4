/**
 * Verifica o build estático em out/ antes da publicação.
 *
 * Cobre as três falhas que este projeto realmente sofre:
 *
 * 1. Link ou asset interno que não existe no disco. Com trailingSlash e a
 *    possibilidade de basePath, um caminho pode funcionar em `next dev` e
 *    quebrar publicado — já aconteceu aqui com COURSE_DETAILS.image e logo.png.
 *
 * 2. target="_blank" sem noopener. É o vetor de tabnabbing: a página de destino
 *    ganha referência à aba de origem.
 *
 * 3. noreferrer em link de checkout. NÃO é erro de segurança — é perda de
 *    receita: sem o cabeçalho Referer a Kiwify não sabe de onde veio a venda.
 *    O CheckoutLink.tsx documenta essa decisão; este passo garante que ela não
 *    se perca em um componente novo.
 *
 * Uso: node scripts/check-links.mjs
 * Sai com código 1 se houver erro, para poder encadear com && no npm script.
 */

import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve("out");
const DOMINIOS_DE_CHECKOUT = ["pay.kiwify.com.br", "kiwify.app"];

const erros = [];
const avisos = [];

if (!existsSync(OUT)) {
  console.error('❌ Pasta out/ não encontrada. Rode "npm run build" antes.');
  process.exit(1);
}

async function listarHtml(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  const encontrados = [];

  for (const entrada of entradas) {
    const caminho = join(dir, entrada.name);
    if (entrada.isDirectory()) encontrados.push(...(await listarHtml(caminho)));
    else if (entrada.name.endsWith(".html")) encontrados.push(caminho);
  }

  return encontrados;
}

/**
 * Uma rota como "/cursos/" existe no disco como "out/cursos/index.html".
 * A âncora e a query são descartadas: "/#sobre" resolve para "/".
 */
function resolveNoDisco(url) {
  const semAncora = url.split(/[?#]/)[0];
  if (semAncora === "" || semAncora === "/") return existsSync(join(OUT, "index.html"));

  const base = join(OUT, decodeURIComponent(semAncora));

  return (
    existsSync(base) ||
    existsSync(join(base, "index.html")) ||
    existsSync(`${base}.html`)
  );
}

const arquivos = await listarHtml(OUT);

for (const arquivo of arquivos) {
  const html = await readFile(arquivo, "utf8");
  const rota = arquivo.replace(OUT, "").replace(/\\/g, "/");

  // Apenas caminhos que começam com "/" — os externos começam com http.
  for (const [, url] of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (!resolveNoDisco(url)) {
      erros.push(`${rota}\n    link quebrado: ${url}`);
    }
  }

  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    const rel = tag.match(/rel="([^"]*)"/)?.[1] ?? "";
    const trecho = tag.slice(0, 110);

    if (!rel.includes("noopener")) {
      erros.push(`${rota}\n    target="_blank" sem noopener: ${trecho}`);
    }

    const ehCheckout = DOMINIOS_DE_CHECKOUT.some((d) => tag.includes(d));

    if (ehCheckout && rel.includes("noreferrer")) {
      avisos.push(
        `${rota}\n    noreferrer em link de checkout — cega a atribuição de venda na Kiwify:\n    ${trecho}`
      );
    }
  }
}

console.log(`Verificadas ${arquivos.length} páginas em out/`);

if (avisos.length) {
  console.warn(`\n⚠️  ${avisos.length} aviso(s):\n` + avisos.join("\n"));
}

if (erros.length) {
  console.error(`\n❌ ${erros.length} erro(s):\n` + erros.join("\n"));
  process.exit(1);
}

console.log("✅ Links, assets e atributos rel OK");
