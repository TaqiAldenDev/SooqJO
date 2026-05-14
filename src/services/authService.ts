import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { LoginInput, RegisterInput } from '@/lib/validators/auth';
import { comparePassword, hashPassword } from '@/lib/password';
import { signToken } from '@/lib/jwt';
import { UserProfile } from '@/types';

export const authService = {
  async login({ email, password }: LoginInput) {
    const supabase = createAdminClient();
    
    // Fetch user from profiles table (assuming we store custom auth info there)
    // Note: In a real Supabase setup, you might use Supabase Auth, 
    // but AGENT.md specifies "Custom JWT" and "bcryptjs", 
    // which implies a custom user management or specific profile handling.
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !user) {
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        full_name: user.full_name,
      },
      token,
    };
  },

  async register({ email, password, fullName }: RegisterInput) {
    const supabase = createAdminClient();
    
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const passwordHash = await hashPassword(password);

    const { data: newUser, error } = await supabase
      .from('profiles')
      .insert({
        email,
        password_hash: passwordHash,
        full_name: fullName,
        role: 'CUSTOMER', // Default role
      })
      .select()
      .single();

    if (error) {
      throw new Error('Failed to register user');
    }

    const token = signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        full_name: newUser.full_name,
      },
      token,
    };
  },

  async getCurrentUser(token: string): Promise<UserProfile | null> {
    const supabase = createAdminClient();
    // In a real app, you'd verify the token first (handled in middleware/api)
    // Here we just fetch the profile
    const { data: user, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', token) // This is just a placeholder, logic would use decoded token
      .single();

    if (error || !user) return null;
    return user as UserProfile;
  }
};
