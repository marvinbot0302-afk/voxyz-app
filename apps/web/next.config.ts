import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Locally, this workspace can sometimes have a root-owned `.next/` directory from
  // earlier builds. Use a project-specific distDir to avoid permission issues.
  //
  // On Vercel, Next is expected to output to `.next/` (or you must also configure
  // Vercel's Output Directory). So we keep the default on Vercel.
  distDir: process.env.VERCEL ? ".next" : ".next-web",
};

export default nextConfig;
