'use strict';

/* Controllers */

function IndexCtrl($scope, $http, $location, userInfoService) {
  $http({
    method: 'GET',
    url: '/api/posts'
  }).then(function (res) {
    $scope.posts = res.data.posts;
  });

  $scope.hasPower = function(author) {
    return hasPower(userInfoService.userInfo.user.username, author);
  }

  $scope.hidePost = function(id) {
    $http.get('/api/hidePost/' + id).
      then(function(res) {
        $location.url('/refresh');
      });
  }

  $scope.showPost = function(id) {
    $http.get('/api/showPost/' + id).
      then(function(res) {
        $location.url('/refresh');
      });
  }
}

function hasPower(username, author) {
  return username == author || username == "admin";
}

function AddCommentCtrl($scope, $http, $location, $routeParams, userInfoService) {
  $scope.form = {};
  $scope.submitComment = function () {
    console.log(1);
    $http.post('/api/addComment/' + $routeParams.id, $scope.form).
      then(function(res) {
        $location.path('/');
      });
  };
  $scope.charLeft = 30;
}

function AddPostCtrl($scope, $http, $location, userInfoService) {
  $scope.form = {};
  $scope.form.comments = [];
  $scope.form.hide = false;
  $scope.form.author = userInfoService.userInfo.user.username;
  $scope.submitPost = function () {
    $http.post('/api/post', $scope.form).
      then(function(data) {
        $location.path('/');
      });
  };
}

function ReadPostCtrl($scope, $http, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    then(function(res) {
      $scope.post = res.data.post;
    });
}

function EditPostCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.id).
    then(function(res) {
      $scope.form = res.data.post;
    });

  $scope.editPost = function () {
    $http.put('/api/post/' + $routeParams.id, $scope.form).
      then(function(data) {
        $location.url('/readPost/' + $routeParams.id);
      });
  };
}

function EditCommentCtrl($scope, $http, $location, $routeParams) {
  $scope.form = {};
  $http.get('/api/post/' + $routeParams.postId).
    then(function(res) {
      console.log(res);
      $scope.form = res.data.originPost;
      $scope.comment = res.data.originPost.comments[$routeParams.cid].text;
    });

  $scope.editPostComment = function () {
    $scope.form.comments[$routeParams.cid].text = $scope.comment;
    $http.put('/api/post/' + $routeParams.postId, $scope.form).
      then(function(data) {
        $location.url('/readPost/' + $routeParams.postId);
      });
  };
}

function DeletePostCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.id).
    then(function(res) {
      $scope.post = res.data.originPost;
    });

  $scope.deletePost = function () {
    console.log(11111);
    $http.delete('/api/post/' + $routeParams.id).
      then(function(data) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}

function DeleteCommentCtrl($scope, $http, $location, $routeParams) {
  $http.get('/api/post/' + $routeParams.postId).
    then(function(res) {
      $scope.author = res.data.originPost.author;
      $scope.comment = res.data.originPost.comments[$routeParams.cid].text;
    });

  $scope.deleteComment = function () {
    $http.delete('/api/comment/' + $routeParams.postId + '/' + $routeParams.cid).
      then(function(res) {
        $location.url('/');
      });
  };

  $scope.home = function () {
    $location.url('/');
  };
}

angular.module('myApp').controller('userCtrl', function($scope, $http, $location, userInfoService) {
  $scope.userInfo = userInfoService.userInfo;
  $http.get('/api/getUser').then(function(res) {
      if (!!res.data) {
        userInfoService.userInfo.user = res.data;
        userInfoService.userInfo.hasSignin = true;
      }
    });
  $scope.signout = function() {
    $http.get('/api/signout').then(function(res){
      userInfoService.userInfo.user = {};
      userInfoService.userInfo.hasSignin = false;
    })
  }
});


