const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://<user_id>:<password>@cluster0.5yqqc.mongodb.net/<databaseName>");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
let save = (elem)=>{
  elem.save();
};

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String
  }
);
const urlSchema = new mongoose.Schema(
  {
    url: String
  }
);
const Post = mongoose.model("post",postSchema);
const URL = mongoose.model("url",urlSchema);
/*let posts = [];
let urls= [];
Post.find((err,psts)=>{
  posts = err?[]:psts
  if(err)
  {
    console.log("err");
  }
  else
  {
    console.log(psts);
    posts = psts;
  }
});
URL.find((err,links)=>{
  if(err)
  {
    console.log("err");
  }
  else
  {
    console.log(links);
    urls = links;
  }
});*/
app.get("/",(req,res)=>{
   //console.log(gArry(Post));
   Post.find((err,psts)=>{
    if(err)
      console.log("Post find Error");
    else
    {
      URL.find((err,links)=>{
        if(err)
          console.log("URL find error");
        else
        {
          //console.log(links.forEach((ele)=>{console.log(ele.url)}));
          res.render("home",{Content: homeStartingContent,logs:psts, adrs:links});
        }
      });
    }
  });
});
app.get("/:quer",(req,res)=>{
  URL.find((err,links)=>{
    if(err)
      console.log("URL find Error");
    else
    {
      let query = {url: req.params.quer};
  if(query.url=="about")
  {
    res.render("about",{Content: aboutContent});
  }
  else if(query.url=="contact")
  {
    res.render("contact",{Content: contactContent});
  }
  else if(query.url=="compose")
  {
    res.render("compose",{});
  }
  else if(links.find(ele => ele.url==query.url)!=undefined)
  {
    
    let post;
    Post.find((err,posts)=>{
      if(err)
        console.log("Post find error");
      else
      {
        posts.forEach((ele)=>{
          if(ele.title.toLowerCase()==query.url.replace(/[-]/g," "))
          {
            post = ele;
            return;
          }
        });
        res.render("post",{Title:post.title, Content: post.content });
      }
    });
    
  }
  else
  {
    console.log(query);
    res.sendStatus(404);
  }
    }
  });
  
});
app.post("/compose",(req,res)=>{
  let post = {
    title: req.body.title,
    content: req.body.post
  };
  //posts.push(post);
  save(new Post(post));
  let url = {
    url: post.title.toLowerCase().replace(/[\s]/g,"-")
  };
  //urls.push(url);
  save(new URL(url));
  res.redirect("/");
});









let port = process.env.PORT;
if(port==null || port=="")
{
  post = 3000;
}


app.listen(port, function() {
  console.log("Server started on port 3000");
});
