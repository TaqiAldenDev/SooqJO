import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { authService } from '@/services/authService';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in search params, use it as the redirection URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      try {
        // Sync the Supabase user with our custom profiles and JWT system
        await authService.socialLoginSync(data.user);
        
        const forwardedHost = request.headers.get('x-forwarded-host'); // useful for production
        const isLocalEnv = process.env.NODE_ENV === 'development';
        
        if (isLocalEnv) {
          // we can be sure that there's no Proxy in between in local dev
          return NextResponse.redirect(`${origin}${next}`);
        } else if (forwardedHost) {
          return NextResponse.redirect(`https://${forwardedHost}${next}`);
        } else {
          return NextResponse.redirect(`${origin}${next}`);
        }
      } catch (err) {
        console.error('Social login sync error:', err);
        return NextResponse.redirect(`${origin}/login?error=Social login failed`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=Authentication failed`);
}
