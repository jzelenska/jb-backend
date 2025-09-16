import express from "express";
import {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany
} from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { isCompany } from "../middlewares/roles.js";

const router = express.Router();

router.get("/", getCompanies);

// Protected (companies only)
router.post("/", isAuthenticated, isCompany, createCompany);
router.get("/:id", isAuthenticated, getCompanyById);
router.put("/:id", isAuthenticated, isCompany, updateCompany);
router.delete("/:id", isAuthenticated, isCompany, deleteCompany);

export default router;



// import express from 'express';

// import isAuthenticated from '../middlewares/isAutentifcated.js';
// import {getCompanies, createCompany, getCompanyById, updateCompany, deleteCompany } from '../controllers/company.controll.js';


// const router = express.Router();


// router.route('/createCompany').post(isAuthenticated,createCompany);
// router.route('/get').get(isAuthenticated,getCompanies);
// router.route('/get/:id').get(isAuthenticated,getCompanyById);
// router.route('/updat/:id').put(isAuthenticated,updateCompany);
// router.route('/delete/:id').delete(isAuthenticated,deleteCompany);


// export default router;
