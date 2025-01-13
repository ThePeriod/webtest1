import { describe, it, expect, beforeEach } from 'vitest';
import { supabase } from './supabase';

describe('Authentication Tests', () => {
  const testEmail = 'test@example.com';
  const testPassword = 'testPassword123!';

  beforeEach(() => {
    // Limpiar cualquier estado previo si es necesario
  });

  it('should be properly configured', () => {
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it('should succeed with valid credentials', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });

    expect(error).toBeNull();
    expect(data.session).toBeDefined();
    expect(data.session?.user.email).toBe(testEmail);
  });

  it('should fail with invalid credentials', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    });

    expect(error).toBeDefined();
    expect(data.session).toBeNull();
    expect(error?.message).toBe('Invalid login credentials');
  });

  it('should handle empty credentials', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: '',
      password: ''
    });

    expect(error).toBeDefined();
    expect(data.session).toBeNull();
  });
});
