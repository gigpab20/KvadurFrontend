import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://0.0.0.0:46081', // Passen Sie dies an Ihre tatsächliche URL an
  },
});
