"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: String,
    content: String,
    owner: mongoose.Schema.Types.ObjectId,
    created: Date,
    updated: Date
});

module.exports = mongoose.model("Announcement", schema);