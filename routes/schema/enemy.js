var mongoose = require('mongoose');

var deck = new mongoose.Schema({ 
  deck:String,
  InsDate:Date
}, {_id:false});

var enemy = new mongoose.Schema({ 
  _id : String,
  decks: [deck]
});

exports.deck = deck;
exports.enemy = enemy;