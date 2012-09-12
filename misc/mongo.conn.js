var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;



exports.MONGO = function( app) {
	var server = new Server('localhost', 27017, {auto_reconnect: true, poolSize: 5});
	var db = new Db('isoEngine', server);

	db.open(function(err, db) {
	  if(err) {
	    console.error("We are not connected to mongo server");
	    console.dir(err);
	    process.exit(-1);
	  }
	  console.info('Connection to mongo server established');
	  console.dir(db);

	  //if the connection is good, then create a new collection ensuring the collection
	  //to be created does not already exist
	  db.createCollection('InstitutionConfig', {safe:true}, function(err, collection) {});
	  
	  //put the db reference on the app variable
	  app.db = db;
	});

}