import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob
} from "../controllers/job.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public
router.get("/", getJobs);
router.get("/:id", getJob);

// Protected
router.post("/", isAuthenticated, createJob);
router.put("/:id", isAuthenticated, updateJob);
router.delete("/:id", isAuthenticated, deleteJob);

export default router;


// import express from "express";
// import {
//   createJob,
//   getJobs,
//   getJob,
//   updateJob,
//   deleteJob
// } from "../controllers/job.controller.js";
// import isAuthenticated from "../middlewares/isAutentifcated.js";

// const router = express.Router();

// // Public routes


// // Protected routes (only logged-in users)
// router.route("/create").post(isAuthenticated, createJob);
// router.route("/get").get(isAuthenticated,getJobs);
// router.route("/get/:id").get(isAuthenticated, getJob);
// router.route("/update/:id").put(isAuthenticated, updateJob);
// router.delete("/delete/:id", isAuthenticated, deleteJob);


// export default router;
