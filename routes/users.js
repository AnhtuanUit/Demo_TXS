var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		required:true,
		type: String
	},
	password: {
		required:true,
		type:String
	}
});

//Ham luu du liu
exports.luudulieu = function  (user, callback) {
	user.save(function  (err) {
		if(!err){
			return callback('Dang ki thanh cong');

		} else {
			return callback('Dang ki that bai');
		}
	});
}


module.exports = mongoose.model('Users', UserSchema);

var Users = mongoose.model('Users');

var _username = "AnhtuanUit", _password = "12345";

router.post('/signup', function  (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	console.log(req.body);
	var that = this;
	Users.findOne({
		username: username
	}, function  (err, data) {
		if(data){
			res.jsonp('Da ton tai');
		} else {

			var user = new Users({
			username: username,
			password: password
			});
			user.save(function  (err) {
				if(err){

					res.jsonp("dang ki that bai");
				} else {
					res.jsonp('Dang ki thanh cong')
				}
			});
		}
	});

	
});

router.post('/login', function  (req, res) {
	var username = req.body.username;
	var password = req.body.password;

	Users.find({
		username: username,
		password: password
	}, function  (err, data) {
		if(!err && data){
			console.log(data);
			res.jsonp({
				result:'Dang nhap thanh cong'
			});
		} else {
			res.jsonp('Dang nhap that bai');
		}
	})
});

router.put('/update', function  (req, res) {
	var username = req.body.username;
	var NewPassword = req.body.NewPassword;
	var OldPassword = req.body.OldPassword;
	Users.findOne({
		username: username
	}, function  (err, data) {
		if(!err && data){
			data.password = NewPassword;
			data.save(function  (err) {
				if(!err){
					res.jsonp('Doi mat khau thanh cong');
				} else {

					res.jsonp('Doi mat khau that bai');
				}
			});
			
		} else {
			res.jsonp('Doi mat khau that bai');
		}
	});
})

router.delete('/delete', function  (req, res) {
	var username = req.body.username;
	Users.findOne({
		username: username
	}, function  (err, data) {
		if(!err && data){
			data.remove(function  (err) {
				if(!err){
					res.jsonp("Xoa thanh cong ");
				} else {
					res.jsonp('Xoa that bai');
				}
			})
		} else {
			res.jsonp("Xoa that bai");
		}
	})
})

router.get('/getListUsers/:password', function  (req, res) {
	password = req.params.password;
	console.log(password);
	Users.find({
		password: password
	}, function  (err, data) {
		if(!err && data){
			res.jsonp(data);
		} else {
			res.jsonp('Lay list that bai');
		}
	});
})


module.exports = router;
