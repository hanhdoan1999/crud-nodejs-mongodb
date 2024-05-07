const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/test_my_database")
  .then(() => {
    console.log("Connected to MongoDB");

    const newBlogPost = new BlogPost({
      title: "Node.js cơ bản",
      body: "test",
    });

    return newBlogPost.save(); // Return the Promise
  })
  .then(savedBlogPost => {
    console.log("Blog post saved successfully:", savedBlogPost);
    mongoose.disconnect(); // Disconnect from MongoDB after saving
  })
  .catch(error => {
    console.error("Error:", error);
  });
