import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts", "src/button.tsx", "src/card.tsx"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: ["react"],
  noExternal: ["clsx", "tailwind-merge"],
}) 