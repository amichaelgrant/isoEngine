/* All in coming api calls are processed here*/
var IsoProcessor  =  require('../misc/iso.processor.js');

//services available on system
var SERVICES = {
	BALANCE_ENQUIRY			: 0,
	DEPOSIT 				: 1,
	CHEQUE_BOOK_REQUEST		: 2,
};

//defining a unified structure for all api calls
var API = {
	service:'',
	field1:'',
	field2:'',
	field3:'',
}

// defined errror messages
var ERROR = {

}

//main api handler procedure
exports.api = function( app ){
	app.get('/api.iso.json', function apiHandler( req, res ){
		var o = {status: false, message:'error', data:''};
		try{
			//switch for all cases//
			//get and parse json inputs
			try{
				//first of all decrypt message//
				var ajson = JSON.parse( req.body );
			}catch( err ){
				console.error('Input JSON parse error');
				console.dir( err );
				o.message = 'Input JSON parse error';
				res.json(o);
			}

			//If parsing came through but json object is empty//
			if( !ajson ) throw new Error('JSON input not specified');

			//isoprocessor options//
			var options = {};
			
			//Now the service switching happens here//
			switch( ajson.service ){
				case SERVICES.BALANCE_ENQUIRY:
					break;

				case SERVICES.DEPOSIT:
					break;

				case SERVICES.CHECK_BOOK_REQUEST:
					break;
				default:{
					console.error('Unknown service requested.');
					break;
				}
			}

			//get port and host of particular institution being called//
			var PORT = 8080;
			var HOST = '127.0.0.1';
			var isoProcessor = new IsoProcessor(PORT,HOST,options);
			isoProcessor.on('connect', function(){
				console.log('Connected in main function');
			});

			isoProcessor.on('data', function(err, data){
				console.info('Returning client api caller');
				o.status = true;
				o.message = 'All Ok';
				res.json(o);
			});
			//
			
		}catch( error ){
			console.error('api.iso.json error');
			console.dir( error );
			res.json(o);
		}
	});
};





