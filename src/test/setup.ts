import { beforeAll, afterAll, vi } from 'vitest';

beforeAll(() => {
  // Configurar mocks globales si es necesario
  vi.mock('@supabase/supabase-js', () => {
    return {
      createClient: () => ({
        auth: {
          signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
            if (email === 'test@example.com' && password === 'testPassword123!') {
              return {
                data: {
                  session: { user: { email } }
                },
                error: null
              };
            }
            return {
              data: { session: null },
              error: new Error('Invalid login credentials')
            };
          }
        }
      })
    };
  });
});

afterAll(() => {
  vi.clearAllMocks();
});
