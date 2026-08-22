/**
 * Fotografa o texto renderizado de cada página e compara com a foto anterior.
 *
 * Este é o substituto barato da suíte de testes durante a refatoração. O projeto
 * não tem Jest nem Vitest, e montar cobertura para um site de marketing de seis
 * páginas seria desproporcional. O que realmente precisa ser garantido é outra
 * coisa: que um refactor não apague conteúdo sem ninguém perceber.
 *
 * Fluxo:
 *   na main, antes de refatorar   → node scripts/snapshot-conteudo.mjs salvar
 *   depois de cada alteração      → node scripts/snapshot-conteudo.mjs
 *
 * Não falha o build de propósito. Refatoração muda conteúdo o tempo todo; o
 * valor está em você DECIDIR se cada mudança era intencional, em vez de
 * descobrir depois que uma seção sumiu.
 *
 * O arquivo .snapshot-conteudo.json deve ser commitado: ele é a linha de base
 * compartilhada, não um artefato local.
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve("out");
const ARQUIVO = resolve("scripts/.snapshot-conteudo.json");
const modo = process.argv[2] ?? "comparar";

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

function extrair(html) {
  const texto = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  // Só frases longas o bastante para serem conteúdo de verdade. Fragmentos
  // curtos são ruído de markup e gerariam diff a cada mudança de layout.
  const frases = texto
    .split(/(?<=[.!?])\s+/)
    .map((f) => f.trim())
    .filter((f) => f.length > 25);

  return {
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "",
    description: html.match(/<meta name="description" content="([^"]*)"/i)?.[1] ?? "",
    frases,
  };
}

const atual = {};

for (const arquivo of await listarHtml(OUT)) {
  const rota = arquivo.replace(OUT, "").replace(/\\/g, "/");
  atual[rota] = extrair(await readFile(arquivo, "utf8"));
}

if (modo === "salvar") {
  await writeFile(ARQUIVO, JSON.stringify(atual, null, 2));
  console.log(`✅ Linha de base salva — ${Object.keys(atual).length} páginas`);
  console.log(`   ${ARQUIVO}`);
  process.exit(0);
}

if (!existsSync(ARQUIVO)) {
  console.error("❌ Nenhuma linha de base encontrada.");
  console.error("   Rode: node scripts/snapshot-conteudo.mjs salvar");
  process.exit(1);
}

const anterior = JSON.parse(await readFile(ARQUIVO, "utf8"));
let houveMudanca = false;

const rotas = [...new Set([...Object.keys(anterior), ...Object.keys(atual)])].sort();

for (const rota of rotas) {
  const antes = anterior[rota];
  const agora = atual[rota];

  if (!agora) {
    console.log(`\n🔴 PÁGINA REMOVIDA: ${rota}`);
    houveMudanca = true;
    continue;
  }

  if (!antes) {
    console.log(`\n🟢 PÁGINA NOVA: ${rota}`);
    houveMudanca = true;
    continue;
  }

  const linhas = [];

  if (antes.title !== agora.title) {
    linhas.push(`   title\n     antes: ${antes.title}\n     agora: ${agora.title}`);
  }

  if (antes.description !== agora.description) {
    linhas.push(`   description\n     antes: ${antes.description}\n     agora: ${agora.description}`);
  }

  const sumiram = antes.frases.filter((f) => !agora.frases.includes(f));
  const surgiram = agora.frases.filter((f) => !antes.frases.includes(f));

  for (const f of sumiram) linhas.push(`   🔴 sumiu:  ${f.slice(0, 120)}`);
  for (const f of surgiram) linhas.push(`   🟢 surgiu: ${f.slice(0, 120)}`);

  if (linhas.length) {
    console.log(`\n📄 ${rota}`);
    console.log(linhas.join("\n"));
    houveMudanca = true;
  }
}

console.log(
  houveMudanca
    ? "\n⚠️  Revise as diferenças acima. Foram todas intencionais?"
    : "\n✅ Conteúdo idêntico à linha de base."
);
