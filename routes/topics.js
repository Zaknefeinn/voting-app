var express     = require('express'),
    router      = express.Router({mergeParams:true}),
    middleware  = require('../middleware'),
    Topic       = require('../models/topic'),
    User        = require('../models/user');

//SHOW ALL TOPIC
router.get('/topic', function(req,res){
    Topic.find({}, function(err, allTopics){
        if(err){
            console.log(err);
        } else {
            res.render('topics/index', {topics: allTopics});
        }
    });
});
//CREATE TOPIC
router.post('/topic', middleware.isLoggedIn, function(req,res){
   var name = req.body.poll;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var option1 = req.body.option_1;
   var option2 = req.body.option_2;
   var newTopic = {name: name, options:[{option:option1,votes:0}, {option:option2,votes:0}], author: author};
    Topic.create(newTopic,function(err,newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect('/topic');
        }
    });

});

//SHOW NEW TOPIC FORM
router.get('/new', function(req,res){
    res.render('topics/new');
});

//SHOW SPECIFIC POLL
router.get('/topic/:id', function(req,res){
    Topic.findById(req.params.id, function(err,foundTopic){
       if(err){
           console.log(err);
       } else {
           res.render('./topics/show',{topics:foundTopic});
       }
    });
});

// UPDATE OPTIONS
router.put('/topic/:id', middleware.isLoggedIn, function(req,res){
    Topic.findByIdAndUpdate({'_id':req.params.id}, {$push:{options:req.body.topic}}, function(err, updatedOptions){
        if(err){
            console.log(err);
        } else {
            res.redirect('/topic/' + req.params.id);
        }
    });
});

//DESTROY TOPIC
router.delete('/topic/:id', middleware.checkOwnership, function(req,res){
   Topic.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
       } else{
           res.redirect('/topic');
       }
   });
});

// UPDATE VOTES
router.put('/topic/:id/vote', middleware.alreadyVoted, function(req,res){
    Topic.update({'_id':req.params.id, "options.option":req.body.topic}, {$inc : {"options.$.votes":1}}, function(err,updatedVotes){
        if(err){
            console.log(err);
        } else{
            res.redirect('/topic/' + req.params.id);
        }
    });
    User.update({'_id':req.user._id}, {$push : {votes : req.params.id}}, function(err,updatedUser){
        if(err){
            console.log(err)
        } else {
            console.log(req.user.username + ' voted for ' + req.body.topic)
        }
    })
});

module.exports = router;