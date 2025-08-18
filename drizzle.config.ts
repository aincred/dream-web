// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./lib/schema.ts",
//   out: "./drizzle",
//   driver: "postgres-js",
//   dialect: "postgresql", // required for postgres-js driver
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// });


/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./lib/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_JHXaLv4hcD5x@ep-small-wind-a1xdy2ly-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'"
  }
};
