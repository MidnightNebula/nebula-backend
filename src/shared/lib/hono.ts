import type { AuthType } from "@/api/auth/config";
import { Hono } from "hono";

export function App() {
  return new Hono<AuthType>();
}
