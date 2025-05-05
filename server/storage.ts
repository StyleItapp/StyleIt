import { db } from "@db";
import { waitlistSubscribers, stockImages } from "@shared/schema";
import type { InsertWaitlistSubscriber, WaitlistSubscriber, StockImage } from "@shared/schema";
import { eq } from "drizzle-orm";

export const storage = {
  // Waitlist subscribers
  async addWaitlistSubscriber(subscriber: InsertWaitlistSubscriber): Promise<WaitlistSubscriber> {
    const results = await db.insert(waitlistSubscribers)
      .values(subscriber)
      .returning();
    
    return results[0];
  },
  
  async getWaitlistSubscriberByEmail(email: string): Promise<WaitlistSubscriber | undefined> {
    const results = await db.select()
      .from(waitlistSubscribers)
      .where(eq(waitlistSubscribers.email, email))
      .limit(1);
    
    return results[0];
  },
  
  async getWaitlistSubscriberCount(): Promise<number> {
    const result = await db
      .select({ count: ({ count }) => count() })
      .from(waitlistSubscribers);
    
    return Number(result[0]?.count || 0);
  },

  // Stock images
  async getStockImagesByCategory(category: string): Promise<StockImage[]> {
    const results = await db.select()
      .from(stockImages)
      .where(eq(stockImages.category, category));
    
    return results;
  },
  
  async getAllStockImages(): Promise<StockImage[]> {
    const results = await db.select()
      .from(stockImages);
    
    return results;
  }
};
