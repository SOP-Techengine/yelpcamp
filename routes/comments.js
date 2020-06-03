var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campground.js");
var Comment    = require("../models/comment.js");
var middlewareObj  = require("../middleware");

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			res.render("./comments/new", {campground: campground});
		}
	})
})

router.post("/", middlewareObj.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else{
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save(function(err){
						if(err){
							req.flash("error", "Something went wrong");
							console.log(err);
						} else{
							req.flash("success", "Comment successfully created");
							res.redirect("/campgrounds/" + campground._id);
						}
					})
				}
			})
		}
	})
})

router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			Comment.findById(req.params.comment_id, function(err, foundComment){
				if(err){
					console.log(err);
				} else{
					res.render("./comments/edit", {campground: foundCampground, comment: foundComment});
				}
			})
		}
	})
})

router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, newComment){
		if(err){
			console.log(err);
		} else{
			req.flash("success", "Comment successfully updated");
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
})

router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			console.log(err)
		} else{
			req.flash("success", "Comment successfully deleted");
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})


module.exports = router;
