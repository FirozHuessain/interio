const express=require("express")
const app=express()
const hbs=require("hbs")
const path=require("path")
const bodyParser=require("body-parser")
const nodeMailer=require("nodemailer")

const transporter=nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    requireTLS:true,
    auth:{
        user:"fzkhan9536@gmail.com",
        pass:"bzxejamhnvrxbzuz"
    }
})
  
app.set("view engine","hbs")
hbs.registerPartials(path.join(__dirname + '/views/partials'))
app.use(express.static(path.join(__dirname,"/views/public")))

const urlEncoder=bodyParser.urlencoded()

app.get("/",(req,res)=>{
    return res.render("index")
})
app.get("/about",(req,res)=>{
    return res.render("about")
})
app.get("/faq",(req,res)=>{
    return res.render("faq")
})
app.get("/service",(req,res)=>{
    return res.render("service")
})
app.get("/gallery",(req,res)=>{
    return res.render("gallery")
})
app.get("/contact",(req,res)=>{
    return res.render("contact",{show:false})
})
app.post("/contact",urlEncoder,(req,res)=>{
let mailOption={
   from:"fzkhan9536@gmail.com",
   to:req.body.email,
   subject:"Your Query Received!!! : Team Interio",
   text:"Thanks to Share Your Query With Us !!!\n Our Team Will Contact You Soon!!!"
}
transporter.sendMail(mailOption,(error,data)=>{
    if(error){
        console.log(error);
    }
})
mailOption={
    from:"fzkhan9536@gmail.com",
    to:"fzkhan9536@gmail.com",
    subject:"Query Received!!! : Team Interio",
    text:`
        Name   : ${req.body.name}
        Email  : ${req.body.email}
        Phone  : ${req.body.phone}
        Subject : ${req.body.subject}
        Message  : ${req.body.message}                    `
}
transporter.sendMail(mailOption,(error,data)=>{
if(error)
console.log(error);
})
    return res.render("contact",{show:true})
})


app.listen(80,()=>console.log("Server is Running on Port No 80"))