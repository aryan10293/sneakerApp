import express from "express";
const router = express.Router();
import auth from "../controller/auth.js"
import workout from "../controller/workout.js";
import authenticateToken from "../middleware/jwt.js";


// random routes and shit go here 
router.post('/createaccount', auth.postCreateAccount)
router.post('/login', auth.postLogin)
router.use(authenticateToken);
router.post('/workoutplan', workout.workoutPlan)
router.get('/getuser/:token',  auth.checkUser)
export default router;