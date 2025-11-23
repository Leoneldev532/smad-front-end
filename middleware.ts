export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/account"],
  // matcher: ["/((?!register|api|login).*)"],
};
