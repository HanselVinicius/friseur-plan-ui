
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## Envs

| Variável                  | Descrição                                                                 | Exemplo                                   |
|---------------------------|---------------------------------------------------------------------------|-------------------------------------------|
| `KEYCLOAK_CLIENT_ID`      | ID do cliente configurado no Keycloak                                     | `nextjs`                                  |
| `KEYCLOAK_CLIENT_SECRET`  | Segredo do cliente configurado no Keycloak                                | `<client_secret>`                         |
| `KEYCLOAK_ISSUER`         | URL do emissor (realm) do Keycloak                                        | `http://localhost:8080/realms/myrealm`    |
| `NEXTAUTH_SECRET`         | Segredo utilizado pelo NextAuth para assinar tokens                       | `openssl rand -base64 32`                 |
| `NEXTAUTH_URL`            | URL base da aplicação Next.js (usado pelo NextAuth)                       | `http://localhost:3000`                   |
