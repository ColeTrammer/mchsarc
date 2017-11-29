"use strict";

if (process.env.NODE_ENV !== "production") {
    require("dotenv").load();
}
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const routes = require("./app/routes");
const passport = require("passport");
const session = require("express-session");
const sass = require("express-compile-sass");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
require("./app/config/passport")(passport);

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true });

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", "pug");
app.set("port", process.env.PORT);

//compiles my sass into css
app.use(sass({
    root: __dirname,
    sourceMap: true,
    sourceComments: true,
    watchFiles: true,
    logToConsole: false
}));
//allows access of the public directory
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
/*loads any messages for the user into the view on every request
also sends the user*/
app.use((req, res, next) => {
    res.locals.successMessages = req.flash("successMessages");
    res.locals.errorMessages = req.flash("errorMessages");
    next();
});

//calling all of the routes
routes(app, passport);

app.listen(app.get("port"));