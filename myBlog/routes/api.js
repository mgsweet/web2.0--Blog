module.exports = function(db) {
  var dataManager = require('../models/data')(db);
  var usersManager = require('../models/users')(db);

  var api = {};
  api.showPost = function(req, res) {
    var id = req.params.id;
    dataManager.getData(function(data) {
      data.posts[id].hide = false;
      dataManager.updateData(data, function() {
        res.json(true);
      });
    });
  }

  api.hidePost = function(req, res) {
    var id = req.params.id;
    dataManager.getData(function(data) {
      data.posts[id].hide = true;
      dataManager.updateData(data, function() {
        res.json(true);
      });
    });
  }

  api.getUser = function(req, res) {
    if (!!req.session.user) {
      res.json(req.session.user);
    } else {
      res.json(false);
    }
  }

  api.signout = function(req, res) {
    delete req.session.user;
    res.json(true);
  }

  api.signin = function(req, res) {
    usersManager.findUser(req.body.username, req.body.password)
      .then(function(user) {
        console.log(user);
        req.session.user = req.body;
        res.json(true);
      })
      .catch(function(err) {
        res.json(false);
      });
  }

  api.signup = function(req, res) {
    var user = req.body;
    usersManager.isUserUnique(user)
      .then(function() {
        usersManager.createUser(user);
      })
      .then(function() {
        req.session.user = user;
        res.json(true);
      })
      .catch(function(err) {
        console.log(err);
        res.json(false);
      });
  }

  // GET

  api.posts = function(req, res) {
    var posts = [];
    dataManager.getData(function(data) {
      data.posts.forEach(function(post, i) {
        var commentsWithId = [];
        post.comments.forEach(function(comment, cid) {
          commentsWithId.push({
            commentId: cid,
            text: comment.text,
            author: comment.author
          })
        });
        posts.push({
          id: i,
          title: post.title,
          hide: post.hide,
          author: post.author,
          text: post.text.substr(0, 50) + '...',
          comments: commentsWithId
        });
      });
      res.json({
        posts: posts
      });
    })
  };

  api.post = function(req, res) {
    var id = req.params.id;
    dataManager.getData(function(data) {
      if (id >= 0 && id < data.posts.length) {
        var commentsWithId = [];
        data.posts[id].comments.forEach(function(comment, cid) {
          commentsWithId.push({
            commentId: cid,
            text: comment.text,
            author: comment.author
          })
        });
        var post = {
          id: id,
          text: data.posts[id].text,
          title: data.posts[id].title,
          author: data.posts[id].author,
          comments: commentsWithId
        };
        res.json({
          post: post,
          originPost: data.posts[id]
        });
      } else {
        res.json(false);
      }
    })
  };

  // POST

  api.addPost = function(req, res) {
    dataManager.getData(function(data) {
      data.posts.push(req.body);
      dataManager.updateData(data, function() {
        res.json(req.body);
      })
    });
  };

  api.addComment = function(req, res) {
    var id = req.params.id;
    dataManager.getData(function(data) {
      if (id >= 0 && id < data.posts.length) {
        var author = req.session.user.username || "guest";
        data.posts[id].comments.push({
          "text": req.body.comment,
          "author": author
        });
        dataManager.updateData(data, function() {
          res.json(true);
        })
      } else {
        res.json(false);
      }
    });
  }

  // PUT

  api.editPost = function(req, res) {
    var id = req.params.id;

    dataManager.getData(function(data) {
      if (id >= 0 && id < data.posts.length) {
        console.log(req.body);
        data.posts[id] = req.body;
        dataManager.updateData(data, function() {
          res.json(true);
        });
      } else {
        res.json(false);
      }
    });
  };

  // DELETE

  api.deletePost = function(req, res) {
    var id = req.params.id;
    dataManager.getData(function(data) {
      if (id >= 0 && id < data.posts.length) {
        data.posts.splice(id, 1);
        dataManager.updateData(data, function() {
          res.json(true);
        })
      } else {
        res.json(false);
      }
    })
  };

  api.deleteComment = function(req, res) {
    var postId = req.params.postId;
    var cid = req.params.cid;
    dataManager.getData(function(data) {
      if (postId >= 0 && postId < data.posts.length && cid >= 0 && data.posts[postId].comments.length > cid) {
        data.posts[postId].comments.splice(cid, 1);
        dataManager.updateData(data, function() {
          res.json(true);
        });
      } else {
        res.json(false);
      }
    })
  };
  return api;
}