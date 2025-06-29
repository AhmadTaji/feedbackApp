import { NextResponse } from 'next/server';

export function middleware(request) {
  const origin = request.headers.get('origin') || '*';
  const response = NextResponse.next();

  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', '*');

  return response;
}