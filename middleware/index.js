var Campground = require("../models/campground.js"),
	Comment    = require("../models/comment.js");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Cannot find Campground");
				res.redirect("back");
			} else{
				if(foundCampground.author.id.equals(req.user.id)){
					return next();
				} else{
					req.flash("error", "You do not have permission to do that!");
					res.redirect("back");
				}
			}
		})
	} else{
		req.flash("error", "You have to Login or SignUp to do that!");
		res.redirect("/login");
	}
	}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err){
				req.flash("error", "Cannot find comment");
				res.redirect("back");
			} else{
				if(foundComment.author.id.equals(req.user.id)){
					return next();
				} else{
					req.flash("error", "You do not have permission to do that!");
					res.redirect("back");
				}
			}
		})
	} else{
		req.flash("error", "You have to Login or SignUp to do that!");
		res.redirect("/login");
	}
	}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You have to Login or SignUp to do that!")
	res.redirect("/login");
	}

module.exports = middlewareObj;