
const User = require("../models/User.js");

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log("User created:", user);

    res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    if (error) {
      return res.redirect('/auth/register')
    }
    // res.status(500).send("Internal Server Error");
  }
};
