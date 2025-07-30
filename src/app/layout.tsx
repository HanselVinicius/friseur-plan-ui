import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './Providers'
import SessionGuard from './component/SessionGuard'

export const metadata: Metadata = {
  title: 'Minha App',
  description: 'Autenticação com Keycloak',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SessionGuard>
            {children}
          </SessionGuard>
        </Providers>
      </body>
    </html>
  )
}