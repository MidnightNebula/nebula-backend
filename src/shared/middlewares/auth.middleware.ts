import { createMiddleware } from "hono/factory";
import { logger } from "@/shared/lib/logger";
import { betterAuthClient, type AuthType } from "@/api/auth/config";

export const authMiddleware = createMiddleware<AuthType>(async (c, next) => {
  logger.info(
    `Start app. Req: Method: ${c.req.method}, url: ${c.req.url}, status: ${c.res.status}}`,
  );
  const session = await betterAuthClient.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});
