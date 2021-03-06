var express     = require('express'),
    router      = express.Router({mergeParams:true}),
    passport    = require('passport'),
    User        = require('../models/user'); 

router.get('/', function(req,res){
    res.render('index');
});

//REGISTER
router.get('/register',function(req,res){
    res.render('register');
});

//handle sign up logic
router.post('/register',function(req,res){
    var newUser = new User({username: req.body.username});
    User.register(newUser,req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash('success', "Welcome " + user.username);
            res.redirect('/topic');
        });
    });
});
//show login form
router.get('/login',function(req,res){
   res.render('login'); 
});

//handling login logic
router.post('/login', passport.authenticate('local',
{
    successRedirect:'/topic',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password'
}), function(req,res){
    req.flash('success', 'Welcome!');
    
});


//logout route
router.get('/logout',function(req,res){
    req.logout();
    req.flash('success', "Logged you out!");
    res.redirect('/topic');
});

module.exports = router;