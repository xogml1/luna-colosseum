var mongoose = require('mongoose'),
    schema = require('./schema');
    util = require('util');

var connectionString = (process.env.OPENSHIFT_MONGODB_DB_HOST)?
				"mongodb://" + 
				process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +	
				process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
				process.env.OPENSHIFT_MONGODB_DB_HOST + ":" + 
				process.env.OPENSHIFT_MONGODB_DB_PORT +  "/" +
				process.env.OPENSHIFT_APP_NAME
				:
				"mongodb://tester:tester@127.0.0.1:27017/luna";

console.log(connectionString);

var db = mongoose.createConnection(connectionString);

var Enemy = db.model('enemies', schema.enemy);

exports.GetEnemies = function(req, res){
	var searchValue = req.param('searchValue');

	// where query
	var query = {_id:new RegExp('^'+searchValue+'.*', "i")};

	console.log(util.inspect(query));

	var FindEnemiesCallback = function(err, enemies){
		console.log(util.inspect(enemies));
		if(err){
			console.log(err);
			res.json({
				err : {
				  msg : err.message
				}
			});
		}
		else {
			res.json(enemies);
		}
	};

	var select = "id decks";

	Enemy.find(query, select, FindEnemiesCallback);
};

exports.SaveEnemy = function(req, res) {
	var data = req.body;

	console.log(util.inspect(data));

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
			res.json(true);
		}
	};

	var findQuery = {_id:data.id};
	var FindEnemyCallback = function(err, enemy){
		if(err){
			console.log(err);
			res.json({
				err : {
				  msg : err.message
				}
			});
		}
		else {
			if(enemy){
				data.deck.InsDate = Date.now();
				enemy.decks.push({deck:data.deck,InsDate:Date.now()})
				console.log("update");
				console.log(enemy);
				enemy.save(SaveEnemyCallback);
			}
			else{
				enemy = new Enemy({
					_id:data.id,
					decks:[{deck:data.deck,InsDate:Date.now()}]
				});

				enemy._id = data.id;
				enemy.decks = [];
				enemy.decks.push({
					deck : data.deck,
					InsDate : Date.now()
				});
				console.log("add");
				enemy.save(SaveEnemyCallback);
			}
		}
	};

	var select = "id decks";

	Enemy.findOne(findQuery, select, FindEnemyCallback);
};