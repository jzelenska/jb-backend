import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";
import userRout from "./routes/user.route.js";
import comanyRout from "./routes/company.route.js";
import jobRout from "./routes/job.route.js";
import applicationRout from "./routes/application.route.js";



const app = express();


app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
    
}
app.use(cors(corsOptions));

app.use(express.json());
let PORT = process.env.PORT || 5000;

//api routes
app.use("/user", userRout);
app.use("/company", comanyRout);
app.use("/job", jobRout);
app.use("/application", applicationRout);

app.listen(PORT, () => {
    connectDB()
  console.log(` Server running at http://localhost:${PORT}  `);
});
