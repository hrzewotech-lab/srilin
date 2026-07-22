const { Hono } = require("hono");
const { cors } = require("hono/cors");
const { connectDB, dbStorage } = require("./config/db");
const { toHono } = require("./utils/expressHonoAdapter");

// Import Mock Routers
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const heroRoutes = require("./routes/heroRoutes");
const blogRoutes = require("./routes/blogRoutes");
const productRoutes = require("./routes/productRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const teamRoutes = require("./routes/teamRoutes");
const faqRoutes = require("./routes/faqRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const careerRoutes = require("./routes/careerRoutes");
const clientRoutes = require("./routes/clientRoutes");
const siteContentRoutes = require("./routes/siteContentRoutes");

const app = new Hono();

// CORS Middleware
app.use("/*", cors({
  origin: (origin) => {
    return origin || "https://srilin.pages.dev";
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization", "Cookie"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// Ensure Database is connected on every request
app.use("*", async (c, next) => {
  if (c.env) {
    Object.assign(process.env, c.env);
  }
  
  let connection;
  try {
    connection = await connectDB();
  } catch (err) {
    console.error("Database connection failed:", err);
    return c.json({ success: false, message: "Database connection failed" }, 500);
  }

  return await dbStorage.run(connection, async () => {
    return await next();
  });
});

// Helper to mount MockRouter to Hono app
function mountRouter(honoApp, pathPrefix, mockRouter) {
  if (!mockRouter || !mockRouter.routes) return;
  for (const route of mockRouter.routes) {
    const { method, path, handlers } = route;
    const honoHandlers = handlers.map(h => toHono(h));
    let fullPath = (pathPrefix + path).replace(/\/+/g, "/");
    if (fullPath.length > 1 && fullPath.endsWith("/")) {
      fullPath = fullPath.slice(0, -1);
    }

    if (method === "get") {
      honoApp.get(fullPath, ...honoHandlers);
    } else if (method === "post") {
      honoApp.post(fullPath, ...honoHandlers);
    } else if (method === "put") {
      honoApp.put(fullPath, ...honoHandlers);
    } else if (method === "delete") {
      honoApp.delete(fullPath, ...honoHandlers);
    } else if (method === "patch") {
      honoApp.patch(fullPath, ...honoHandlers);
    } else if (method === "use") {
      const wildcardPath = fullPath.endsWith("/") ? (fullPath + "*") : (fullPath + "/*");
      honoApp.use(wildcardPath, ...honoHandlers);
    }
  }
}

// Health Check
app.get("/api/health", (c) => {
  return c.json({ success: true, message: "Server is running (Hono on Cloudflare)" });
});

// Mount Routes
mountRouter(app, "/api/auth", authRoutes);
mountRouter(app, "/api/users", userRoutes);
mountRouter(app, "/api/hero", heroRoutes);
mountRouter(app, "/api/blog", blogRoutes);
mountRouter(app, "/api/products", productRoutes);
mountRouter(app, "/api/services", serviceRoutes);
mountRouter(app, "/api/team", teamRoutes);
mountRouter(app, "/api/faqs", faqRoutes);
mountRouter(app, "/api/certificates", certificateRoutes);
mountRouter(app, "/api/careers", careerRoutes);
mountRouter(app, "/api/clients", clientRoutes);
mountRouter(app, "/api/content", siteContentRoutes);

// Global Error Handler
app.onError((err, c) => {
  console.error("Hono error:", err);
  const status = (c.res && typeof c.res.status === "number" && c.res.status >= 200 && c.res.status <= 599) ? c.res.status : 500;
  return c.json({ success: false, message: err.message || "Internal Server Error" }, status);
});

// Not Found Handler
app.notFound((c) => {
  return c.json({ success: false, message: "Route not found" }, 404);
});

export default app;
