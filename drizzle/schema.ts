import { pgTable, serial, varchar, timestamp, text } from 'drizzle-orm/pg-core';


export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // hashed
})

export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  issued: timestamp('issued').notNull(),
  validity: timestamp('validity').notNull(),
  cloudinaryUrl: varchar('cloudinary_url', { length: 500 }).notNull(),
});

