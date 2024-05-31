import jwt from "jsonwebtoken";
import User from "../model/User.js";
import TutorSession from "../model/TutorSession.js";
import Notifications from "../model/Notifications.js";
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
    editProfile: async (req,res) => {  
        let updateUser    
        console.log(req.body.profilePic === undefined)  
        try{
             if(req.body.profilePic !== undefined){
                 updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { img: await uploadImage(req.body.profilePic), bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, courses: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major, why:req.body.why, availabity:req.body.availabity, zone:req.body.zone},
                    }
                )
            } else {
                 updateUser = await User.findOneAndUpdate(
                    {_id: req.body.id},
                    {
                        $set: { bio: req.body.bio, userName: req.body.username, dob:req.body.dob, city: req.body.city, state:req.body.state, courses: req.body.subjects, yearInSchool: req.body.yearInSchool, school:req.body.school, major:req.body.major, why:req.body.why, availabity:req.body.availabity, zone:req.body.zone},
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
    getTutorSessions: async (req,res) => {
        try {
            const yourSessionRequest = await TutorSession.find({tutorId: req.params.id})
            return res.status(200).json(yourSessionRequest)
        } catch (error) {
            console.error(error, 'shit broke brother')
        }
    }, 
    getStudentImages: async (req,res) => {
        const imgArray =[]
        try {
            await Promise.all(req.body.stuff.map(async (x, i) => {
                const userImg = await User.find({ _id: x });
                imgArray.push(userImg[0].img);
        }));
            return res.status(200).json(imgArray);
        } catch (error) {
            console.error('Error fetching images:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
     getTutorSession: async (req,res) => {
        try {
            const yourSessionRequest = await TutorSession.find({_id: req.params.id})
            return res.status(200).json(yourSessionRequest)
        } catch (error) {
            console.error(error, 'shit broke brother')
        }
    }, 
    confirmSession: async (req,res) => {
        // if req.body.hasSessionPassed is true dont head and delete the event from pednign notifactions 
        // if its true then  run the rest of this shit

        const student = await User.findOne({_id: req.body.student})
        const tutor = await User.findOne({_id: req.body.tutor})

        // how should i construct a the upcoming session object in the users data object
            // have the date that as the name of the object.
                // and sets its value to and object 
                    // it can hold an object with the session data 
                    // acess the date we need and see if has a schdule session 
                        // if it does then send some time of error message saying 'one of yall are already book for this time'
                        // or continue with the function
        // student.upcomingSessions[`${req.body.date}`] = req.body.time
        // console.log(student)

        console.log(tutor.upcomingSessions[req.body.date] === undefined && student.upcomingSessions[req.body.date] === undefined)
        
        if(tutor.upcomingSessions[req.body.date] === undefined && student.upcomingSessions[req.body.date] === undefined){
            null
        } else if(tutor.upcomingSessions[req.body.date].includes(req.body.time)){
            return  res.status(409).json({status:'409', message:'You already have a session book for this day and time!'})
        } else if(student.upcomingSessions[req.body.date].includes(req.body.time)){
            return  res.status(409).json({status:'409', message:'The student has recently booked a session at this date and time!'})
        }

        const result = await User.updateOne({_id: req.body.student}, {
            $set: {
                    [`upcomingSessions.${req.body.date}`]: !student.upcomingSessions[req.body.date] ? [req.body.time] : [...student.upcomingSessions[req.body.date], req.body.time]
                }
            });

        const addingTutorStuffToAnArray = await User.updateOne({_id: req.body.tutor}, {
            $set: {
                    [`upcomingSessions.${req.body.date}`]: !student.upcomingSessions[req.body.date] ? [req.body.time] : [...student.upcomingSessions[req.body.date], req.body.time]
                }
            });

           return res.status(200).json('this session was comfirmed')

    },
    deleteScheduleRequestFromDatabase: async (req,res) => {
        const session =  await TutorSession.findOneAndDelete({ _id: req.body.session })

        if(req.body.howItisGettingDeleted === 'accept'){
            return res.status(200).json('your session was succesfully booked')
        } else if(req.body.howItisGettingDeleted === 'decline'){
            return res.status(200).json('you declined this session')
        } 

    },
    getPendingSessions: async (req,res) => {
        const tutorsPendingSessions = await TutorSession.find({tutorId: req.params.id})
        const date1 = req.params.date.split('-')

        let thePendingSessions =  tutorsPendingSessions.filter(x => {
            const date2 = x.appointmentTimeDetails.date.split('-')
            if(Number(date1[0])=== Number(date2[0]) && Number(date1[1])=== Number(date2[1]) && Number(date1[2])=== Number(date2[2])){
                return x.appointmentTimeDetails.time
            } else {
                null
            }
        })
        thePendingSessions = thePendingSessions.map(x => x.appointmentTimeDetails.time)
        return res.status(200).json(thePendingSessions)
    }


}
export default teachers

