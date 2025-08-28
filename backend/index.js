// // ✅ Core Dependencies
// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// const http = require("http");
// const path = require("path");
// const helmet = require("helmet");
// require("dotenv").config();

// // ✅ MongoDB Connection
// const connectDB = require("./config/db");
// connectDB();

// // ✅ Express App & HTTP Server
// const app = express();
// const server = http.createServer(app);
// // Parse URL-encoded form data if needed
// app.use(express.urlencoded({ extended: true }));

// // ✅ Setup Socket.IO
// const { Server } = require("socket.io");
// const io = new Server(server, {
//   cors: {
//     origin: [
//       "http://localhost:5173", // Frontend development URL
//       "https://our-service-frontend.vercel.app", // Frontend production URL
//     ],
//     credentials: true,
//   },
// });

// // ✅ Attach io to req object for use in routes
// app.use((req, res, next) => {
//   req.io = io;
//   next();
// });

// // ✅ CORS Configuration (with dynamic origins based on environment)
// const allowedOrigins = [
//   "http://localhost:5173", // Development Frontend URL
//   "https://our-service-frontend.vercel.app", // Production Frontend URL
// ];

// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// app.use(express.json());
// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions)); // For preflight checks

// // ✅ Static File CORS Middleware
// const addCorsHeaders = (req, res, next) => {
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// };

// // ✅ Static File Serving with CORS headers
// app.use("/uploads", addCorsHeaders, express.static(path.join(__dirname, "uploads")));
// app.use("/invoices", addCorsHeaders, express.static(path.join(__dirname, "invoices")));
// app.use("/public", addCorsHeaders, express.static(path.join(__dirname, "public")));

// // ✅ Socket Handlers
// const setupBookingSocket = require("./sockets/bookingSocket");
// setupBookingSocket(io);

// // ✅ API Routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/admins", require("./routes/adminRoutes"));
// app.use("/api/services", require("./routes/serviceRoutes"));
// app.use("/api/bookings", require("./routes/bookingRoutes"));
// app.use("/api/reviews", require("./routes/reviewRoutes"));
// app.use("/api/payments", require("./routes/paymentRoutes"));
// app.use("/api/invoices", require("./routes/invoiceRoutes"));

// // ✅ Test & Root Routes (Remove or lock in production)
// app.get("/test-invoice", (req, res) => {
//   res.sendFile(path.join(__dirname, "invoices/invoice_67ee7ec0c93921d497c8350d.pdf"));
// });

// app.get("/", (req, res) => {
//   res.send("✅ API is running...");
// });

// app.get("/test-review", (req, res) => {
//   res.send("✅ Review API is working");
// });

// // ✅ 404 Handler
// app.use((req, res, next) => {
//   res.status(404).json({ message: "🔍 Route not found" });
// });

// // ✅ Error Handler Middleware
// const { errorHandler } = require("./middlewares/errorMiddleware");
// app.use(errorHandler);



// // ✅ Graceful Shutdown (Optional but recommended for production)
// process.on("SIGTERM", () => {
//   console.log("🛑 SIGTERM received. Shutting down gracefully...");
//   server.close(() => {
//     console.log("💤 HTTP server closed.");
//     mongoose.connection.close(false, () => {
//       console.log("🛠 MongoDB connection closed.");
//       process.exit(0);
//     });
//   });
// });

// // ✅ Start Server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// Core Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const path = require("path");
require("dotenv").config();

// MongoDB Connection
const connectDB = require("./config/db");
connectDB();

// Express App & HTTP Server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
const allowedOrigins = [
  "http://localhost:5173", // Dev frontend
  "https://your-frontend.vercel.app" // Production frontend
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Socket.IO Setup
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: { origin: allowedOrigins, credentials: true },
});
app.set("io", io); // optional: attach io to app

// Socket Handlers
require("./sockets/bookingSocket")(io);

// API Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admins", require("./routes/adminRoutes"));
app.use("/api/services", require("./routes/serviceRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/invoices", require("./routes/invoiceRoutes"));

// Static Files (uploads, invoices, public)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Root Test
app.get("/", (req, res) => res.send("✅ API Running"));

// 404 Handler
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Error Handler
const { errorHandler } = require("./middlewares/errorMiddleware");

app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
