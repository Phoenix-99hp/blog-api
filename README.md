# Node/Express Blog Back-End

This is the Node/Express back-end part of my blog website that is deployed to Heroku. 

Check out the front-end site ("https://phoenix-99hp.github.io/blog-posts/") to see it in action!

Essentially, this Node/Express back-end handles requests from two React front-end sites (blog-posts and blog-author). blog-posts (https://github.com/Phoenix-99hp/blog-posts) is the guest site where guests can read my blog posts and leave comments, and blog-author (https://github.com/Phoenix-99hp/blog-author) is my personal site where I can write and publish blog posts and delete existing posts and comments. 

This node/Express back-end uses MongoDB to store blog posts and comments. API calls are made to this back-end from the two front-end sites to retrieve existing posts and comments. 

The inspiration for this project came from The Odin Project's Full-Stack Javascript curriculum (https://www.theodinproject.com).