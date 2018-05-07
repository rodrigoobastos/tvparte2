var express = require('express');
var Joi = require('joi');
var UsersDAL = require('./usersDAL');
var router = express.Router();

/* Login path. */
router.post('/login', function (req, res, next) {
	var DAL = new UsersDAL();
	var LoginObject = { 
		email: req.body.email,
		password: req.body.password  
	};
	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	});
	Joi.validate(LoginObject, schema, function(err, value) {
		if (err === null) {
			DAL.userLogin(LoginObject).exec(function(err, user) {
				if (err) {
					console.log(err);
					return res.status(500).send();
				}
				if (!user){
					return res.status(404).send();
				}
				req.session.user = user;
				res.json(user);
				res.status(200);
				res.end();
			});
		};
	});
});

/* GET users listing. */
router.get('/', function(req, res, next){
	if (!req.session.user){
		return res.status(401).send();
	}
	var DAL = new UsersDAL();
	DAL.getAllUsers().exec(function(e,docs){
		res.json(docs);
		res.end();
	});
});

/* GET one user. */
router.get('/:id', function(req, res, next){
	if (!req.session.user){
		return res.status(401).send();
	}
	var IdObject = {
		id : req.params.id
	};
	var DAL = new UsersDAL();
	DAL.getUserById(IdObject,res).exec(function(e,docs){
		res.json(docs);
		res.end();
	});
});

/* POST one user. */
router.post('/', function (req, res, next) {
	var DAL = new UsersDAL();
	var NewObject = { 
		email: req.body.email,
		first_name: req.body.first_name, 
		last_name: req.body.last_name, 
		personal_phone: req.body.personal_phone,
		password: req.body.password  
	};
	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		first_name: Joi.string().regex(/[A-z]/).required(),
		last_name: Joi.string().regex(/[A-z]/).required(),  
		personal_phone: Joi.string().regex(/[0-9()-]/).length(14),
		password: Joi.string().required()
	});
	Joi.validate(NewObject, schema, function(err, value) {
		if (err === null) {
			DAL.postUser(NewObject);
			res.json(req.body);
		};
		res.end();
	});
});

/* PUT one user. */
router.put('/:id', function (req, res, next) {
	if (!req.session.user){
		return res.status(401).send();
	}
	var DAL = new UsersDAL();
	var IdObject = { 
		id: req.params.id,
	};
	var UpdateObject = req.body;
	var schema = Joi.object().keys({
		email: Joi.string().email().required(),
		first_name: Joi.string().regex(/[A-z]/).required(),
		last_name: Joi.string().regex(/[A-z]/).required(),  
		personal_phone: Joi.string().regex(/[0-9()-]/).length(14),
		password: Joi.string().required()
	});
	Joi.validate(UpdateObject, schema, function(err, value) {
		if (err === null) {
			DAL.putUserById(IdObject, UpdateObject);
			res.json(req.body);
		};
		res.end();
	});
});

/* DELETE one user. */
router.delete('/:id', function(req, res, next){
	if (!req.session.user){
		return res.status(401).send();
	}
	var DAL = new UsersDAL();
	var IdObject = {
		id : req.params.id
	};
	DAL.deleteUserById(IdObject);
	res.json({sucess: true});
	res.end();
});

module.exports = router;