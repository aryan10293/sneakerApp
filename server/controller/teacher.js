import passport from "passport"
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
let teacher = {
    findTutors: async (req,res) => {
        res.send(req.params)
    }

}
export default teacher