import jwt from "jsonwebtoken";
import User from "../model/User.js";
import { uploadMultipleImages } from "../middleware/cloudinary.js";
let students = {
    findTutors: async (req,res) => {
        try {
            const tutorAvaible = await User.find({courses: req.params.course});
            res.send(tutorAvaible); // or do something with the user object
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    },
    editProfile: async (req,res) => {
        console.log(req.body)
        
        // try{
        //      if(req.body.obj.profilePic !== undefined){
        //         const updateUser = await User.findOneAndUpdate(
        //             {_id: req.body.id},
        //             {
        //                 $set: { img: await cloudinary(req.body.obj.profilePic), bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
        //             }
        //         )
        //         const updateUserFeats = await Feat.updateMany(
        //             {userId: req.body.id},
        //             {
        //                 $set: { profileImg: await cloudinary(req.body.obj.profilePic), userName: req.body.obj.username},
        //             }
        //         )
        //         const filter = { "comments.userId": req.body.id };
        //         const update = { $set: { "comments.$[elem].userName": req.body.obj.username,  "comments.$[elem].img": await cloudinary(req.body.obj.profilePic)} };
        //         const options = { arrayFilters: [{ "elem.userId": req.body.id }] };
        //         await Feat.updateMany(filter, update, options);
        //     } else {
        //         const updateUser = await User.findOneAndUpdate(
        //             {_id: req.body.id},
        //             {
        //                 $set: { bio: req.body.obj.bio, userName: req.body.obj.username, websiteLink: req.body.obj.websiteLink},
        //             }
        //         )
        //         const updateUserFeats = await Feat.updateMany(
        //             {userId: req.body.id},
        //             {
        //                 $set: { userName: req.body.obj.username},
        //             }
        //         )
        //         const filter = { "comments.userId": req.body.id };
        //         const update = { $set: { "comments.$[elem].userName": req.body.obj.username} };
        //         const options = { arrayFilters: [{ "elem.userId": req.body.id }] };
        //         await Feat.updateMany(filter, update, options);
        //     }
        //     if (!updateUser) {
        //         return res.status(404).json({ error: 'User not found' });
        //     }
        //     return res.status(200).json(updateUser);
        // } catch(err){
        //     console.error(err)
        //     return res.status(500).json({ error: 'Internal Server Error' });
        // }
    },

}
export default students