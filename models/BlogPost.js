const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  userName: String,
  datePosted: {
    type: Date,
    default: new Date()
  },
  image: String
});

const BlogPost = mongoose.model('BlogPost',BlogPostSchema); 
// Chúng ta truy cập vào cơ sở dữ liệu thông qua hàm mongoose.model(...). Trong đó,
// tham số đầu tiên chính tên của Collection tương ứng với model này.
module.exports = BlogPost