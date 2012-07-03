
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'ImpressJs', layout: true} );
};

exports.session = function(req, res){
  	res.render('session', { title: 'Session ID', key: req.params.key, socketid: req.params.socketid });
};