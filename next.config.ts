import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

const localDevOrigins = Object.values(networkInterfaces())
  .flatMap((interfaces) => interfaces ?? [])
  .filter(
    (network) => network.family === "IPv4" && !network.internal,
  )
  .map((network) => network.address);

const nextConfig: NextConfig = {
  distDir: process.env.SHOETRACK_NEXT_DIST_DIR || ".next",
  allowedDevOrigins:
    process.env.NODE_ENV === "development"
      ? [...new Set(["127.0.0.1", ...localDevOrigins])]
      : undefined,
};

export default nextConfig;
