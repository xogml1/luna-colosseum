var mongoose = require('mongoose'),
    schema = require('./schema');

var db = mongoose.createConnection('mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/', 'luna');

var Enemy = db.model('enemy', schema.enemy);

exports.GetEnemies = function(req, res){
	var searchValue = req.query.searchValue;

	// where query
	var query = {id:/searchValue.*/i};

	var FindEnemiesCallback = function(err, enemies){
		if(err){
			console.log(err);
			res.json({
				err : {
				  msg : err.message
				}
			});
		}
		else {
			res.json({
				enemies : enemies
			});
		}
	};

	var select = "id deck";

	Enemy.find(query, select, FindEnemiesCallback);
};

exports.GetEnemy = function(req, res){
	var searchValue = req.query.searchValue;

	// where query
	var query = {id:searchValue};

	var FindEnemyCallback = function(err, enemies){
		if(err){
			console.log(err);
			res.json({
				err : {
				  msg : err.message
				}
			});
		}
		else {
			res.json({
				enemies : enemies
			});
		}
	};

	var select = "id deck";

	Enemy.find(query, select, FindEnemyCallback);
};

exports.SaveEnemy = function(req, res) {
	var enemy = req.body;

	var SaveEnemyCallback = function(err){
		if(err){
			console.log(err);
			res.json({
				err : {
				msg : err.message
				}
			});
		}
		else{
			res.json(enemy);
		}
	};

	Enemy.save(SaveEnemyCallback);
};