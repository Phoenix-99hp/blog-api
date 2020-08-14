const mongoose = require('mongoose');
const Comment = require("./Comment");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        text: { type: String, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
    }
);

PostSchema.pre('remove', function (next) {
    console.log("removing comments...");
    for (let i = 0; i < this.comments.length; i++) {
        Comment.remove({ _id: this.comments[i]._id }).exec();
    }
    next();
});

module.exports = mongoose.model("Post", PostSchema);