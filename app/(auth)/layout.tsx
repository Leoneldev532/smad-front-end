// src/app/layout.tsx
"use client";

import Loader from "@/components/loader";
import UserInfoProvider from "@/hook/userIdHook";
import UserIdProvider from "@/hook/userIdHook";
import { SessionProvider, useSession } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { status, data: session } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="flex min-h-72 justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (status === "authenticated") {
    return (
      <SessionProvider
        refetchInterval={5 * 60}
        session={session}
        refetchOnWindowFocus={false}
      >
        <UserInfoProvider>
          <div className="flex justify-center items-center w-full">
            {children}
          </div>
        </UserInfoProvider>
      </SessionProvider>
    );
  }
  return null;
}
