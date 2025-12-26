import { env } from "@/shared/lib/envValidator";
import { cors } from "hono/cors";
import { logger } from "@/shared/lib/logger";
import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";

export const betterAuthClient = betterAuth({
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "compact",
      refreshCache: true,
    },
  },

  account: {
    updateAccountOnSignIn: true,
    storeAccountCookie: true,
  },

  onAPIError: {
    onError: () => {
      logger.error("Unknown API error");
    },
  },

  plugins: [openAPI()],

  trustedOrigins: [env.CLIENT_ORIGIN],
});

export interface AuthType {
  Variables: {
    user: typeof betterAuthClient.$Infer.Session.user | null;
    session: typeof betterAuthClient.$Infer.Session.session | null;
  };
}

export const authCors = cors({
  origin: env.CLIENT_ORIGIN,
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
});
