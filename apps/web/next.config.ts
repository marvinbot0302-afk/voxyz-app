import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // NOTE: This workspace can sometimes have a root-owned `.next/` directory from
  // earlier builds. Use a project-specific distDir to avoid permission issues.
  distDir: ".next-web",
};

export default nextConfig;
