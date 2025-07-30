import NextAuth, { Account, AuthOptions, TokenSet } from "next-auth";
import { JWT } from "next-auth/jwt";
import KeycloakProvider from "next-auth/providers/keycloak"

export const authOptions: AuthOptions = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 30
  },
  callbacks: {
    async jwt({ token, account }) {
      return await jwtCallback(token, account)
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken
      return session
    },
  },
}

async function jwtCallback(token: JWT, account: Account | null): Promise<JWT> {
  if (account) {
    token.idToken = account.id_token
    token.accessToken = account.access_token
    token.refreshToken = account.refresh_token
    token.expiresAt = account.expires_at
    return token
  }
  if (Date.now() < (token.expiresAt as number * 1000 - 60 * 1000)) {
    return token
  }
  try {
    const response = await requestRefreshOfAccessToken(token)

    const tokens: TokenSet = await response.json()

    if (!response.ok) throw tokens

    const updatedToken: JWT = {
      ...token,
      idToken: tokens.id_token,
      accessToken: tokens.access_token,
      expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
      refreshToken: tokens.refresh_token ?? token.refreshToken,
    }
    return updatedToken
  } catch (error) {
    console.error("Error refreshing access token", error)
    token.error = "RefreshTokenError"
    return token
  }
}

function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken as string,
    }),
    method: "POST",
    cache: "no-store"
  });
}

declare module "next-auth" {
  interface Session {
    error?: "RefreshTokenError"
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string
    expires_at: number
    refresh_token?: string
    error?: "RefreshTokenError"
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
