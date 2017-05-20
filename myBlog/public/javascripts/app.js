'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
  when('/', {
    templateUrl: 'partials/index',
    controller: IndexCtrl
  }).
  when('/signup', {
    templateUrl: 'partials/signup',
    controller: signupCtrl
  }).
  when('/signin', {
    templateUrl: 'partials/signin',
    controller: signinCtrl
  }).
  when('/addPost', {
    templateUrl: 'partials/addPost',
    controller: AddPostCtrl
  }).
  when('/editComment/:postId/:cid' , {
    templateUrl: 'partials/editComment',
    controller: EditCommentCtrl
  }).
  when('/addComment/:id', {
    templateUrl: 'partials/addComment',
    controller: AddCommentCtrl
  }).
  when('/readPost/:id', {
    templateUrl: 'partials/readPost',
    controller: ReadPostCtrl
  }).
  when('/editPost/:id', {
    templateUrl: 'partials/editPost',
    controller: EditPostCtrl
  }).
  when('/deletePost/:id', {
    templateUrl: 'partials/deletePost',
    controller: DeletePostCtrl
  }).
  when('/deleteComment/:postId/:cid', {
    templateUrl: 'partials/deleteComment',
    controller: DeleteCommentCtrl
  }).
  otherwise({
    redirectTo: '/'
  });
  $locationProvider.html5Mode(true);
}]);