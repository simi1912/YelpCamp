var express = require("express");
var router = express.Router();

var Campground = require("../models/campground");

var middleware = require("../middleware");

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
router.post("/", middleware.isLoggedIn, function(req, res){
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
router.get("/new", middleware.isLoggedIn, function(req, res) {
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

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;