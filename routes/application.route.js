import express from "express";
import {
  createApplication,
  getMyApplications,
  //getApplicationById,
  updateApplicationStatus,
  deleteApplication
} from "../controllers/application.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Protected
router.post("/", isAuthenticated, createApplication);
router.get("/", isAuthenticated, getMyApplications);
//router.get("/:id", isAuthenticated, getApplicationById);
router.put("/:id", isAuthenticated, updateApplicationStatus);
router.delete("/:id", isAuthenticated, deleteApplication);

export default router;


// import express from "express";
// import {
//     createApplication,
//     getMyApplications,
//     updateApplicationStatus,
//     deleteApplication
// } from "../controllers/application.controller.js";
// import  isAuthenticated  from "../middlewares/original.isAutentifcated.js";

// const router = express.Router();


// router.post("/creatapp", isAuthenticated, createApplication);
// router.get("/myapp", isAuthenticated, getMyApplications);
// router.put("/status/:id", isAuthenticated, updateApplicationStatus);
// router.delete("/:id", isAuthenticated, deleteApplication);

// export default router;
