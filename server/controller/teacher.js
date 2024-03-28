import passport from "passport"
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
let teacher = {
    findTutors: async (req,res) => {
        try {
            const tutorAvaible = await User.find({courses: req.params.course});
            res.send(tutorAvaible); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }

}
export default teacher