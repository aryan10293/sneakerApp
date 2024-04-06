import express from "express";
const router = express.Router();
import auth from "../controller/auth.js"
import students from "../controller/students.js";
import authenticateToken from "../middleware/jwt.js";
import teachers from "../controller/teacher.js";
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.use(authenticateToken);
router.get('/getuser/:token',  auth.checkUser)
router.get('/findtutor/:course', students.findTutors)
router.get('/findstudent/:course', teachers.findStudents)
router.put('/editprofile', students.editProfile)
router.put('/editprofileT', teachers.editProfile)
export default router;
