"use strict";

const bodyParser = require("body-parser");

module.exports = {
    /*makes sure a user is logged in by redirect them if their not*/
    forceLogIn: (req, res, next) => {
        req.flash("redirect", req.originalUrl);//puts where to redirect the user in their session
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("errorMessages", `You must be logged in to view ${req.path}`);
            res.redirect("/login");
        }
    },
    parseForm: bodyParser.urlencoded({extended: false})
};