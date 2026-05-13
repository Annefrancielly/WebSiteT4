import type { NextConfig } from "next";

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();

const basePath =
  rawBasePath && rawBasePath !== "/" ? rawBasePath : undefined;

const isKingHostStatic =
  process.env.NEXT_PUBLIC_DEPLOY_TARGET === "kinghost-static";

const nextConfig: NextConfig = {
  ...(isKingHostStatic
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        output: "standalone",
      }),

  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;