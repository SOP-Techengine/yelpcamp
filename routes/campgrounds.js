var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground.js");
var middlewareObj  = require("../middleware");


router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){
			console.log(err);
		} else{
			res.render("./campgrounds/index", {allCampgrounds: allCampgrounds});
		}
	})
})

router.post("/", middlewareObj.isLoggedIn, function(req, res){
	var newCampground = req.body.newCampground
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			req.flash("error", "Something went wrong!");
			console.log(err);
		} else{
			newlyCreated.author.id = req.user._id;
			newlyCreated.author.username = req.user.username;
			newlyCreated.save();
			req.flash("success", "Campground successfully created");
			res.redirect("/campgrounds");
		}
	});
});

router.get("/new", middlewareObj.isLoggedIn, function(req, res){
	res.render("./campgrounds/new");
})

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			req.flash("error", "Cannot find Campground");
			console.log(err);
		} else{
			res.render("./campgrounds/show", {campground: foundCampground});
		}
	})
})

router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/edit", {foundCampground: foundCampground});
		}
	})
})

router.put("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.newCampground, function(err, updatedCampground){
		if(err){
			console.log(err);
		} else{
			req.flash("success", "Campground successfully updated");
			res.redirect("/campgrounds/" + updatedCampground._id);
		}
	})
})

router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err);
		} else{
			req.flash("success", "Campground successfully deleted");
			res.redirect("/campgrounds");
		}
	})
})

module.exports = router;