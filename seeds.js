var mongoose    = require("mongoose"),
    Topic       = require('./models/topic');
    
// var data = [
//     {
//         name: "Bacon or Sausage?",
//         option1:"Bacon",
//         option2:"Sausage"
//     },
//     {
//         name:"Boy or Girl?",
//         option1:'Boy',
//         option2:'Girl'
//     },
//     {
//         name:"Red or Blue?",
//         option1:'Red',
//         option2:'Blue'
//     }
//     ];
var data = [
    {
        name: "Bacon or Sausage?",
        options:[{option:"Bacon",votes: 3}, {option:"Sausage", votes:0}]
    },
    {
        name:"Boy or Girl?",
        options:[{option:"Boy",votes: 6}, {option:"Girl", votes:8}]
    },
    {
        name:"Red or Blue?",
        options:[{option:"Red",votes: 4}, {option:"Blue", votes:1}]
    }
    ];
    
function seedDB(){
    Topic.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed Topic!");
            data.forEach(function(seed){
               Topic.create(seed, function(err, topic){
                   if(err){
                       console.log(err);
                   } else {
                       console.log("added topic");
                       topic.save();
                   }
               });
            });
        }
    });
    
}

module.exports = seedDB;