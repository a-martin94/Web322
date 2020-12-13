var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


var userSchema = new Schema({
	firstName:String,
	lastName:String,
	email: {
		type:String,
		unique:true
	},

	userType: {
		type:String,
		default:"User"
	},
	
	password:String
	//confirmPassword:String
	});

	userSchema.pre("save",function(next) {
		bcrypt.genSalt(10)
		.then(crypt => {
			bcrypt.hash(this.password,crypt)
			.then(encrypt => {
				this.password = encrypt;
				next();
			})
			.catch(error=>console.log(`Error: ${error}`));
		})
		.catch(error=>console.log(`Error: ${error}`));
	});
	
	const userModel = mongoose.model("Users",userSchema);
	
	module.exports = userModel;





	
	