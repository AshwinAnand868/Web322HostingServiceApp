var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");

var HTTP_PORT =  process.env.PORT || 80;


app.use(bodyParser.urlencoded({ extended: false }));

app.engine(".hbs", handlebars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(express.static('views'));

app.get("/", (req,res) => {
    //res.sendFile(path.join(__dirname+"/views/html/home.hbs"));
    res.render("home",
    { msg: "Haytham Qushtom", layout: false });
});

app.get("/hosting-plans",function (req, res){
    res.render("cwh", {layout: false });
});

app.get("/login", (req, res) => {
   res.render("login", {layout: false });
});

app.get("/becoming_member", (req, res) => {
    res.render("registration", {layout: false });
});


app.use(function(req,res){
    res.status(404).render("pagenotfound", {layout: false });
});


app.listen(HTTP_PORT);