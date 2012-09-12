/* All in coming uix calls are processed here*/

exports.uix = function( app ){
	//index config page
	app.get('/config', function configHandler(req, res){
		try{
		    res.render('index.ejs',{
	        	title: 'IsoEngine'
	        });
		}catch(error){
			console.error('Configuration error ooccured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	//create institution
	app.get('/config.create/:id?', function configHandler(req, res){
		try{
			//process uix settings here//
			if( req.params.id ){ //if id exist then edit mode
				//grab items from  db for display//
				app.DB.Institution.findById( req.params.id ,function(err, doc) {
			        if( err ){
			        	console.error('Error loading collection of institutions');
			        	throw err;
			        }
			        console.dir(doc);

			        res.render('create.ejs',{
			        	title: 'Edit Institution',
			        	institution: doc
			        });
			    });
			}else{
			    res.render('create.ejs',{
		        	title: 'Create Institution',
		        	institution: ''
		        });
			}
		}catch(error){
			console.error('Configuration error occured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	//save create or update data//
	app.post('/config.save', function configHandler(req, res){
		try{
			//institution property validation//
			try{
				if( !req.body.name ) throw new Error('Name is empty');
				if( !req.body.address ) throw new Error('Address is empty');
				if( !req.body.email ) throw new Error('Email is empty');
				if( !req.body.telephone ) throw new Error('Telephone is empty');
				if( !req.body.host ) throw new Error('Host is empty');
				if( !req.body.port ) throw new Error('Port is empty');
				if( !req.body.header ) throw new Error('Header is empty');
				
			}catch( error ){
				console.error('Document/Institution validation error');
				console.dir(error);

				//put values back in the form//
				res.redirect('/config.create');
			}

			//updating institution
			if( req.body.id ){
				console.log('Editing... mode');
				console.dir(req.body );
				app.DB.Institution.findByIdAndUpdate( req.body.id, {
					name: req.body.name,
					address: req.body.address,
					email: req.body.email,
					telephone: req.body.telephone,
					host: req.body.host,
					port: req.body.port,
					header: req.body.header,
					fields: [],
				},function callBack(err, data){
					if( err ){
						console.error('Document/Institution update error');
						console.dir(err);
						throw err;
					}

					//send back to the listings page
					console.info('Institution updated successfully.');
					res.redirect('/config.list');
				});

			}
			else{
				//attempt to save the the institution here
				var inst = new app.DB.Institution();
				inst.name = req.body.name;
				inst.address = req.body.address;
				inst.email = req.body.email;
				inst.telephone = req.body.telephone;

				inst.header = req.body.telephone;
				inst.host   = req.body.host;
				inst.port 	= req.body.port;
				
				inst.services = [];

				inst.save(function( err, doc){
					if( err ){
						console.error('Institution configuration error');
						console.dir(err);
						throw err;
					}

					res.redirect('/config.list');
				});

			}
		}catch( error ){
			console.error('Configuration save error occured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	//list institution
	app.get('/config.list', function configHandler(req, res){
		try{
			//process uix settings here//

			//grab items from  db for display//
			app.DB.Institution.find({}, {}, function(err, docs) {
		        if( err ){
		        	console.error('Error loading collection of institutions');
		        	throw err;
		        }
		        console.dir(docs);

		        res.render('list.ejs',{
		        	title: 'List Institutions',
		        	institutions: docs,
		        });
		    });
		}catch(error){
			console.error('Configuration error ooccured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	//delete action
	app.get('/config.delete/:id', function deleteHandler(req, res){
		try{
			console.dir( req.params );
			console.info('About to delete institution');
			if( req.params.id ){
				app.DB.Institution.findById( req.params.id, function(err, item){
					if(err){
						console.error('Delete action could not find the institution');
						console.dir(err);
						throw err;
					}

					if( item ) item.remove(function(error, inst){
						if(error){
							console.error('Institution deletion error');
							console.dir(error);
							throw err;
						}

						console.info('Institution deleted.');
						//send success message and return to listings
						res.redirect('/config.list');
					});
				});
			}else 
				throw new Error('Invalid institution Id specified.');
		}catch( error ){
			console.error('Delete error ooccured');
			console.dir( error );
			res.redirect('/config.list');
		}
	});

	//service view of institution
	app.get('/config.service/:id', function serviceHandler(req, res){
		try{
			if( !req.params.id ){
				console.error('Institution Id not specified.');
				throw new Error('Institution Id not specified.');
			}

			app.DB.Institution.findById( req.params.id, function(err, item){
				if(err){
					console.error('Error fetching specified institution info.');
					console.dir(err);
					throw err;
				}

				//send services to the client/browser
				console.dir(item);
				var serv = item.services;
				res.render('services.ejs',{
		        	title: 'Add Services for Institution',
		        	institution: item,
		        	services: [],
		        	service: '',
		        });

			});
		}catch( error ){
			console.error('Institution Service page error occured');
			console.dir( error );
			res.redirect('/config.list');
		}
	});

	//service service for institution
	app.post('/config.service.save', function serviceHandler(req, res){
		try{
			app.DB.Institution.findById( req.body.id ,function(err, inst){
				if( err ){
					console.error('Service save error.');
					console.dir(err);
					throw err;
				}
				inst.service.push({
					id: new app.DB.ObjectId,
					name: 'name',
					fields: []
				});

				console.log('inst services--->');
				console.dir(inst);
				//var sid = new app.DB.ObjectId;

				console.info('Service updated successfully');
				res.redirect('/config.service/' + inst._id);
			});
		}catch( error ){
			console.error('Error saving new Institution Service');
			console.dir( error );
			res.redirect('/config.list');
		}
	});
}