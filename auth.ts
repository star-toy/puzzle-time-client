import type { Account, AuthOptions, Session, User } from 'next-auth';
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import { createAuthClient } from '@/app/_libs/auth-client';
import type { IAuthToken } from '@/app/_types/auth';
import { URLS } from '@/app/constants';

export const authOptions: AuthOptions = {
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
    async signIn({ user, account }: { account: Account | null; user: User }) {
      if (account?.access_token && account?.refresh_token) {
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
          account.access_token = data.appAccessToken;
          // eslint-disable-next-line no-param-reassign
          account.refresh_token = data.user.refreshToken;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          console.error('Error sending tokens to backend:', errorMessage);
          return false;
        }
      }
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async jwt({ token, account }: { account: Account | null; token: JWT }) {
      if (account) {
        // eslint-disable-next-line no-param-reassign
        token.access_token = account.access_token;
        // eslint-disable-next-line no-param-reassign
        token.refresh_token = account.refresh_token;
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
} satisfies AuthOptions;

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const nextAuth = NextAuth(authOptions);
export const { auth, signIn, signOut, handlers } = nextAuth;
