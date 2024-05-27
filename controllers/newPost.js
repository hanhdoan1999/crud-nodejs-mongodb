const BlogPost = require("../models/BlogPost");

const fetchBlogPosts = async () => {
  try {
    return await BlogPost.find({});
  } catch (error) {
    throw new Error("Error fetching blog posts:", error);
  }
};

module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }

  try {
    const blogPosts = await fetchBlogPosts();
    console.log("Blog posts:", blogPosts);
    res.render("create", { blogPosts }); // Pass fetched blog posts to the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
