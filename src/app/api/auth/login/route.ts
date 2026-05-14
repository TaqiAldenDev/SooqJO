import { NextResponse } from 'next/server';
import { authService } from '@/services/authService';
import { loginSchema } from '@/lib/validators/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // 1. Validation
    const validatedData = loginSchema.safeParse(body);
    if (!validatedData.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validatedData.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // 2. Authentication
    const { user, token } = await authService.login(validatedData.data);

    // 3. Set HTTP-only cookie
    const response = NextResponse.json({ user });
    
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message || 'Authentication failed' },
      { status: 401 }
    );
  }
}
