'use strict'; 
// const bodyParser = require('body-parser');
const express = require('express');
const app = express();
// const routes = require("./routes");  //junkroutes at the moment.. 4/13 
const logger = require("morgan"); 
const mongoose = require("mongoose"); 
const jsonParser = require("body-parser").json();
const {PORT, DATABASE_URL} = require('./config');
const models = require('./models'); 
const Material = models.Material;
const User = models.User; 
app.use(jsonParser);
// app.use(bodyParser.json());
mongoose.Promise = global.Promise;

app.get('/materials', (req, res) => {
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


//get request for materials by id 
app.get('/materials/:id', (req, res) => {
  Material
    // this is a convenience method Mongoose provides for searching
    // by the object _id property
    .findById(req.params.id)
    .exec()
    .then(material =>res.json(material.apiRepr()))
    .catch(err => {
      console.error(err);
        res.status(500).json({message: 'Internal server error'})
    });
});

// POST req for ne material IT WORKS, requires the 6 fields to post  
app.post('/materials', (req, res) => {
	const requiredFields = ['vendor', 'quantity', 'product_name', 'catalog_number', 'unit_size', 'units'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \ ${field}\` in request body`
			console.error(message); 
			return res.status(400).send(message); 
		}
	}

	Material
		.create({
			vendor: req.body.vendor,
			quantity: req.body.quantity,
			product_name: req.body.product_name,
			catalog_number: req.body.catalog_number,
			unit_size: req.body.unit_size,
			units: req.body.units})
		.then(
			material => res.status(201).json(material.apiRepr()))
		.catch(err => {
			console.error(err);
			res.status(500).json({message: 'Internal server error'}); 
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
router.delete("/materials/:id", (req, res) => {
	Material
		.findByIAndRemove(req.params.id)
		.exec()
		.then(material => res.status(204).end())
		.catch(err => res.status(500).jason({message: 'Internal Server error'})); 
}); 


//>>>>>start of run / close server....
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
// app.listen(process.env.PORT || 8080, () => {
//   console.log(`Order for later is listening on port: ${process.env.PORT || 8080}`);
// })



// >>>>>>>>NOTE!!! <<<<<<<<<<<<<<<<<<
//Express must parse incoming JSON with middleware!! it can't do it on its own! 

//also will need the users model...

// app.use(logger("dev")); //configures middlware for color codes in our api respones. 


//error occurs, express finds 1st error handling middleware
//catch 404 and forward to error handler. 


//error handler -- they have 4 params!!!  
// app.use((err,req,res,next) => {
// 	res.status(err.status || 500)
// 	res.json({
// 		error: {
// 			message: err.message
// 		}
// 	});
// })

// app.use((req,res,next) => {
// 	if(req.body){
// 		console.log("the sky is", req.body.color);
// 	} else {
// 		console.log("there is no body property on the request"); 
// 	}
// }); 

//using middleware in epxress Making a REST api.. stupid gomix
// app.use((req,res,next) => {
// 	console.log("first Piece of middleware"); 
// 	next();
// });

//QQQ: will our app even need id??? 
// app.use("/different/:id", (req,res,next) => {
// 	console.log("Second Piece of middleware, ID:", req.params.id); 
// 	next();
// });



//adding route as 2nd param. 

//>>>>>filler get request to test
// app.get("/materials", (req, res) => {
// 	res.json({response: "You sent me a GET request"}); 
// });

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
