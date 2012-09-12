var TYPES = {
	ALPHA:0,
	NUMERIC:1,
	SPECIAL:2,
	ALPHANUMERIC:3,
	ALPHA_SPECIAL:4,
	NUMERIC_SPECIAL:5,
	ALPHA_NUMERIC_SPECIAL:6,
	BINARY: 7,

	FIXED: 8,
	VARIABLE: 9,
}

exports.model = function( app ){
	var mongoose = require('mongoose');
	var db = mongoose.createConnection('mongodb://localhost/isoEngine');
	
	var ObjectId = mongoose.Types.ObjectId;
		
	app.DB = {};
	app.DB.ObjectId = ObjectId;
	
	db.on('error', function(){
		console.error('Error establishing connection to mongodb');
		throw new Error('MongoDb connection error');
		process.exit(-1);
	});

	db.once('open', function () {
	 	console.info('Connection to mongodb established');

	 	var institutionSchema = new mongoose.Schema({
		    name    : String,
		    address :String,
		    email 	:String,
		    telephone:String,

		    host 	:String,
		    port 	:String,
		    header 	:String,

		    /*field 	:{
		    	id: String,
		    	name :String,
		    	value:String,
		    	size :Number,
		    	type :Number,
		    },*/
		    
		    /*service  :{
		    	name: String,
		    	fields: []
		    }*/
		    services :[],
		});
	 	
		app.DB.Institution = db.model('Institution', institutionSchema);
	});

}