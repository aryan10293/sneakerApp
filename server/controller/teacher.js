import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { uploadImage } from "../middleware/cloudinary.js";
let teachers = {
    findStudents: async (req,res) => {
        try {
            const studentsAvaible = await User.find({subjects: req.params.course});
            res.send(studentsAvaible); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    },

}
export default teachers


    // editProfile: async (req,res) => {  
    //     let updateUser    
    //     console.log(req.body.profilePic === undefined)  
    //     try{
    //          if(req.body.profilePic !== undefined){
    //              updateUser = await User.findOneAndUpdate(
    //                 {_id: req.body.id},
    //                 {
    //                     $set: { img: await uploadImage(req.body.profilePic), bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, subjects: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major},
    //                 }
    //             )
    //         } else {
    //              updateUser = await User.findOneAndUpdate(
    //                 {_id: req.body.id},
    //                 {
    //                     $set: { bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, subjects: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major},
    //                 }
    //             )
    //         }
    //         if (!updateUser) {
    //             return res.status(404).json({ error: 'User not found' });
    //         }
    //         return res.status(200).json(updateUser);
    //     } catch(err){
    //         console.error(err)
    //         return res.status(500).json({ error: 'Internal Server Error' });
    //     }
    // },