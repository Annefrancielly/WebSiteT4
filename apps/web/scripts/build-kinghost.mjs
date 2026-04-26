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

function exists(filePath) {
  return fs.existsSync(filePath);
}

function findStandaloneServer(startDir) {
  const preferredCandidates = [
    path.join(startDir, "server.js"),
    path.join(startDir, "apps", "web", "server.js"),
    path.join(startDir, "web", "server.js"),
  ];

  for (const candidate of preferredCandidates) {
    if (exists(candidate)) {
      return candidate;
    }
  }

  const stack = [startDir];

  while (stack.length > 0) {
    const currentDir = stack.pop();
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.name === "node_modules" || entry.name === ".git") {
        continue;
      }

      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name === "server.js") {
        return fullPath;
      }
    }
  }

  throw new Error(
    `Não foi possível localizar o server.js do standalone dentro de: ${startDir}`
  );
}

console.log("1) Next build (standalone)...");
execSync("next build", { stdio: "inherit" });

console.log("2) Limpando dist...");
rm(DIST);
ensureDir(DIST);

console.log("3) Copiando .next/standalone -> dist...");
copy(STANDALONE, DIST);

const serverFile = findStandaloneServer(DIST);
const serverDir = path.dirname(serverFile);
const serverRequirePath =
  "./" + path.relative(DIST, serverFile).replace(/\\/g, "/");

console.log("4) Server standalone encontrado em:", serverRequirePath);

console.log("5) Copiando .next/static para a raiz real do standalone...");
ensureDir(path.join(serverDir, ".next"));
copy(STATIC, path.join(serverDir, ".next", "static"));

console.log("6) Copiando public para a raiz real do standalone...");
copy(PUBLIC, path.join(serverDir, "public"));

console.log("7) Criando wrapper KingHost (dist/app.js)...");
const wrapper = `"use strict";

function resolveKingHostPort() {
  if (process.env.PORT && /^\\d+$/.test(process.env.PORT)) {
    return Number(process.env.PORT);
  }

  const fromPortPrefix = Object.entries(process.env)
    .filter(([key, value]) => key.startsWith("PORT_") && typeof value === "string" && /^\\d+$/.test(value))
    .map(([, value]) => Number(value))[0];

  return fromPortPrefix || 3000;
}

const port = resolveKingHostPort();

process.env.PORT = String(port);
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

console.log("[kinghost] PORT resolvida =", process.env.PORT);
console.log("[kinghost] Server entry =", ${JSON.stringify(serverRequirePath)});

require(${JSON.stringify(serverRequirePath)});
`;

fs.writeFileSync(path.join(DIST, "app.js"), wrapper, "utf8");

console.log("✅ Build pronto em:", DIST);