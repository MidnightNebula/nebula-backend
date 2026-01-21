import { betterAuthClient } from "@/api/auth/config";
import { App } from "@/shared/lib/hono.ts";
import { logger } from "@/shared/lib/logger";

export const authRouter = App();

authRouter.on(["POST", "GET"], "/auth/**", (c) => {
  logger.info(`Auth is started. method: ${c.req.method}, path: ${c.req.path}`);
  return betterAuthClient.handler(c.req.raw);
});
