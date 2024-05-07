// tách đoạn code xử lý logic cho request tạo bài post mới
const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = async (req,res) => {
  try {
    // Check if the request contains files
    if (!req.files || !req.files.image) {
      console.error("No image uploaded");
      return res.status(400).send("No image uploaded");
    }

    let image = req.files.image;

    // Move the uploaded image to the desired directory
    image.mv(
      path.resolve(__dirname, "../public/upload", image.name),
      async function (err) {
        if (err) {
          console.error("Error moving image:", err);
          return res.status(500).send("Internal Server Error");
        }

        // Create a new blog post with the request body
        const blogPost = await BlogPost.create({
          ...req.body,
          image: "/upload/" + image.name,
        });
        console.log("Blog post created:", blogPost);

        // Redirect to the homepage after creating the blog post
        res.redirect("/");
      }
    );
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).send("Internal Server Error");
  }
}