var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
        {
            name: "Salmon Creel",
            image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"
        },
        {
            name: "Granite Hill",
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg"
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236_960_720.jpg"
        },
        {
            name: "Salmon Creel",
            image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"
        },
        {
            name: "Granite Hill",
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg"
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236_960_720.jpg"
        },
        {
            name: "Salmon Creel",
            image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_960_720.jpg"
        },
        {
            name: "Granite Hill",
            image: "https://cdn.pixabay.com/photo/2015/03/26/10/29/camping-691424_960_720.jpg"
        },
        {
            name: "Mountain Goat's Rest",
            image: "https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236_960_720.jpg"
        }
    ];

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){

    res.render("campgrounds", {campgrounds: campgrounds});
})


app.post("/campgrounds", function(req, res){
     var name = req.body.name;
     var image = req.body.image;
     var newCampground = {
         name: name,
         image: image
     }
     campgrounds.push(newCampground)
     res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs") ;
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});