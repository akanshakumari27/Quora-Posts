const express = require("express")
const app = express()
const port = 8080
const { v4: uuidv4 } = require('uuid');

app.listen(port,()=>{
    console.log(`${port} is Running`)
})

const path = require("path") //requiring path to set paths for views(ejs) and public

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views")) //For Views folder(ejs files)

app.use(express.static(path.join(__dirname,"public"))) //For Public folder(more needed files)
app.use(express.urlencoded({extended: true})) //For express to understand URL Encoded Data(app.use = middleware)

let posts =[
    {      
        id:uuidv4(), 
        username: "Akansha_Kumari",
        content: "Hey there! I'm here to talk about Ginger Garlic Paste"
    },
    {
        id: uuidv4(),
        username: "Ashish_Mahanata",
        content: "Hey there! I'm here to talk about perodic Table"
    },
    {
        id: uuidv4(),
        username:"Anjala_Kumari",
        content: "Hey there! I'm looking for that instagram page"
    },
    {
        id: uuidv4(),
        username: "Amit_Ananad",
        content: "Hey there! what's up, let's chill?"
    },
]

app.get("/posts",(req,res)=>{  //for Restful-API we added "posts" because we gonna perform all CRUD operations on Posts
    res.render('index.ejs',{posts})
})

app.get("/posts/new",(req,res)=>{
    res.render('new.ejs')
})

app.post("/posts",(req,res)=>{  //After getting "add Request" from "new.ejs" as it sended in "Post Method"
    let {username,content} = req.body  //extracting data from "req.body" by Destructuring
    let id = uuidv4();
    posts.push({id, username,content})  //pushing Object
    console.log(req.body);
    res.redirect('/posts')
})
// UUID - Universally Unique Identifier

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params.id
    let post = posts.find((p)=> id === p.id) //when Single thing to pass, Don't use Curly braces inside Arrow Function else Throw Error
    console.log(post)
    res.render('id.ejs',{post})
})

// POST- Create, GET- Read, PUT- Update, DELETE- Delete (CRUD Operations)
// PATCH: Submits a partial modification to a resource. If you only need to update one field for the resource.

app.patch("/posts/:id",(req,res)=>{
    let id  = req.params.id;
    let  newContent = req.body.content;
    let post = posts.find((p) => id === p.id)
    post.content = newContent
    console.log(post)
    res.send("Patch request has been sended")
})
// a) req.body
// Generally used in POST/PUT requests.
// Use it when you want to send sensitive data(eg. form data) or super long JSON data to the server.

// b) req.params
// These are properties attached to the url i.e named route parameters. 

// c) req.query
// req.query is mostly used for searching,sorting, filtering, pagination, e.t.c

app.get("/posts/:id/edit",(req,res)=>{
    let id = req.params.id;  //OR "let {id} = req.params" this is Destructring, means directly extracting id's parameters from parameters
    let post = posts.find((p)=> id === p.id)
    res.render('edit.ejs', {post})
}) 
 