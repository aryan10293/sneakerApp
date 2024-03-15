import passport from "passport"
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
let auth = {
    getCreateAccount: (req,res) => {

        res.render("create.ejs")
    },
    getLogin: (req,res) => {
      res.render("login.ejs")
  },
    postCreateAccount: (req, res, next) => {
      console.log(req.body)
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
          validationErrors.push({ msg: "Please enter a valid email address." });
        if (!validator.isLength(req.body.password, { min: 8 }))
          validationErrors.push({
            msg: "Password must be at least 8 characters long",
          });
        if (req.body.password !== req.body.confirmPassword)
          validationErrors.push({ msg: "Passwords do not match" });
      
        if (validationErrors.length) {
          console.log(validationErrors)
          req.flash("errors", validationErrors);
          //return res.redirect("../");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
        const user = new User({
          userName: req.body.userName,
          email: req.body.email,
          password: req.body.password,
        });
        User.findOne(
          { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
          (err, existingUser) => {
            if (err) {
              return next(err);
            }
            if (existingUser) {
              req.flash("errors", {
                msg: "Account with that email address or username already exists.",
              });
             // return res.redirect("../");
            }
            user.save((err) => {
              if (err) {
                return next(err);
              }
              req.logIn(user, (err) => {
                if (err) {
                  return next(err);
                }
                const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.send(
                  { token, newUser: user }
                )
              });
            });
          }
        );
      },
      postLogin: (req,res,next) => {
        const validationErrors = [];
        if (!validator.isEmail(req.body.email))
          validationErrors.push({ msg: "Please enter a valid email address." });
        if (validator.isEmpty(req.body.password))
          validationErrors.push({ msg: "Password cannot be blank." });
      
        if (validationErrors.length) {
          req.flash("errors", validationErrors);
          return res.redirect("/login");
        }
        req.body.email = validator.normalizeEmail(req.body.email, {
          gmail_remove_dots: false,
        });
      
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            req.flash("errors", info);
            return res.redirect("/login");
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            req.flash("success", { msg: "Success! You are logged in." });
            
             const token = jwt.sign({ sub: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
             res.send(
                  { token, newUser: user }
                )
          });
        })(req, res, next);
      },
      logout: (req,res) => {
        req.logout(() => {
          console.log('User has logged out.')
        })
        req.session.destroy((err) => {
          if (err)
            console.log("Error : Failed to destroy the session during logout.", err);
          req.user = null;
          res.redirect("/");
        });
      },
      checkUser:  async (req,res) => {
        jwt.verify(req.params.token, process.env.SECRET_KEY, async (err, decoded) => {
          if (err) {
            // Token is invalid or expired
            // Handle unauthorized access
            res.status(401).json({ success: false, message: 'Invalid or expired token. Please log in again.' });
          } else {
            const userId = decoded.sub;
            // Fetch user account data from the database based on userId
            let thisIsAwe = await User.find({_id: userId}) // user info if token is not expired
            res.status(200).json({success: true, message:'this shit working brother enjoy yourself youre loggen in', userinfo: thisIsAwe})
          }
        });
    }
}
export default auth