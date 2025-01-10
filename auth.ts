import type { Account, NextAuthConfig, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import { createAuthClient } from '@/app/_libs/auth-client';
import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';

export const authOptions: NextAuthConfig = {
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
    // eslint-disable-next-line @typescript-eslint/require-await
    async signIn({ account }: { account: Account | null }) {
      return !!account?.access_token && !!account?.refresh_token;
    },
    async jwt({ token, account, user, session }) {
      if (!account) {
        return token;
      }
      const client = createAuthClient();
      try {
        const data = await client.post<IAuthToken>(URLS.createAuthToken(), {
          email: user.email,
          name: user.name,
          provider: account.provider,
          providerId: account.providerAccountId,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
        });
        // eslint-disable-next-line no-param-reassign
        token.access_token = data.appAccessToken;
        // eslint-disable-next-line no-param-reassign
        token.refresh_token = data.user.refreshToken;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async session({ session, token }: { session: Session; token: JWT }) {
      return {
        ...session,
        accessToken: token.access_token,
        refreshToken: token.refresh_token,
      };
    },
  },
} satisfies NextAuthConfig;

const nextAuth = NextAuth(authOptions);
export const { auth, signIn, signOut, handlers, unstable_update } = nextAuth;

export async function getSession() {
  const session = (await auth()) as (Session & { accessToken: string | null; refreshToken: string | null }) | null;
  return session;
}
