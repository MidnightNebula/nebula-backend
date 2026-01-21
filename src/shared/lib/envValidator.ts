import { z } from "zod";

import "dotenv/config";
import { logger } from "@/shared/lib/logger";

z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type") {
      logger.error(`Env ${Array.isArray(iss.path) ? iss.path.join('.') : 'UNKNOWN_ENV_MISSING'} variable is not found. Close the server`);
      process.exit(1);
    }

    return "";
  },
});

const envSchema = z.object({
  CLIENT_ORIGIN: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  DISCORD_CLIENT_ID: z.string().nonempty(),
  ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
});

export const env = envSchema.parse(process.env);