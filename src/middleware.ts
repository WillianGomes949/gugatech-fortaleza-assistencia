// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 1. Defina aqui as rotas que você quer proteger
export const config = {
  matcher: [
    '/admin', // A página de admin
    '/api/admin/:path*', // TODAS as suas APIs de admin (delete, update, etc.)
  ],
}

// 2. A função de middleware
export function middleware(req: NextRequest) {
  // 3. Pega o usuário e senha das variáveis de ambiente
  const basicAuth = req.headers.get('authorization')
  const expectedUser = process.env.ADMIN_USER || 'admin'
  const expectedPass = process.env.ADMIN_PASS || 'password'

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1] // Pega o token '...=='
    const [user, pass] = atob(authValue).split(':') // Decodifica de base64

    // 4. Compara o login
    if (user === expectedUser && pass === expectedPass) {
      return NextResponse.next() // Login correto, continue
    }
  }

  // 5. Login incorreto ou não fornecido
  // Pede o login (dispara o pop-up do navegador)
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
