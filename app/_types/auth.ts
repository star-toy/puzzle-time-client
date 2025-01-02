export interface IAuthToken {
  appAccessToken: string;
  message: string;
  newUser: boolean;
  user: {
    appAccessToken: string;
    appTokenExpiresAt: string;
    createdAt: string;
    email: string;
    id: number;
    provider: string;
    providerId: string;
    refreshToken: string;
    role: string;
    updatedAt: string;
    userName: string;
  };
}
