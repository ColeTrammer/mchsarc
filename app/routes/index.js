"use strict";

module.exports = (app, passport) => {
    app.get("/", (req, res) => {
        res.send("Hi");
    })
};