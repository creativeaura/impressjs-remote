
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Impress JS Remote Server' });
};

exports.session = function(req, res){
	console.log('res.params', req.params);
  res.render('session', { title: 'Session ID', key: req.params.key, socketid: req.params.socketid });
};