import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001', // Passen Sie dies an Ihre tatsächliche URL an
  },
});
