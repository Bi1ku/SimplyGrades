import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin(() => ({
    returnTo: "/auth/role",
  })),
  onError(_: Request, error: Error) {
    console.error(error);
  },
});
