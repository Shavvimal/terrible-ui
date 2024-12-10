'use server';

import { createClient } from '@/lib/supabase/server';

export async function signUp(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message || error.code,
      success: false,
    };
  }

  return { success: true };
}
