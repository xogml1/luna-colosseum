var mongoose = require('mongoose');

exports.schema = new mongoose.Schema({ 
  id : String,
  deck: [{1:String, 2:String, 3:String, 4:String, 5:String, InsDate:Date }]
});