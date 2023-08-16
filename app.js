const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');
const app = express();
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://julianasogwa96:Chelsea2082@cluster0.sbtz5z1.mongodb.net/blogDB?retryWrites=true&w=majority"
//const mongoDB = "mongodb://127.0.0.1:27017/blogDB"

const homeStartingContent = "Welcome to my blog/personal portfolio. I am Julian Asogwa a 19 year old Junior in Computer Science and Mathematics.I am currently looking for internship roles in CS fields, especially Software Engineering and Quantitative Analysis or Trading. This blog serves as a platform for me to write about the personal projects and professional work I have done. This blog was built using Node.js and Express.js with a MongoDB database to store the blog posts."
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "1. Linkedin - https://www.linkedin.com/in/julian-asogwa\n" +
"2. GitHub - https://github.com/jSogs/\n"+
"3.Email - julianasogwa96@gmail.com";

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect(mongoDB).then((res)=>{
    console.log("Successfully connected");
}).catch((error)=>{
    console.log(error);
});

const postSchema = new mongoose.Schema({
    postTitle: String,
    postContent: String
});
const Post = new mongoose.model("Post",postSchema);

app.get("/",(req,res)=>{
    Post.find({}).exec().then((foundPosts)=>{
        res.render("home",{homeStartingContent:homeStartingContent,posts:foundPosts});
    }).catch((error)=>{
        console.error("Error: ",error);
    });
});

app.post("/",(req,res)=>{
    const post = new Post({
        postTitle:req.body.postTitle,
        postContent:req.body.postContent
    });
    post.save();
    res.redirect("/");
});

app.get("/posts/:postId",(req,res)=>{
    const requestedId = req.params.postId.trim().substring(1,req.params.postId.length);;
    Post.findById(requestedId).exec().then((post)=>{
        res.render("post",{
            postTitle:post.postTitle,
            postContent:post.postContent
        });
    }).catch((error)=>{
        console.error("Error: ",error);
    });
});

app.get("/about",(req,res)=>{
    res.render("about",{aboutContent:aboutContent});
});

app.get("/contact",(req,res)=>{
    res.render("contact",{contactContent:contactContent});
});

app.get("/compose",(req,res)=>{
    res.render("compose");
});

app.listen(process.env.PORT||3000, ()=>{
    console.log("Server is running");
});