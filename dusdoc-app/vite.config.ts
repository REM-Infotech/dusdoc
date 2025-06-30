import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueStyledPlugin from "@vue-styled-components/plugin";
import { BootstrapVueNextResolver } from "bootstrap-vue-next";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5174,
    allowedHosts: ["dusdoc.robotz.dev", "5173--main--vuedusdoc--robotz213.try.robotz.dev"],
    cors: {
      origin: "https://dusdoc.robotz.dev",
    },
  },
  plugins: [
    tailwindcss(),
    vue(),
    vueJsx(),
    vueDevTools(),
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
    vueStyledPlugin(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
  },
});
