"use strict";

const Announcements = require("../controllers/announcement");
const mw = require("../middlewares");

module.exports = (app) => {
    app.get("/announcements", Announcements.all);

    app.get("/announcements/new", mw.forceAdmin, Announcements.new);
    app.post("/announcements/new", mw.forceAdmin, mw.parseForm, Announcements.create);

    app.get("/announcements/:id", Announcements.show);

    app.get("/announcements/:id/update", mw.forceAdmin, Announcements.update);
    app.post("/announcements/:id/update", mw.forceAdmin, mw.parseForm, Announcements.patch);

    app.get("/announcements/:id/delete", mw.forceAdmin, Announcements.delete);
};