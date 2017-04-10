'use strict'; 

const express = require("express"); 
const router = express.Router(); 

//GET /materials
//Route for materials collection 
router.get("/", (req, res) => {
	res.json({response: "You sent me a GET request"}); 
});

//POST /materials
//Route for creating the materials 
router.post("/", (req, res) => {
	res.json({
		response: "You sent me a POST request",
		body: req.body
	}); 
});

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
//should we need a id route for materials is they are all on the same page??? 



module.exports = router; 




