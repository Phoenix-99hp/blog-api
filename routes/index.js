const postController = require("../controllers/postController");
const authorController = require("../controllers/authorController");
const cors = require('cors');

const corsOptions = {
    origin: "https://phoenix-99hp.github.io",
    optionsSuccessStatus: 200
}

module.exports = function (app) {

    // Guest routes
    app.get("/api/posts", cors(corsOptions), postController.index);

    app.get("/api/posts/:id/next", cors(corsOptions), postController.next);

    app.get("/api/posts/:id/prev", cors(corsOptions), postController.prev);

    app.post("/api/posts", cors(corsOptions), postController.newComment);

    // Blog author routes
    app.post("/api/posts/new", cors(corsOptions), authorController.newPost);

    app.delete("/api/posts/:id/delete", cors(corsOptions), authorController.deletePost);

    app.post("/api/login", cors(corsOptions), authorController.login);

    app.delete("/api/comments/:id/delete", cors(corsOptions), authorController.deleteComment);

    app.delete("/api/posts/:id/comments/delete", cors(corsOptions), authorController.deleteAllComments);

}