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
		.then(salt => {
			bcrypt.hash(this.password,salt)
			.then(hash => {
				this.password = hash;
				next();
			})
			.catch(err=>console.log(`Error: ${err}`));
		})
		.catch(err=>console.log(`Error: ${err}`));
	});
	
	const userModel = mongoose.model("Users",userSchema);
	
	module.exports = userModel;





	
	