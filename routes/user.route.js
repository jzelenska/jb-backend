import express from "express";
import {
  register,
  login,
  logout,
  updateProfile
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// Public
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/logout", isAuthenticated, logout);
router.put("/profile", isAuthenticated, updateProfile);

export default router;


// import express from 'express';
// import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
// import isAuthenticated from '../middlewares/isAutentifcated.js';


// const router = express.Router();


// router.route('/register').post(register);
// router.route('/login').post(login);
// router.route('/logout').get(logout)
// router.route('/profile/updat').post(isAuthenticated,updateProfile);

// export default router;
