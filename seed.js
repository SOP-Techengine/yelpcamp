var mongoose   = require("mongoose"),
    Campground = require("./models/campground.js"),
	Comment    = require("./models/comment.js");


var data = [
	{
		name: "Adesope Stephen",
		image: "https://cdn.pixabay.com/photo/2017/06/20/22/14/men-2425121__340.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Oluwabusayomi Esther",
		image: "https://cdn.pixabay.com/photo/2019/08/19/07/45/pets-4415649__340.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name: "Mosope David",
		image: "https://cdn.pixabay.com/photo/2016/02/19/15/46/dog-1210559__340.jpg",
		description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
]
function seedDB(){
	Campground.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("Campgrounds removed");
		Comment.remove({}, function(err){
			if(err){
				console.log(err);
				}
					console.log("comments removed");
					data.forEach(function(seed){
						Campground.create(seed, function(err, camp){
							if(err){
								console.log(err);
							} else{
								console.log("Campground created")
								Comment.create({
									text: "This is the first comment ever",
									author: "Adesope naani"
								}, function(err, comment){
									if(err){
										console.log(err);
									} else{
										camp.comments.push(comment);
										camp.save(function(err, campground){
											if(err){
												console.log(err);
											} else{
												console.log("comment created");
											}
										})
									}
								})
							}
						})
					})
				})
	})
}

module.exports = seedDB;