var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
    {
        name: "Cloud's Rest",
        image: "https://cdn.pixabay.com/photo/2017/07/17/16/21/nature-2512944_960_720.jpg",
        description: "Vivamus a sodales ex. Nullam aliquet cursus nibh ultrices facilisis. Vivamus tortor ligula, bibendum eget facilisis at, semper vel tellus. Aliquam vehicula ipsum nec nisl convallis bibendum. Nulla facilisi. Duis porta vehicula arcu vitae imperdiet. Suspendisse sodales convallis est, ac lobortis mi hendrerit sit amet. Quisque dignissim purus magna, sed dictum ante pulvinar quis. Aliquam varius mollis mauris vitae suscipit. Donec semper lectus sed consectetur vulputate. Praesent nibh elit, viverra non tristique vitae, consequat vel sem. Duis ut aliquet nunc, at consectetur justo. Morbi et commodo ipsum, eget porttitor ligula. Pellentesque molestie id lacus non gravida."
    },
    {
        name: "Desert Mesa",
        image: "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137_960_720.jpg",
        description: "Vivamus a sodales ex. Nullam aliquet cursus nibh ultrices facilisis. Vivamus tortor ligula, bibendum eget facilisis at, semper vel tellus. Aliquam vehicula ipsum nec nisl convallis bibendum. Nulla facilisi. Duis porta vehicula arcu vitae imperdiet. Suspendisse sodales convallis est, ac lobortis mi hendrerit sit amet. Quisque dignissim purus magna, sed dictum ante pulvinar quis. Aliquam varius mollis mauris vitae suscipit. Donec semper lectus sed consectetur vulputate. Praesent nibh elit, viverra non tristique vitae, consequat vel sem. Duis ut aliquet nunc, at consectetur justo. Morbi et commodo ipsum, eget porttitor ligula. Pellentesque molestie id lacus non gravida."
    },
    {
        name: "Canyon Floor",
        image: "https://cdn.pixabay.com/photo/2020/04/21/15/08/hiking-5073410_960_720.jpg",
        description: "Vivamus a sodales ex. Nullam aliquet cursus nibh ultrices facilisis. Vivamus tortor ligula, bibendum eget facilisis at, semper vel tellus. Aliquam vehicula ipsum nec nisl convallis bibendum. Nulla facilisi. Duis porta vehicula arcu vitae imperdiet. Suspendisse sodales convallis est, ac lobortis mi hendrerit sit amet. Quisque dignissim purus magna, sed dictum ante pulvinar quis. Aliquam varius mollis mauris vitae suscipit. Donec semper lectus sed consectetur vulputate. Praesent nibh elit, viverra non tristique vitae, consequat vel sem. Duis ut aliquet nunc, at consectetur justo. Morbi et commodo ipsum, eget porttitor ligula. Pellentesque molestie id lacus non gravida."
    }
]

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed campgrounds!");
        
        //  //Add a few of campgroundt
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //       if(err){
        //           console.log(err);
        //       } else{
        //           console.log("added a campground");
                   
        //           //create a comment
        //           Comment.create(
        //               {
        //                     text: "This place is great",
        //                     author: "Homer"
        //               }, function(err, comment){
        //                   if(err){
        //                       console.log(err);
        //                   } else{
        //                       campground.comments.push(comment);
        //                       campground.save();
        //                       console.log("Created new comment");
        //                   }
        //               });
        //       }
        //     });
        // });
    });
   
    
}

module.exports = seedDB;

