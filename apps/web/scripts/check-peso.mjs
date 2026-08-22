/**
 * Orçamento de bytes do pacote publicado.
 *
 * Em produção o next.config.ts usa images.unoptimized: true — o otimizador do
 * Next não roda. O arquivo que entra no commit é exatamente o arquivo que o
 * visitante baixa. Sem uma trava automática, imagem em resolução de câmera
 * chega à produção sem ninguém notar: foi assim que public/ chegou a 78 MB e
 * que curso-iniciante.jpg ficou servindo 6,9 MB em vez de 285 KB.
 *
 * Uso: node scripts/check-peso.mjs
 */

import { readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve("out");

const LIMITE_POR_ARQUIVO = 500 * 1024;        // 500 KB
const LIMITE_TOTAL = 25 * 1024 * 1024;        // 25 MB — hoje o build tem ~17 MB
const EXTENSOES_DE_MIDIA = /\.(jpe?g|png|gif|webp|avif|mp4|webm|mov|pdf)$/i;

/**
 * Dívida declarada, medida em 22/08/2026.
 *
 * São três fotografias salvas em PNG — o formato errado para foto — e juntas
 * somam 7 MB. Elas NÃO passam a ser aceitáveis: continuam sendo listadas em
 * cada execução, com o tamanho atual, para não sumirem do radar.
 *
 * Ficam aqui porque um gate que nasce vermelho é um gate que a equipe aprende
 * a ignorar. Convertidas para WebP, remova a linha correspondente — e o limite
 * volta a valer para elas.
 */
const DIVIDA_CONHECIDA = [
  "/courses/Banner-Desktop-T4.png",
  "/courses/Banner-Mobile-T4.png",
  "/TBC.png",
];

if (!existsSync(OUT)) {
  console.error('❌ Pasta out/ não encontrada. Rode "npm run build" antes.');
  process.exit(1);
}

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1);
}

function kb(bytes) {
  return Math.round(bytes / 1024);
}

async function varrer(dir) {
  const entradas = await readdir(dir, { withFileTypes: true });
  let total = 0;
  const pesados = [];

  for (const entrada of entradas) {
    const caminho = join(dir, entrada.name);

    if (entrada.isDirectory()) {
      const r = await varrer(caminho);
      total += r.total;
      pesados.push(...r.pesados);
      continue;
    }

    const { size } = await stat(caminho);
    total += size;

    // O limite vale para mídia. Um chunk de JS grande é problema de outra
    // natureza e teria outro limite — misturar os dois só geraria ruído.
    if (size > LIMITE_POR_ARQUIVO && EXTENSOES_DE_MIDIA.test(entrada.name)) {
      pesados.push({ caminho: caminho.replace(OUT, ""), size });
    }
  }

  return { total, pesados };
}

const { total, pesados } = await varrer(OUT);

const conhecidos = pesados.filter((f) => DIVIDA_CONHECIDA.includes(f.caminho));
const novos = pesados.filter((f) => !DIVIDA_CONHECIDA.includes(f.caminho));

const ordenarPorTamanho = (a, b) => b.size - a.size;
const linha = (f) => `  ${String(kb(f.size)).padStart(6)} KB  ${f.caminho}`;

console.log(`Pacote out/: ${mb(total)} MB  (limite ${mb(LIMITE_TOTAL)} MB)`);

if (conhecidos.length) {
  console.log(`\n📌 Dívida declarada — ${conhecidos.length} arquivo(s), ${mb(conhecidos.reduce((s, f) => s + f.size, 0))} MB:`);
  conhecidos.sort(ordenarPorTamanho).forEach((f) => console.log(linha(f)));
}

// Item da dívida que já foi resolvido: some da lista sozinho.
const resolvidos = DIVIDA_CONHECIDA.filter(
  (c) => !pesados.some((f) => f.caminho === c)
);

if (resolvidos.length) {
  console.log(`\n🎉 Dívida resolvida — remova de DIVIDA_CONHECIDA no script:`);
  resolvidos.forEach((c) => console.log(`  ${c}`));
}

if (novos.length) {
  console.error(`\n❌ ${novos.length} arquivo(s) de mídia NOVO(S) acima de ${kb(LIMITE_POR_ARQUIVO)} KB:`);
  novos.sort(ordenarPorTamanho).forEach((f) => console.error(linha(f)));
  console.error(
    "\n  Referência: 1600px de largura para conteúdo, 2000px para fundo," +
      "\n  WebP ou JPEG progressivo em qualidade ~80. PNG só para gráfico chapado —" +
      "\n  fotografia em PNG é a causa mais comum de arquivo gigante."
  );
}

const estourouTotal = total > LIMITE_TOTAL;

if (estourouTotal) {
  console.error(`\n❌ Pacote acima do limite: ${mb(total)} MB`);
}

if (novos.length || estourouTotal) process.exit(1);

console.log(
  conhecidos.length
    ? "\n✅ Nenhum arquivo pesado novo (a dívida acima continua pendente)"
    : "\n✅ Peso dentro do orçamento"
);
