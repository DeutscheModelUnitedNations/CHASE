import { paraglide } from "@inlang/paraglide-next/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./src/paraglide",
  },
  ...nextConfig,
});
