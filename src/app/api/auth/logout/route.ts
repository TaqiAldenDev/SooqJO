import { authService } from '@/services/authService';
import { NextResponse } from 'next/server';

export async function POST() {
  await authService.logout();
  return NextResponse.json({ success: true });
}
