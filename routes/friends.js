var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = new Schema({
	location: {
		required:true,
		type: String
	}
});

module.exports = mongoose.model('Friends', FriendSchema);

var Friends = mongoose.model('Friends');

router.get('/show', function (req, res) {
	res.jsonp({tuan1: 'show'});
})
router.post('/show', function(req,res){
	var friend = new Friends({
		location: "100"
	});
	friend.save();
	res.jsonp("demo");
})
module.exports = router;
