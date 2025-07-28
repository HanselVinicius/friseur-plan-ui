"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800">Bem-vindo</h1>
        <p className="text-gray-500 text-base max-w-md mx-auto">
          Acesse o sistema para começar sua experiência.
        </p>
        <Button onClick={() => signIn("keycloak")} className="px-6 py-3 text-base">
          Entrar no sistema
        </Button>
      </div>
    </main>
  );
}
