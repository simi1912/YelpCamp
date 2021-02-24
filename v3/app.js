var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    // User        = require("./models/user"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/campgrounds", function(req, res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
})


app.post("/campgrounds", function(req, res){
     var newCampground = {
         name: req.body.name,
         image: req.body.image,
         description: req.body.description
     }
     Campground.create(newCampground, function(err, newlyCreated){
         if(err){
             console.log(err);
         }else{
            res.redirect("/campgrounds"); 
         }
     });
});


app.get("/campgrounds/new", function(req, res) {
   res.render("new.ejs") ;
});

 
// SHOW
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("show", {campground: foundCampground});
        }
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});