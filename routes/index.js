var enemies = require('./enemies');
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index');
};

exports.enemies = enemies;
