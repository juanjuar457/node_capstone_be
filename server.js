'use strict'; 

const express = require('express');
const app = express();
const routes = require("./routes"); 
const jsonParser = require("body-parser").json; 
const logger = require("morgan"); 

//cotains many parsers to manage http requests, under body-parser
app.use(logger("dev")); //configures middlware for color codes in our api respones. 
app.use(jsonParser());
app.use("/materials", routes); 

app.use((req,res,next) => {
	if(req.body){
		console.log("the sky is", req.body.color);
	} else {
		console.log("there is no body property on the request"); 
	}
}); 

//using middleware in epxress Making a REST api.. stupid gomix
app.use((req,res,next) => {
	console.log("first Piece of middleware"); 
	next();
});

//QQQ: will our app even need id??? 
app.use("/different/:id", (req,res,next) => {
	console.log("Second Piece of middleware, ID:", req.params.id); 
	next();
});



app.use((req, res, next) => {
	console.log("test test");
	next(); 
});


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});


// >>>>>>>>NOTE!!! <<<<<<<<<<<<<<<<<<
//Express must parse incoming JSON with middleware!! it can't do it on its own! 



//adding route as 2nd param. 


//>>>>>>>>>>Accepting Data example <<<<<<<<<<
// let jsonCheck = ((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("there is no body property on the request"); 
// 	}
// 	next(); 
// }); 

// app.use(jsonCheck);


// app.use(function(req,res, next){
// 	if(req.body){
// 		console.log("The sky is", req.body.color );
// 	} else {
// 		console.log("There is no body property on the request"); 
// 	}	 
// 	next(); 
// });

// app.use((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("therre is no body property on the request"); 
// 	}
// });


// app.use((req, res, next) => {
// 	console.log("poopie"); 
// });