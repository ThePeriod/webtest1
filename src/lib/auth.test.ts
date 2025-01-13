import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { supabase } from './supabase';

describe('Authentication Tests', () => {
  const testEmail = 'test@example.com';
  const testPassword = 'testPassword123!';
  
  it('should be properly configured', () => {
    expect(supabase).toBeDefined();
    expect(supabase.auth).toBeDefined();
  });

  it('should fail with invalid credentials', async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    });

    expect(error).toBeDefined();
    expect(data.session).toBeNull();
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
