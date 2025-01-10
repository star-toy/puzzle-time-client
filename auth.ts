import type { Account, NextAuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import { refreshToken as refreshTokenApi } from '@/app/_libs/api/auth';
import { createAuthClient } from '@/app/_libs/auth-client';
import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';s';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account }: { account: Account | null }) {
      return !!account?.access_token && !!account?.refresh_token;
    },
    async jwt({ token, account, user }:account: Account | null; token: JWT;WT; user: User | null }) {
      if (account && user) {
        token.access_token = account.access_token;
        token.refresh_token = account.refresh_token;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 60;
        return token;
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      return await refreshAccessToken(token);
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.access_token as string | null;
      session.refreshToken = token.refresh_token as string | null;
      return session;
    },
  },
} satisfies NextAuthOptions;

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const newTokens = await refreshTokenApi(token.refresh_token as string);
    return {
      ...token,
      access_token: newTokens.appAccessToken,
      refresh_token: newTokens.user.refreshToken,
      accessTokenExpires: Date.now() + 1000 * 60 * 60,
    };
  } catch (error) {
    console.error('Failed to refresh access token:', error);

    return {
      ...token,
      access_token: null,
      refresh_token: null,
      accessTokenExpires: Date.now(),
    };
  }
}

const nextAuth = NextAuth(authOptions);
export const { auth, signIn, signOut, handlers, unstable_update } = nextAuth;

export async function getSession() {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  return session;
}
