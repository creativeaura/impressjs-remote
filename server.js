var express = require('express');

var app = module.exports = express.createServer(express.logger());

var pubnub = require('pubnub').init({
  publish_key   : "pub-62fa0fbf-221f-4d4f-a927-88ef9662ae09",
  subscribe_key : "sub-70ef5775-aaf8-11e1-b1ef-e30f56e7105c",
  secret_key    : "sec-ZGRlZDFmM2YtYTJhNS00OTVhLWEyN2MtOTkxMGVhODEwM2Fh",
  ssl           : true,
  cipher_key    : "AES-Crypto-Cipher-Key",
  origin        : "pubsub.pubnub.com"
});

var routes = require('./routes');

var port = process.env.PORT || 3000;

var utility = require('./utility.js');

var clients = [];
// Configuration

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set("view options", { layout: true });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public', { maxAge: 31557600000 }));
});


app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/session/:key', routes.session);

app.listen(port, function() {
  //console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
  console.log("Express server listening");
});

pubnub.subscribe({
  channel: "impressjs",
  callback: function(message) {
    console.log(message);
  }
});