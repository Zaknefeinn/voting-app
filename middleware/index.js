var middlewareObj   = {};
var Topic           = require('../models/topic'),
    User            = require('../models/user');


middlewareObj.checkOwnership = function(req,res,next){
    if(req.isAuthenticated()){
      Topic.findById(req.params.id, function(err, foundTopic){
          if(err){
              res.redirect('back');
          } else {
                if(foundTopic.author.id.equals(req.user._id)){
                    next();
            }   else{
                    res.redirect('back');
            }
          }
      });
    } else{
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
      return next();
  }
    res.redirect('/login');
};

middlewareObj.alreadyVoted = function(req,res,next){
  if(req.isAuthenticated()){
  User.findById(req.user._id, function(err,foundUser){
    if(err){
      console.log(err);
    } else {
       if(foundUser.votes.includes(req.params.id)){
        req.flash('error', 'You have already voted');
         res.redirect('back');
       }
       else{
         next();
       }
    }
  });
} else {
  res.redirect('/login');
}
};
module.exports = middlewareObj;