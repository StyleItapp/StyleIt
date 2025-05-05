import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Waitlist subscribers table
export const waitlistSubscribers = pgTable("waitlist_subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertWaitlistSubscriberSchema = createInsertSchema(waitlistSubscribers).pick({
  name: true,
  email: true,
  role: true,
  newsletter: true,
});

// Add email validation
export const waitlistSubscriberSchema = insertWaitlistSubscriberSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type InsertWaitlistSubscriber = z.infer<typeof waitlistSubscriberSchema>;
export type WaitlistSubscriber = typeof waitlistSubscribers.$inferSelect;

// Stock images table
export const stockImages = pgTable("stock_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertStockImageSchema = createInsertSchema(stockImages).pick({
  url: true,
  alt: true,
  category: true,
});

export type InsertStockImage = z.infer<typeof insertStockImageSchema>;
export type StockImage = typeof stockImages.$inferSelect;
