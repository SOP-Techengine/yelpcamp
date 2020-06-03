var express        = require("express"),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
	methodOverride = require("method-override"),
	User           = require("./models/user.js"),
	flash          = require("connect-flash"),
	Campground     = require("./models/campground.js"),
	Comment        = require("./models/comment.js"),
	passport       = require("passport"),
	localStrategy  = require("passport-local"),
	app            = express(),
	seedDB         = require("./seed.js");

// REQUIRING ROUTES
var campgroundRoutes = require("./routes/campgrounds.js"),
	commentRoutes   = require("./routes/comments.js"),
	indexRoutes      = require("./routes/index.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb+srv://techengine:1990june30@techengine-kt6bq.mongodb.net/test?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

app.use(flash());
//Passport Configuration
app.use(require("express-session")({
	secret: "This is the fisrt major app I've made",
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seedDB();


app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(3000, function(req, res){
	console.log("Yelp Camp server running")
})