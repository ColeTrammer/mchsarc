"use strict";

const mw = require("../middlewares");

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.render("index");
    });

    app.get("/signup", (req, res) => {
        res.render("signup");
    });

    app.post("/signup", mw.parseForm, passport.authenticate("local-signup", {
        successRedirect: "/",
        failureRedirect: "/signup",
        failureFlash: true
    }));

    app.get("/login", (req, res) => {
        res.render("login");
    });

    app.post("/login", mw.parseForm, passport.authenticate("local-login", {
        successRedirect: "/",
        failureFlash: "/login",
        failureFlash: true
    }));

    app.get("*", (req, res) => {
        res.status(404);
        res.render("404");
    });
};