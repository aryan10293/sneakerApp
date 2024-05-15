import jwt from "jsonwebtoken";
import User from "../model/User.js";
import TutorSession from "../model/TutorSession.js";
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
        // try {
        //     await student.save();
        //     console.log("Student session updated successfully");
        // } catch (error) {
        //     console.error("Error saving student session:", error);
        // }
        // console.log(student[0].upcomingSessions)
        // console.log(tutor[0].upcomingSessions)
        // console.log(req.body)
    }


}
export default teachers

