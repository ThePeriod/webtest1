import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    globals: true
  },
  define: {
    'import.meta.env.PUBLIC_SUPABASE_URL': JSON.stringify('https://qwhmikaxsxvknymublnm.supabase.co'),
    'import.meta.env.PUBLIC_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3aG1pa2F4c3h2a255bXVibG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3ODU3MTQsImV4cCI6MjA1MjM2MTcxNH0.gCE8K1Ll0UUEnFvv8hAyiFEOkLOtKrugyVitEnrXdcM')
  }
});
