const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    content:{
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipe:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipes",
        required: true,
    },
}, { timestamps: true }
);

const Comment = new mongoose.model("Comment", CommentSchema);
module.exports = Comment;