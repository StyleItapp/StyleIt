var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// db/index.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  insertStockImageSchema: () => insertStockImageSchema,
  insertUserSchema: () => insertUserSchema,
  insertWaitlistSubscriberSchema: () => insertWaitlistSubscriberSchema,
  stockImages: () => stockImages,
  users: () => users,
  waitlistSubscriberSchema: () => waitlistSubscriberSchema,
  waitlistSubscribers: () => waitlistSubscribers
});
import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var waitlistSubscribers = pgTable("waitlist_subscribers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  newsletter: boolean("newsletter").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertWaitlistSubscriberSchema = createInsertSchema(waitlistSubscribers).pick({
  name: true,
  email: true,
  role: true,
  newsletter: true
});
var waitlistSubscriberSchema = insertWaitlistSubscriberSchema.extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(2, "Name must be at least 2 characters")
});
var stockImages = pgTable("stock_images", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  alt: text("alt").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertStockImageSchema = createInsertSchema(stockImages).pick({
  url: true,
  alt: true,
  category: true
});

// db/index.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq } from "drizzle-orm";
var storage = {
  // Waitlist subscribers
  async addWaitlistSubscriber(subscriber) {
    const results = await db.insert(waitlistSubscribers).values(subscriber).returning();
    return results[0];
  },
  async getWaitlistSubscriberByEmail(email) {
    const results = await db.select().from(waitlistSubscribers).where(eq(waitlistSubscribers.email, email)).limit(1);
    return results[0];
  },
  async getWaitlistSubscriberCount() {
    const result = await db.select({ count: ({ count }) => count() }).from(waitlistSubscribers);
    return Number(result[0]?.count || 0);
  },
  // Stock images
  async getStockImagesByCategory(category) {
    const results = await db.select().from(stockImages).where(eq(stockImages.category, category));
    return results;
  },
  async getAllStockImages() {
    const results = await db.select().from(stockImages);
    return results;
  }
};

// server/routes.ts
import { ZodError } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/waitlist", async (req, res) => {
    try {
      const validatedData = waitlistSubscriberSchema.parse(req.body);
      const existingSubscriber = await storage.getWaitlistSubscriberByEmail(validatedData.email);
      if (existingSubscriber) {
        return res.status(409).json({
          message: "This email is already on our waitlist!"
        });
      }
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
      console.error("Error adding subscriber to waitlist:", error);
      return res.status(500).json({
        message: "An error occurred while adding you to the waitlist. Please try again."
      });
    }
  });
  app2.get("/api/waitlist/count", async (req, res) => {
    try {
      const count = await storage.getWaitlistSubscriberCount();
      return res.status(200).json({ count });
    } catch (error) {
      console.error("Error getting waitlist count:", error);
      return res.status(500).json({
        message: "Failed to fetch waitlist count"
      });
    }
  });
  app2.get("/api/stock-images/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const images = await storage.getStockImagesByCategory(category);
      return res.status(200).json(images);
    } catch (error) {
      console.error("Error fetching stock images:", error);
      return res.status(500).json({
        message: "Failed to fetch images"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/CareerCompass/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@db": path.resolve(import.meta.dirname, "db"),
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
