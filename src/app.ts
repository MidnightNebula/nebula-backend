import { Hono } from "hono";
import { serve } from "@hono/node-server";

import { authMiddleware } from "@/shared/middlewares/auth.middleware";
import { authCors, type AuthType } from "@/api/auth/config";
import { authRouter } from "@/api/auth/auth.route";

//! Если проблемы с авторизацией, убрать variables
const app = new Hono<{ Variables: AuthType }>();

app.use("*", authMiddleware);
app.use("/api/auth/*", authCors);

const routes = [authRouter] as const;

app.get("/", (c) => {
  return c.text("Hello world");
});

routes.forEach((route) => {
  app.basePath("/api").route("/", route);
});

export const server = serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => console.log(`Server is running on http://localhost:${info.port}`)
);
