import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./utils/db.js";
import errorHandler from "./middlewares/errorHandler.js";

// Routes
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // later → replace with frontend URL
  credentials: true
}));

// API routes
app.use("/api/users", userRoute);
app.use("/api/companies", companyRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/applications", applicationRoute);

// Root
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling (must be last)
app.use(errorHandler);

// Start server with DB connection
app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from "./utils/db.js";
// import userRout from "./routes/user.route.js";
// import comanyRout from "./routes/company.route.js";
// import jobRout from "./routes/job.route.js";
// import applicationRout from "./routes/application.route.js";


// const app = express();


// app.get("/", (req, res) => {
//   res.send("Backend is running ✅");
// });



// // middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// const corsOptions = {
//     origin: "http://localhost:3000",
//     credentials: true,
    
// }
// app.use(cors(corsOptions));

// app.use(express.json());
// let PORT = process.env.PORT || 5000;

// //api routes
// app.use("/user", userRout);
// app.use("/company", comanyRout);
// app.use("/job", jobRout);
// app.use("/application", applicationRout);

// app.listen(PORT, () => {
//     connectDB()
//   console.log(` Server running at http://localhost:${PORT}  `);
// });
