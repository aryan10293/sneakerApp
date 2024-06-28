import jwt from "jsonwebtoken";
import User from "../model/User.js";
import TutorSession from "../model/TutorSession.js";
import Notifications from "../model/Notifications.js";
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
        const tutor = await User.findOne({_id: req.body.tutorId})
        if(tutor.upcomingSessions[req.body.appointmentTimeDetails.date] !== undefined && tutor.upcomingSessions[req.body.appointmentTimeDetails.date].includes(req.body.appointmentTimeDetails.time)){
            return res.status(409).json({ status:'409', error:'Conflict' ,message: 'The requested time has already been book! Please Select another time or different day!' })
        } else {
            try{
                const sessionData = {
                    text:req.body.text,
                    studentName:req.body.studentName,
                    tutorName:req.body.tutorName,
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
                }
                const createSession =  await TutorSession.create(sessionData)
                if (!createSession) {
                return res.status(404).json({ status:'404', message:'error is unknown, Please try again!'});
                }

                return res.status(200).json({status:'200', message:'session was sucessfully requested', sessionData: createSession});
                } catch(err){
                    
                    console.error(Object.keys(err.errors), 'idk what to put here')
                    if(Object.keys(err.errors).length>=1){
                        const errors = Object.keys(err.errors).map(x => `${x} is required`)
                        return res.status(400).json({status:'400', message:errors.join(', ')})
                    }
                }
        }
    },
    getRequestedSessions: async (req,res) => {
        try {
            const yourSessionRequest = await TutorSession.find({userId: req.params.id})
            console.log(yourSessionRequest)
            return res.status(200).json(yourSessionRequest)
        } catch (error) {
            console.error(error, 'shit broke brother')
        }
    },
    addNoti: async (req,res) => {
        try {
            let didSendToDataBase = true
            for(let i = 0; i<req.body.notiData.length; i++){
                const notiData = {
                    date: req.body.notiData[i].date,
                    message: req.body.notiData[i].message,
                    userId: req.body.notiData[i].userId,
                    typeOfNoti: req.body.notiData[i].typeOfNoti,
                    isRead: req.body.notiData[i].isRead,
                    extras: req.body.notiData[i].extras  
                }  
                const sendNoti = await Notifications.create(notiData)
                if(!notiData){
                    didSendToDataBase = false
                    break
                }
             }
            if(!didSendToDataBase){
                return res.status(404).json({ status:'404', message:'error is unknown, Please try again!'});
            }
            return res.status(200).json({status:'200', message:'i can honestly say, i have no idea what im doing!'});
        } catch (error) {
                if (error.name === 'ValidationError') {
                    return res.status(400).json({ status: '400', message: 'Validation error', details: error.message });
                }

                if (error.name === 'SequelizeDatabaseError') { 
                    return res.status(500).json({ status: '500', message: 'Database error', details: error.message });
                }

                return res.status(500).json({ status: '500', message: 'An unexpected error occurred', details: error.message });
            }       
    }, 
    getNoti: async (req,res) => {
        try {
            const notifactions = await Notifications.find({userId: req.params.id})
            const idk = await Notifications.find({tutorId: req.params.id})
            const notis =  [...idk, ...notifactions]
            
            if(notis.length === 0) {
                    return res.status(404).json({ status:'404', message:'user doesnt have any data'});
                }
            return res.status(200).json({status:'200', message:'i can honestly say, i have no idea what im doing!', details:notis});
        } catch (error) {
            return res.status(500).json({ status: '500', message: 'An unexpected error occurred.', error: error.message });
        }
    },
    getConfirmedSessions: async (req,res) => {
        console.log(`time to cook`)
        try {
            const userNotications = await Notifications.find({userId: req.params.id})
            if(userNotications.length === 0){
                throw new Error('User has no upcomign sessions')
            }
            // for the fucks sakes of me being lost asf ima send this bitch to the fornt end hoping eveything is smooth
            res.status(200).send(userNotications)
            // console.log(userNotications, req.params.id, req.params)
        } catch (error) {
            console.log(error)
            return res.status(400).send(error.message)
        }

    },

}
export default students