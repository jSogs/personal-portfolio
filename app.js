const express = require('express');
const ejs = require('ejs');
const _ = require('lodash');
const app = express();
const mongoose = require('mongoose');
const mongoDB = "mongodb+srv://julianasogwa96:Chelsea2082@cluster0.sbtz5z1.mongodb.net/blogDB?retryWrites=true&w=majority"
//const mongoDB = "mongodb://127.0.0.1:27017/blogDB"

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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