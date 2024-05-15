import bcrypt from "bcrypt"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true , required: true},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, unique: true },
  messages: {type:Array},
  password: {type: String, required: true},
  tutor:{type: Boolean, required: true},
  courses:{type: Array, required: false},
  bio: {type: String, default: ''},
  img: {type: String,  default: 'https://s-media-cache-ak0.pinimg.com/736x/dd/6f/40/dd6f403a57b73215b5be860bd397ec34.jpg'},
  major: {type: String, default: ''},
  school: {type: String, default: ''},
  yearInSchool: {type: String, default: ''},
  city: {type: String, default: ''},
  state: {type: String, default: ''},
  dob: {type: String, default: ''},
  subjects:{type: Array, required: false},
  why:{type: String, default: ''},
  upcomingSessions:{type: Object, default:{lol:true}},
  availabity: {type: Object, default:{}}


  //cd {type: Object, required:false}
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
export default User
