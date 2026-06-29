require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
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

const app = express();

// Connect to MongoDB
connectDB().catch((error) => {
  console.error(`MongoDB connection error: ${error.message}`);
});

const parseAllowedOrigins = () => {
  const configuredOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set(configuredOrigins);
};

const allowedOrigins = parseAllowedOrigins();
const isAllowedOrigin = (origin) => {
  if (!origin) {
    return true;
  }

  try {
    const { hostname, protocol } = new URL(origin);
    return (
      allowedOrigins.has(origin) ||
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      (protocol === "https:" && hostname.endsWith(".netlify.app"))
    );
  } catch (error) {
    return false;
  }
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

// Core middleware
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  const functionPrefix = "/.netlify/functions/api";

  if (req.url === functionPrefix) {
    req.url = "/";
  } else if (req.url.startsWith(`${functionPrefix}/`)) {
    req.url = req.url.slice(functionPrefix.length);

    if (req.url !== "/" && !req.url.startsWith("/api/")) {
      req.url = `/api${req.url}`;
    }
  }

  next();
});

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/products", productRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/careers", careerRoutes);

// 404 + error handlers (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
  });
}

module.exports = app;
