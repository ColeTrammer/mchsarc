const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const validator = require("email-validator");

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, done);
    });

    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ email: email }, (err, user) => {
                if (err)
                    return done(err);

                if (!validator.validate(email))
                    return done(null, false, req.flash("errorMessages", "Invalid email."));

                if (!password)
                    return done(null, false, req.flash("errorMessages", "Password required."));

                if (user)
                    return done(null, false, req.flash("errorMessages", "That email is already taken."));

                const newUser = new User();
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.role = "member";
                newUser.isAdmin = false;

                newUser.save((err) => {
                    if (err)
                        return done(err);

                    return done(null, newUser);
                });
            });
        });
    }));

    passport.use("local-login", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
    }, (req, email, password, done) => {
        process.nextTick(() => {
            User.findOne({ email: email }, (err, user) => {
                if (err)
                    return done(err);

                if (!user)
                    return done(null, false, req.flash("errorMessages", "User not found."));

                if (!user.validPassword(password))
                    return done(null, false, req.flash("errorMessages", "Wrong password."));

                return done(null, user);
            });
        });
    }));
};