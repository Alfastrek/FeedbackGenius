"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      <SessionProvider>{children}</SessionProvider>
    </div>
  );
}
