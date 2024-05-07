// tách đoạn code xử lý logic cho request tạo bài post mới
const BlogPost = require("../models/BlogPost");

module.exports = async (req,res) => {
  try {
    const detailPost = await BlogPost.findById(req.params.id);

    if (!detailPost) {
      return res.status(404).send("Post not found");
    }

    // Render the 'post' template with the fetched blog post data
    console.log(detailPost);
    res.render("post", { detailPost });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).send("Internal Server Error");
  }
}