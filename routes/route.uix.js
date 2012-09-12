/* All in coming uix calls are processed here*/

exports.uix = function( app ){

	app.get('/config', function configHandler(req, res){
		try{
		    res.render('index.ejs',{
	        	title: 'Index',
	        	institution: ''
	        });
		}catch(error){
			console.error('Configuration error ooccured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	app.get('/config.create', function configHandler(req, res){
		try{
			//process uix settings here//
			if( false ){ //if id exist then edit mode
				//grab items from  db for display//
				app.db.collection.find({}, {limit:10}).toArray(function(err, docs) {
			        if( err ){
			        	console.error('Error loading collection of institutions');
			        	throw err;
			        }
			        console.dir(docs);

			        res.render('list.ejs',{
			        	title: 'List',
			        	institutions: ''
			        });
			    });
			}else{
			    res.render('list.ejs',{
		        	title: 'List',
		        	institution: ''
		        });
			}
		}catch(error){
			console.error('Configuration error ooccured');
			console.dir( error );
			res.redirect('/config');
		}
	});

	app.get('/config.list', function configHandler(req, res){
		try{
			//process uix settings here//

			//grab items from  db for display//
			app.db.collection.find({}, {limit:10}).toArray(function(err, docs) {
		        if( err ){
		        	console.error('Error loading collection of institutions');
		        	throw err;
		        }
		        console.dir(docs);

		        res.render('list.ejs',{
		        	title: 'List',
		        	institutions: ''
		        });
		    });
		}catch(error){
			console.error('Configuration error ooccured');
			console.dir( error );
			res.redirect('/config');
		}
	});
}