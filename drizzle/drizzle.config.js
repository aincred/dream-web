// import { defineConfig } from "drizzle-kit";

// export default defineConfig({
//   schema: "./drizzle/schema.ts",
//   out: "./drizzle/migrations",
//   driver: "pg",
//   dbCredentials: {
//     connectionString: process.env.DATABASE_URL!,
//   },
// });

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql", // ✅ required
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
