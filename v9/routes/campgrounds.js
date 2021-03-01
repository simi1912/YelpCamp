var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

// INDEX
router.get("/", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", 
            {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });
});

// HANDLE NEW
router.post("/", isLoggedIn, function(req, res){
     var newCampground = {
         name: req.body.name,
         image: req.body.image,
         description: req.body.description,
         author: {
             id: req.user._id,
             username: req.user.username
         }
     };
     
     Campground.create(newCampground, function(err, newlyCreated){
         if(err){
             console.log(err);
         }else{
             console.log(newlyCreated);
            res.redirect("/campgrounds"); 
         }
     });
});

// NEW
router.get("/new", isLoggedIn, function(req, res) {
   res.render("campgrounds/new.ejs") ;
});

 
// SHOW
router.get("/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;