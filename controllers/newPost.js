// tách đoạn code xử lý logic cho request tạo bài post mới
const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  if (req.session.userId) {
    try {
      const blogPosts = await BlogPost.find({});
      console.log("Blog posts:", blogPosts);
      res.render("create", { blogPosts }); // Pass fetched blog posts to the template
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  res.redirect("/auth/login");
};
