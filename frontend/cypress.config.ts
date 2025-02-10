import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://mirfac.uberspace.de:46081', // Haupturl
  },
});
