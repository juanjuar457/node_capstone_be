'use strict';

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/sandbox");
const Schema = mongoose.Schema; 


const MaterialSchema = new Schema({
	vendor: String, 
	quantity: String, //sometimes they have '3UI' for units 
	product_name: String, 
	catalog_number: String, 
	unit_size: String, 
	units: String,
	createDate: {type: Date, default: Date.now} //
})

//not sure how to structre this? ALso don't we need an env file??? 

const UserSchema = new Schema({
	name: String,
	organization: String
})

//may not need these login schemas check later
const AdminLoginSchema = new Schema({
	user: String, //maybe a boolean??
	password: String
})

const GuestLoginSchema = new Schema({ 
	organization: String,
	passcode: Number
})


//how many shcema models??? also need passwords?? 

const Material = mongoose.model("materials", MaterialSchema);

const User = mongoose.model("users", UserSchema);

module.exports.models = {Material,User};  //Es6 short hand prop short hand. 
