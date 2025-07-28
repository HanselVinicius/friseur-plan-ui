import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { getServerSession } from "next-auth"
import SessionWrapper from './component/SessionWrapper'
import { authOptions } from './api/auth/[...nextauth]/route'

export const metadata: Metadata = {
  title: 'Minha App',
  description: 'Autenticação com Keycloak',
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body>
        <SessionWrapper session={session}>
          {children}
        </SessionWrapper>
      </body>
    </html>
  )
}