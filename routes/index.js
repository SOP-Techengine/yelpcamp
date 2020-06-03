var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user.js")

router.get("/", function(req, res){
	res.render("home");
})

//Register Route
router.get("/register", function(req, res){
	res.render("register");
})

router.post("/register", function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("register", {"error": err.message});
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully signed up as " + user.username)
			res.redirect("/campgrounds");
		})
	})
})


// LOGIN ROUTES
router.get("/login", function(req, res){
	res.render("login");
})

router.post("/login", passport.authenticate("local", {
	successRedirect: "/campgrounds",
	failureRedirect: "/login",
	failureFlash: true,
	successFlash: true
}), function(req, res){
})

router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "You Log Out")
	res.redirect("/")
})

module.exports = router;