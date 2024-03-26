import express from "express";
const router = express.Router();
import auth from "../controller/auth.js"
import teacher from "../controller/teacher.js";
import authenticateToken from "../middleware/jwt.js";


// random routes and shit go here 
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.use(authenticateToken);
router.get('/getuser/:token',  auth.checkUser)
router.get('/findtutor/:course', teacher.findTutors)
export default router;