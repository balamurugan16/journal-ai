import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config({
  path: "./.env.local"
})

export default {
  schema: "./data/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DB_URL!,
    host: process.env.NEXT_PUBLIC_DB_HOST!,
    database: process.env.NEXT_PUBLIC_DB_NAME!,
    port: +process.env.NEXT_PUBLIC_DB_PORT!,
    user: process.env.NEXT_PUBLIC_DB_USER!,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD!,
  }
} satisfies Config;

