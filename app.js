var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    flash           = require('connect-flash'),
    Topic           = require('./models/topic'),
    User            = require('./models/user'),
    passport        = require('passport'),
    LocalStratgegy  = require('passport-local'),
    methodOverride  = require('method-override'),
    middleware      = require('./middleware'),
    seedDB          = require('./seeds');


    var topicRoutes = require('./routes/topics'),
        authRoutes  = require('./routes/index')

mongoose.connect(process.env.DBURL,{useMongoClient: true});

mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret:'Something secrative',
    resave:false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratgegy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
   res.locals.currentUser = req.user; 
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


app.use('/',authRoutes);
app.use(topicRoutes);

app.listen(process.env.PORT,process.env.IP, function(){
    console.log("The polls are open!!");
});
