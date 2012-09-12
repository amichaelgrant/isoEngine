/* All in iso calls to banking hosts are processed here*/
var Events = require('events');
var net = require('net');


var IsoProcessor = function( PORT, HOST, options ){

	IsoProcessor.prototype = new Events.EventEmitter();

	//creating the connection for raw tcp 
	this.socket = net.createConnection(PORT, HOST, function(){
		//write on the socket when there is connection//
		console.info('Writing to socket...%s on %s', HOST, PORT);
		console.dir( options );
		this.socket.write();
	});
	//raw tcp connection events
	this.socket.on('data', function( data ){
		console.log('Data --- event');
		this.emit('data', data);
		//once we are done receiving data//
		//kill the socket completely	 //
		this.socket.destroy();
	}).on('error', function(){
		console.log('Error --- event');
		this.emit('error');
	}).on('end', function(){
		console.log('End --- event');
		this.emit('end');
	}).on('connect', function(){
		console.log('Connect --- event');
		this.emit('connect');
	}).on('timeout', function(){
		console.log('TimeOut --- event');
		this.emit('timeout');
	}).on('close', function(){
		console.log('Close --- event');
		this.emit('close');
	});
	///raw tcp connection ends

	this.ISO = '';

	this.toISO = function( ajson ){
		return ajson;
	};

	this.toJSON = function( iso ){
		return iso;
	};

}

exports.IsoProcessor = IsoProcessor;