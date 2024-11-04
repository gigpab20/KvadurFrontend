import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3003', // Passen Sie dies an Ihre tatsächliche URL an
  },
});
