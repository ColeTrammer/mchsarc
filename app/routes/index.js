"use strict";

const mw = require("../middlewares");
const Annoucement = require("../models/announcement");

/*Static pages simply render a view file with the same name as the path*/
const staticPages = [
    "login",
    "signup",
    //"about",
    //"licensing"
];

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        Annoucement.find({}, (err, announcements) => {
            if (err)
                throw err;
            announcements = announcements.sort((a, b) => a.created < b.created);
            res.render("pages/index", { announcements: announcements });
        });
    });

    app.get("/loginSuccess", (req, res) => {
        const redirect = req.flash("redirect");
        res.redirect(redirect.length !== 0 ? redirect : "/");
    });

    app.post("/signup", mw.parseForm, passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.post("/login", mw.parseForm, passport.authenticate("local-login", {
        successRedirect: "/loginSuccess",
        failureRedirect: "/login",
        failureFlash: true
    }));

    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    staticPages.forEach(path => {
        app.get("/" + path, (req, res) => {
            res.render("pages/" + path);
        });
    });

    require("./announcement")(app);

    app.all("*", (req, res) => {
        res.status(404);
        res.render("pages/404");
    });
};