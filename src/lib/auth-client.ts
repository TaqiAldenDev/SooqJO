import { createClient } from '@/lib/supabase/client';

export const initiateOAuth = async (provider: 'google' | 'facebook') => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    },
  });

  if (error) {
    throw error;
  }
};
