var mongoose = require('mongoose');

var topicSchema = new mongoose.Schema({
    name: String,
       author: {
      id: {
         type:mongoose.Schema.Types.ObjectId,
         ref:"User"
      },
      username: String,
   },
    // option:[
    //     {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Option'
    //     }
    //     ]
    options: [{
      option:  String,
      votes: Number
    }]
    // option1: String,
    // option2: String
});

module.exports = mongoose.model('Topic', topicSchema);