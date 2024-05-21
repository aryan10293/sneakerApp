import express from "express";
const router = express.Router();
import auth from "../controller/auth.js"
import students from "../controller/students.js";
import authenticateToken from "../middleware/jwt.js";
import teachers from "../controller/teacher.js";
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
//router.use(authenticateToken);
router.get('/getuser/:token',  auth.checkUser)
router.get('/getuserid/:id',  auth.getUser)
router.get('/gettutorsessions/:id',  teachers.getTutorSessions)
router.get('/gettutorsession/:id',  teachers.getTutorSession)
router.get('/findtutor/:course', students.findTutors)
router.get('/findstudent/:course', teachers.findStudents)

router.put('/editprofile', students.editProfile)
router.put('/editprofileT', teachers.editProfile)

router.post('/studentsessionrequest', students.yooo)
router.post('/getimages', teachers.getStudentImages)
router.post('/comfirmsession', teachers.confirmSession)

router.delete('/deletetutorrequest', teachers.deleteScheduleRequestFromDatabase)
export default router;
