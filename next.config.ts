import { paraglide } from "@inlang/paraglide-next/plugin";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  compiler: {
    removeConsole: false,
  },
};

export default paraglide({
  paraglide: {
    project: "./project.inlang",
    outdir: "./src/paraglide",
  },
  ...nextConfig,
});
