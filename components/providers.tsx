"use client";

import { SessionProvider } from "next-auth/react";
import { Props } from "@/lib/type";

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
