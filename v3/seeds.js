var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
    {
        name: "Cloud's Rest",
        image: "https://pixabay.com/get/g89c0c8dff4e2d26c0046c571b318327bc43d60260c06fd39e7581117f86f9800d13d4b71a04f5b2bd8b972b9cc04aa94_340.jpg",
        description: "Nice campground."
    },
    {
        name: "Desert Mesa",
        image: "https://pixabay.com/get/g060ede86cc05c10034675a35a39b0e8c6151ae00cc38499c0c4132be27580a4c0ba6165159d69769f7e892d29cd02c9b_340.jpg",
        description: "Another nice campground."
    },
    {
        name: "Canyon Floor",
        image: "https://pixabay.com/get/g813b40ecd3505c7371ccf9644f8e601a51f385f5d2febbfe1aff04c45535eeafd2769c5df443e380f1f2fd526b93b01f_340.jpg",
        description: "Beautiful camp."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        
         //Add a few of campgroundt
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else{
                   console.log("added a campground");
                   
                   //create a comment
                   Comment.create(
                       {
                            text: "This place is great",
                            author: "Homer"
                       }, function(err, comment){
                           if(err){
                               console.log(err);
                           } else{
                               campground.comments.push(comment);
                               campground.save();
                               console.log("Created new comment");
                           }
                       });
               }
            });
        });
    });
   
    
}

module.exports = seedDB;

