const db = require('../models');

exports.newPost = (req, res, next) => {
    console.log(req.body.user);
    const adjustedTitle = req.body.title.trim();
    const adjustedText = req.body.text.trim();
    const newPost = new db.Post({ title: adjustedTitle, text: adjustedText, user: req.body.user });
    newPost.save((err, result) => {
        if (err) {
            console.log(err);
            res.json({ updated: null });
        }
        else {
            console.log("Post successfully published!", result);
            res.json({ updated: result });
        }
    })
}

exports.deletePost = (req, res, next) => {
    db.Post.findByIdAndRemove(req.params.id)
        .exec((err, result) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < result.comments.length; i++) {
                db.Comment.findByIdAndRemove({ _id: result.comments[i]._id })
                    .exec()
            }
            res.json(result);
        });
}

exports.login = (req, res, next) => {
    if (req.body.password == process.env.USER_PW) {
        db.User.findOne()
            .exec((err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.json(result)
            })
    }
    else {
        res.json(null);
    }
}

exports.deleteComment = (req, res, next) => {
    db.Comment.findByIdAndRemove(req.params.id)
        .exec((err, result) => {
            if (err) {
                console.log(err);
            }
            res.json(result);
        });
}

exports.deleteAllComments = (req, res, next) => {
    db.Post.findById(req.params.id)
        .exec((err, result) => {
            if (err) {
                console.log(err);
            }
            for (let i = 0; i < result.comments.length; i++) {
                db.Comment.findByIdAndRemove({ _id: result.comments[i] })
                    .exec()
            }
            res.json(result);
        });
}
