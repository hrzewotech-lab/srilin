require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB, dbStorage } = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

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

const app = express();

// Connect to MongoDB once for the Express server
let globalDbConnection = null;
connectDB().then((conn) => {
  globalDbConnection = conn;
  console.log("Connected to MongoDB globally");
}).catch(err => {
  console.error("Failed to connect to MongoDB", err);
});

// Middleware to inject db into AsyncLocalStorage
app.use((req, res, next) => {
  if (!globalDbConnection) {
    return res.status(503).json({ success: false, message: "Database starting up..." });
  }
  dbStorage.run(globalDbConnection, () => {
    next();
  });
});

// Core middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true, // allow cookies to be sent cross-origin
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Helper to mount MockRouter to standard Express app
function mountRouter(expressApp, pathPrefix, mockRouter) {
  if (!mockRouter || !mockRouter.routes) return;
  for (const route of mockRouter.routes) {
    const { method, path, handlers } = route;
    let fullPath = (pathPrefix + path).replace(/\/+/g, "/");
    if (fullPath.length > 1 && fullPath.endsWith("/")) {
      fullPath = fullPath.slice(0, -1);
    }
    expressApp[method](fullPath, ...handlers);
  }
}

// Routes
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

// 404 + error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
});
