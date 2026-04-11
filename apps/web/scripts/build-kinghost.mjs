import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const DIST = path.join(ROOT, "dist", "kinghost-web");

const NEXT_DIR = path.join(ROOT, ".next");
const STANDALONE = path.join(NEXT_DIR, "standalone");
const STATIC = path.join(NEXT_DIR, "static");
const PUBLIC = path.join(ROOT, "public");

function rm(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copy(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

console.log("1) Next build (standalone)...");
execSync("next build", { stdio: "inherit" });

console.log("2) Limpando dist...");
rm(DIST);
ensureDir(DIST);

console.log("3) Copiando .next/standalone -> dist...");
copy(STANDALONE, DIST);

console.log("4) Copiando .next/static -> dist/.next/static...");
ensureDir(path.join(DIST, ".next"));
copy(STATIC, path.join(DIST, ".next", "static"));

console.log("5) Copiando public -> dist/public...");
copy(PUBLIC, path.join(DIST, "public"));

console.log("6) Criando wrapper KingHost (dist/app.js)...");
const wrapper = `"use strict";

function resolveKingHostPort() {
  // 1) Se existir PORT "padrão", usa primeiro.
  if (process.env.PORT && /^\\d+$/.test(process.env.PORT)) return Number(process.env.PORT);

  // 2) KingHost costuma expor porta como PORT_<NOME_DO_SCRIPT> (ex.: PORT_APP).
  // Então buscamos a primeira variável PORT_* numérica.
  const fromPortPrefix = Object.entries(process.env)
    .filter(([k, v]) => k.startsWith("PORT_") && typeof v === "string" && /^\\d+$/.test(v))
    .map(([, v]) => Number(v))[0];

  return fromPortPrefix || 3000;
}

const port = resolveKingHostPort();

// Garantimos que o server do Next vai ler a porta correta.
process.env.PORT = String(port);
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

console.log("[kinghost] PORT resolvida =", process.env.PORT);

// Server gerado pelo Next (standalone)
require("./server.js");
`;

fs.writeFileSync(path.join(DIST, "app.js"), wrapper, "utf8");

console.log("✅ Build pronto em:", DIST);
