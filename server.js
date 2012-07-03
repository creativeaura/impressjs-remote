var express = require('express');

var app = module.exports = express.createServer(express.logger());

var io = require('socket.io').listen(app);

var routes = require('./routes');

var port = process.env.PORT || 3000;

var utility = require('./utility.js');

var clients = [];
// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});


app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

io.configure(function () {
  //io.set("transports", ["xhr-polling"]);
  io.set("polling duration", 10);
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/session/:key', routes.session);

app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});


io.sockets.on('connection', function(socket) {
	var uid = utility.getKey(4);
  console.log('presentation id ', socket.id);

	socket.emit('welcome', {uid: uid, message: 'Welcome to Impress JS Remote', socket_id: socket.id });
  clients[uid] = socket;
  socket.on('command', function(data) {
    try{
      clients[data.key].emit('command', data);
    } catch (error) {
      
    }
  });

});

io.sockets.on('disconnect', function(socket) {
  //console.log('disconnect', socket.id);
});