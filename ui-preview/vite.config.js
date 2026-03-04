import { defineConfig } from "vite";

export default defineConfig({
    server: {
        allowedHosts: ["innovai.swaif.local"],
    },
    preview: {
        allowedHosts: ["innovai.swaif.local"],
    },
});
