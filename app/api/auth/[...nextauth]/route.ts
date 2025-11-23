import { authOptions } from "@/auth/authSetup";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
// hhhh
