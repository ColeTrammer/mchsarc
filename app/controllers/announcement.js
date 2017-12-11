"use strict";

const Announcement = require("../models/announcement");

module.exports = {
    all: (req, res) => {
        Announcement.find({}, (err, announcements) => {
            if (err)
                res.redirect("/");
            announcements = announcements.sort((a, b) => a.created < b.created);
            res.render("announcements", { announcements: announcements });
        });
    },
    show: (req, res) => {
        Announcement.findById(req.params.id, (err, annoucememt) => {
            if (err) {
                req.flash("errorMessages", "Announcement not found.");
                return res.redirect("/announcements");
            }
            res.render("announcements/show", { announcement: annoucememt });
        });
    },
    new: (req, res) => {
        res.render("announcements/new");
    },
    create: (req, res) => {
        if (req.body && req.body.title && req.body.content)
            Announcement.create({
                title: req.body.title,
                content: req.body.content,
                created: new Date(),
                updated: new Date(),
                owner: req.user._id
            }, (err) => {
                if (err)
                    return res.redirect("/announcements/new");
                req.flash("successMessages", "Announcement created.");
                res.redirect("/announcements");
            });
        else {
            req.flash("errorMessages", "Invalid announcement.");
            res.redirect("/announcements/new");
        }
    },
    update: (req, res) => {
        Announcement.findById(req.params.id, (err, annoucememt) => {
            if (err) {
                req.flash("errorMessages", "Announcement not found.");
                return res.redirect("/announcements");
            }
            res.render("announcements/update", { announcement: annoucememt });
        });
    },
    patch: (req, res) => {
        if (req.body && req.body.title && req.body.content)
            Announcement.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                content: req.body.content,
                updated: new Date()
            }, (err, announcememt) => {
                if (err) {
                    req.flash("errorMessages", "Announcement not found.");
                    return res.redirect("/announcements");
                }
                req.flash("successMessages", "Update successful.");
                res.redirect("/announcements/" + announcememt._id);
            });
        else {
            req.flash("errorMessages", "Invalid announcement.");
            res.redirect("/announcements/" + req.params.id + "/update");
        }
    },
    delete: (req, res) => {
        Announcement.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                req.flash("errorMessages", "Announcement not found.");
                return res.redirect("/announcements");
            }
            req.flash("successMessages", "Announcement deleted.");
            res.redirect("/announcements");
        });
    }
};