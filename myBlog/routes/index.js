var express = require('express');
var router = express.Router();
var debug = require('debug')('myBlog:index');

module.exports = function(db) {
	var api = require('./api')(db);
	/* GET home page. */
	router.get('/', function(req, res, next) {
		res.render('index', {
			title: 'Blog'
		});
	});

	router.get('/partials/:name', function(req, res, next) {
		var name = req.params.name;
		res.render('partials/' + name);
	});

	// JSON API
	router.post('/api/signin', api.signin);
	router.post('/api/signup', api.signup);
	router.get('/api/posts', api.posts);
	router.get('/api/getUser', api.getUser);
	router.get('/api/signout', api.signout);
	router.get('/api/hidePost/:id', api.hidePost);
	router.get('/api/showPost/:id', api.showPost);


	router.post('/api/addComment/:id', api.addComment);
	router.get('/api/post/:id', api.post);
	router.post('/api/post', api.addPost);
	router.put('/api/post/:id', api.editPost);
	router.delete('/api/post/:id', api.deletePost);
	router.delete('/api/comment/:postId/:cid', api.deleteComment);

	return router;
};