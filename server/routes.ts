import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { waitlistSubscriberSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  app.post('/api/waitlist', async (req, res) => {
    try {
      // Validate request data with zod schema
      const validatedData = waitlistSubscriberSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscriber = await storage.getWaitlistSubscriberByEmail(validatedData.email);
      
      if (existingSubscriber) {
        return res.status(409).json({ 
          message: "This email is already on our waitlist!" 
        });
      }
      
      // Add subscriber to waitlist
      const newSubscriber = await storage.addWaitlistSubscriber(validatedData);
      
      return res.status(201).json({
        message: "Successfully joined the waitlist!",
        subscriber: newSubscriber
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      
      console.error('Error adding subscriber to waitlist:', error);
      return res.status(500).json({ 
        message: "An error occurred while adding you to the waitlist. Please try again." 
      });
    }
  });

  // Get waitlist subscriber count for stats
  app.get('/api/waitlist/count', async (req, res) => {
    try {
      const count = await storage.getWaitlistSubscriberCount();
      return res.status(200).json({ count });
    } catch (error) {
      console.error('Error getting waitlist count:', error);
      return res.status(500).json({ 
        message: "Failed to fetch waitlist count" 
      });
    }
  });

  // Get stock images
  app.get('/api/stock-images/:category', async (req, res) => {
    try {
      const { category } = req.params;
      const images = await storage.getStockImagesByCategory(category);
      return res.status(200).json(images);
    } catch (error) {
      console.error('Error fetching stock images:', error);
      return res.status(500).json({ 
        message: "Failed to fetch images" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
