import { defineConfig } from "tsup";

export default defineConfig({
  sourcemap: true,
  entry: ["src/index.ts"],
  dts: true,
  clean: true,
  format: ["esm"],
  minify: true,
  target: "esnext",
  outDir: "dist",
});
