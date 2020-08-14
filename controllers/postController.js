const db = require('../models');

exports.index = (req, res, next) => {
    db.Post.find()
        .limit(1)
        .populate("comments")
        .exec((err, results) => {
            if (err) {
                res.json({ post: null });
            }
            res.json({ post: results })
        })
}

exports.next = (req, res, next) => {
    db.Post.find({ _id: { $gt: req.params.id } })
        .sort({ _id: 1 })
        .limit(1)
        .populate("comments")
        .exec((err, results) => {
            if (results[0] === undefined) {
                db.Post.find()
                    .sort({ _id: 1 })
                    .limit(1)
                    .populate("comments")
                    .exec((err, first) => {
                        res.json({ post: first })
                    })
            }
            else {
                res.json({ post: results })
            }
        })
}

exports.prev = (req, res, next) => {
    db.Post.find({ _id: { $lt: req.params.id } })
        .sort({ _id: -1 })
        .limit(1)
        .populate("comments")
        .exec((err, results) => {
            if (results[0] === undefined) {
                db.Post.find()
                    .sort({ _id: -1 })
                    .limit(1)
                    .populate("comments")
                    .exec((err, last) => {
                        console.log(last);
                        res.json({ post: last })
                    })
            }
            else {
                res.json({ post: results })
            }
        })
}

exports.newComment = (req, res, next) => {
    console.log(req.body);
    const adjustedText = req.body.newComment.trim();
    const adjustedName = req.body.name.trim();
    console.log(adjustedText.length);
    if ((/^[a-z0-9\s@\.\-,]+$/i.test(adjustedName) === false) || (adjustedName === " ") || (adjustedName.length === 0)) {
        res.json({ updated: null, specific: "/error/characters" });
    }

    else if ((adjustedText.length > 200) || (adjustedText === " ") || (adjustedText.length === 0)) {
        res.json({ updated: null, specific: "/error/comment" });
    }

    else if ((/^[a-z0-9\s@\.\-,]+$/i.test(adjustedName) === true) && (adjustedText.length <= 200)) {
        console.log("passed");
        const comment = new db.Comment({ text: adjustedText, name: adjustedName })
        comment.save((err, result) => {
            if (err) {
                console.log("Error saving comment", err);
                return
            }
            db.Post.findByIdAndUpdate(req.body.post, { $push: { comments: result } })
                .populate("comments")
                .exec((err, results) => {
                    if (err) {
                        console.log(err)
                    }
                    console.log(results);
                    res.json({ updated: results });
                })
        });
    }
}