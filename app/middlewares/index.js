"use strict";

const bodyParser = require("body-parser");

module.exports = {
    /*makes sure a user is logged in by redirecting them if their not*/
    forceLogIn: (req, res, next) => {
        if (req.isAuthenticated())
            return next();
        else {
            req.flash("errorMessages", "You must be logged in to view " + req.path);
            req.flash("redirect", req.originalUrl);
            res.redirect("/login");
        }
    },
    forceAdmin: (req, res, next) => {
        if (req.user && req.user.isAdmin)
            return next();
        else {
            req.flash("redirect", req.originalUrl);
            req.flash("errorMessages", "You must be logged in as an administrator to view " + req.path);
            res.redirect("/login");
        }
    },
    parseForm: bodyParser.urlencoded({extended: false})
};