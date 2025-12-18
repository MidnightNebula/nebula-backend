import { z } from "zod";

import "dotenv/config";
import { logger } from "@/shared/lib/logger";

z.config({
  customError: (iss) => {
    if (iss.code === "invalid_type") {
      logger.error(`Env ${iss.path} variable is not found. Close the server`);
      process.exit(1);
    }
    if (iss.code === "too_small") {
      logger.debug(
        `Env variables ${iss.path} is empty. Minimum is ${iss.minimum}`
      );
      return "";
    }
  },
});

const envSchema = z.object({
  CLIENT_ORIGIN: z.string().nonempty(),
  DISCORD_CLIENT_SECRET: z.string().nonempty(),
  DISCORD_CLIENT_ID: z.string().nonempty(),
  BETTER_AUTH_SECRET: z.string().nonempty(),
  ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
});

export const env = envSchema.parse(process.env);
