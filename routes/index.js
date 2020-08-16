const postController = require("../controllers/postController");
const authorController = require("../controllers/authorController");
const cors = require('cors');

const corsOptions = {
    origin: "https://phoenix-99hp.github.io/blog-posts",
    optionsSuccessStatus: 200
}

const corsOptionsAuthor = {
    origin: "https://phoenix-99hp.github.io/blog-author",
    optionsSuccessStatus: 200
}

module.exports = function (app) {

    // Guest routes
    app.get("/api/posts", cors(corsOptions), postController.index);

    app.get("/api/posts/:id/next", cors(corsOptions), postController.next);

    app.get("/api/posts/:id/prev", cors(corsOptions), postController.prev);

    app.post("/api/posts", cors(corsOptions), postController.newComment);

    // Blog author routes
    app.post("/api/posts/new", cors(corsOptionsAuthor), authorController.newPost);

    app.delete("/api/posts/:id/delete", cors(corsOptionsAuthor), authorController.deletePost);

    app.post("/api/login", cors(corsOptionsAuthor), authorController.login);

    app.delete("/api/comments/:id/delete", cors(corsOptionsAuthor), authorController.deleteComment);

    app.delete("/api/posts/:id/comments/delete", cors(corsOptionsAuthor), authorController.deleteAllComments);

}