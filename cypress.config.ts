import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:46080/', // Passen Sie dies an Ihre tatsächliche URL an
  },
});
