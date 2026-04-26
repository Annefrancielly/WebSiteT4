"use strict";

function resolveKingHostPort() {
  if (process.env.PORT && /^\d+$/.test(process.env.PORT)) {
    return Number(process.env.PORT);
  }

  const fromPortPrefix = Object.entries(process.env)
    .filter(([key, value]) => key.startsWith("PORT_") && typeof value === "string" && /^\d+$/.test(value))
    .map(([, value]) => Number(value))[0];

  return fromPortPrefix || 3000;
}

const port = resolveKingHostPort();

process.env.PORT = String(port);
process.env.NODE_ENV = process.env.NODE_ENV || "production";
process.env.HOSTNAME = process.env.HOSTNAME || "0.0.0.0";

console.log("[kinghost] PORT resolvida =", process.env.PORT);
console.log("[kinghost] Server entry =", "/WebSiteT4/apps/web/server.js");

require("./WebSiteT4/apps/web/server.js");
