// authSetup.ts
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { generateFinalDate, generateprivateKey } from '@/lib/utils';

import { prisma } from "@/lib/db";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      httpOptions: { timeout: 6000000, agent: false },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }

      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
      httpOptions: { timeout: 6000000, agent: false },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }

      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    }),
    CredentialsProvider({
      name: 'Sign in',
      id: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials?.password, user.password!))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: 'Hey cool',
        };
      },
    }),
  ],

  
  callbacks: {   
    async signIn({ user, account }) {

      console.log(user,"-----")
      // Vérifiez si l'utilisateur existe déjà dans la base de données
      const existingUser = await prisma.user.findUnique({
        where: { email: user?.email  || " "  },
      });
  
      // console.log(process.env.NEXTAUTH_URL,process.env.GOOGLE_CLIENT_ID,process.env.GOOGLE_CLIENT_SECRET)
      // Si l'utilisateur n'existe pas, créez-le
      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user?.name || " ",
            email: user?.email || " ",
            privateKey: {
              create: {
                key: generateprivateKey(user?.email?.toLowerCase() || " "),
                expiresAt: generateFinalDate("1year").toDate(), 
              },
            },
          },
        });
  
      } else {
        // Si l'utilisateur existe déjà, vérifiez si le compte Google est lié
        const linkedAccount = await prisma.account.findUnique({
          where: {
            provider_providerAccountId: {
              provider: account?.provider || " ",
              providerAccountId: account?.providerAccountId || " ",
            },
          },
        });
  
        // Si le compte Google n'est pas lié, liez-le à l'utilisateur existant
        if (!linkedAccount) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account?.provider || " ",
              providerAccountId: account?.providerAccountId || " ",
            },
          });
        }
      }
  
      return true; // Autoriser la connexion
    },
  
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
        };
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/dashboard',
    error: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

