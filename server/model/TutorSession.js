import mongoose from "mongoose"

const TutorSchema = new mongoose.Schema({
    text:{ type: String, required: true},
    name:{ type: String, required: true},
    email:{ type: String, required: true},
    appointmentTimeDetails: {
        date:{ type: String, required: true},
        time:{ type: String, required: true},
        subject: { type: String, required: false}
    },
    userId:{ type: String, required: true},
    tutorId: { type: String, required: true},
    date: { type: Date, required: true},
});

const TutorSession = mongoose.model('TutorSchema', TutorSchema);
export default TutorSession
