import mongoose from "mongoose"

const NotificationsSchema = new mongoose.Schema({
    date:{ type: String, required: true},
    message:{ type: String, required: true},
    userId:{ type: String, required: true},
    typeOfNoti: { type: String, required: true},
    isRead: { type: Boolean, default:false},
    extras:{type: Array, required:false}
});

const Notifications = mongoose.model('Notifications', NotificationsSchema);
export default Notifications
