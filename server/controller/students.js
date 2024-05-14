import jwt from "jsonwebtoken";
import User from "../model/User.js";
import TutorSession from "../model/TutorSession.js";
import { uploadImage } from "../middleware/cloudinary.js";
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
        let updateUser    
        console.log(req.body.profilePic === undefined)  
        try{
             if(req.body.profilePic !== undefined){
                 updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { img: await uploadImage(req.body.profilePic), bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, subjects: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major, why:req.body.why, availabity:req.body.availabity, zone:req.body.zone},
                    }
                )
            } else {
                 updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, subjects: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major, why:req.body.why, availabity:req.body.availabity, zone:req.body.zone},
                    }
                )
            }
            if (!updateUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            return res.status(200).json(updateUser);
        } catch(err){
            console.error(err)
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    makeASessionRequest: async(req,res) => {
        console.log(req.body)
        try {
            let updateUserPendingSession  = await User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {
                        $set: { pendingSession: [req.body]},
                    }
                )
            let updateTutorPendingSession  = await User.findOneAndUpdate(
                        {_id: req.body.tutorId},
                        {
                            $set: { pendingSession: [req.body]},
                        }
                    )
            if (!updateUserPendingSession) {
                    return res.status(404).json({ error: 'User not found' });
                } else if(!updateTutorPendingSession){
                    return res.status(404).json({ error: 'Tutor not found' });
                }
                return res.status(200).json(updateUserPendingSession);
        } catch (error) {
            console.error(error)
        }
    }, 
    yooo: async(req,res) => {
        try{
            const sessionData = {
                text:req.body.text,
                name:req.body.name,
                email:req.body.email,
                appointmentTimeDetails: {
                    date:req.body.appointmentTimeDetails.date,
                    time:req.body.appointmentTimeDetails.time,
                    subject: req.body.appointmentTimeDetails.subject
                },
                userId:req.body.userId,
                tutorId: req.body.tutorId,
                date: Date.now(),
                typeOfNoti: 'tutor session',
                seen: false
                //the date
                // the time
            }
            const createSession =  await TutorSession.create(sessionData)
            if (!createSession) {
            return res.status(404).json({ error: 'Session was not created' });
            }

            return res.status(200).json(createSession);
            } catch(err){
                console.error(err, 'idk waht to put here')
            }
    }

}
export default students