'use strict'; 

const express = require("express"); 
const router = express.Router(); 
// const jsonParser = require("body-parser").json;
// router.use(jsonParser());
const models = require("./models");
//EX GET 
//GET /materials
//Route for materials collection 
// router.get("/", (req, res) => {
// 	res.json({response: "You sent me a GET request"}); 
// });

// Get requests to /materials get the materials on the server, max 100 
router.get('/', (req, res) => {
	Material
	.find()
	.limit(100)
	.exec()
	.then(materials => {
		res.json({
			materials: materials.map(
				(material) => material.apiRepr())
		}); 
	})
	.catch(
		err => {
			console.error(err); 
			res.status(500).json({message: 'Internal Server error'}); 
		});
}); 


//POST /materials
//Route for creating new materials 
// router.post("/adminlogin", (req, res) => {
// 	let username = req.body.username;
// 	let password = req.body.password;
// 	models.User.findOne({
// 		user: username, password
// 	}) //doc looks for user, username and password that was passed in. 
// 	res.json({. //use the apirpr function needed on models + check the .then in the mongoose section.
// 		response: "You sent me a POST request",
// 		body: req.body
// 	}); 
// });

// router.post("/guestlogin", (req, res) => {
// 	let organization = req.body.organization;
// 	let passcode = req.body.passcode;
// 	models.User.findOne({
// 		user: username, password
// 	}) //doc looks for user, username and password that was passed in. 
// 	res.json({. //use the apirpr function needed on models + check the .then in the mongoose section.
// 		response: "You sent me a POST request",
// 		body: req.body
// 	}); 
// });


//PUT /materials/:mID/ordered
//Add color to indicate ordered material, indicate already ordered..
router.put("/:mID/ordered", (req, res) => {
	res.json({
		response: "You sent me a PUT request to /ordered",
		orderedId: req.params.mID,
		body: req.body
	})
})

//DELETE  /materials/:mID/ordered
//Add color to indicate ordered material, indicate already ordered..
router.delete("/:mID/ordered", (req, res) => {
	res.json({
		response: "You sent me a DELETE request to /ordered",
		orderedId: req.params.mID,
	})
})


//need a Delete too! //will be similar to PUT just delete the body: req.body



//not sure how to get ALL the materials we need...
// //GET /materials
// router.get("/5/materials") ????
//should we need a id route for materials for post and put
//if they are all on the same page??? 



module.exports = router; 




