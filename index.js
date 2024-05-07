const express = require("express")
const app = new express()
const expressSession = require('express-session')

global.loggedIn = null; // truy cập biến này trong các file EJS

const ejs = require("ejs");
app.set("view engine", "ejs"); // thông báo cho ExpressJS biết template engine là EJS, rằng các file có đuôi là .ejs cần phải render bởi EJS package

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/test_my_database")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


const newPostController = require('./controllers/newPost.js')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const validateMiddleware = require("./middleware/validationMiddleware")
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')

const loginUserController = require('./controllers/loginUser')
const authMiddleware = require('./middleware/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use('/posts/store',validateMiddleware)


app.use(expressSession({
  secret: 'keyboard cat'
}))

app.use("*", (req, res, next) => {  // (*) áp dụng cho mọi request
  loggedIn = req.session.userId;    // gán UserId cho biến loggedIn
  next()
  });

app.get("/about", (req, res) => {
  //res.sendFile(path.resolve(__dirname,'pages/about.html'))
  res.render("about");
});
app.get("/contact", (req, res) => {
  //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
  res.render("contact");
});


app.get("/", homeController);

app.post("/posts/store", authMiddleware, storePostController);

app.get("/post/:id", getPostController);

app.get('/posts/new', authMiddleware, newPostController)

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController)

app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.use((req, res) => res.render('notfound'));






