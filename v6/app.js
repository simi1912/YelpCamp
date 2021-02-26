var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Ana",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
    res.render("landing");
});

//INDEX
app.get("/campgrounds", function(req, res){

    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
})

// CREATE
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

// NEW
app.get("/campgrounds/new", function(req, res) {
   res.render("campgrounds/new.ejs") ;
});

 
// SHOW
app.get("/campgrounds/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//  Comments
//++++++++++++

// NEW
app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
           if(err){
               console.log(err)
           } else{
               res.render("comments/new", {campground: campground});
           }
    });
});

// CREATE
app.post("/campgrounds/:id/comments", function(req, res){
    var id = req.params.id;
    Campground.findById(id, function(err, campground) {
        if(err){
            console.log(err)
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
               if(err){
                   console.log(err);
               } else {
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + id);
               }
            });
        }
    })
})


//============
// AUTH ROUTES

//show register
app.get("/register", function(req, res) {
    res.render("register");
})

//handel register logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           res.redirect("/campgrounds");
        });
    });
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server started...");
});