const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find({});
    console.log(req.session)
    console.log("Blog posts:", blogPosts);
    res.render("index", { blogPosts }); // Pass fetched blog posts to the template
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).send("Internal Server Error");
  }
};
