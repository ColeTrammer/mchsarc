"use strict";

const mw = require("../middlewares");

/*Static pages simply render a view file with the same name as the path*/
const staticPages = [
    "login",
    "signup",
    //"about",
    //"licensing"
];

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.render("pages/index");
    });

    app.post("/signup", mw.parseForm, passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.post("/login", mw.parseForm, passport.authenticate("local-login", {
        successRedirect: "/",
        failureFlash: "/login",
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

    app.get("*", (req, res) => {
        res.status(404);
        res.render("pages/404");
    });
};