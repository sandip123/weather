const express = require("express");
const path = require("path");
const hbs = require("hbs");
const forecast =require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "sandip",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "sandip",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "sandip",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error:"Address is required"
    })
  }
  forecast(req.query.address,(error,body)=>{
    console.log(error);
    console.log(body)
    return res.send({
      Location:req.query.address,
      message:error? error:body
    })
  })

  
});


app.get("/products", (req, res) => {
  console.log(req.query)
  if(!req.query.search){
   return res.send({
        error: "You must provide a search"
      })
  }
  res.send(
    {
      products:[]
    }
  );
});

app.get("/help/*", (req, res) => {
    res.render('pageNotFound', {
        ErrorMessage:'Help article not found',
        title:'404',
        name:'sandip'
    });
  });

app.get("*", (req, res) => {
    res.render('pageNotFound', {
        ErrorMessage:'Page not found',
        title:'404',
        name:'sandip'
    });
  });
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
