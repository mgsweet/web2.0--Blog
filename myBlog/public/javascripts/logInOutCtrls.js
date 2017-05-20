
function signupCtrl($scope, $http, $location, userInfoService) {
  $scope.user = {};
  $scope.hasError = false;
  $scope.notEqual = false;
  $scope.reset = function() {
    $scope.user.username = "";
    $scope.user.password = "";
    $scope.user.repeatPassword = "";
    $scope.hasError = false;
    $scope.notEqual = false;
  };
  $scope.checkEqual = function() {
    $scope.notEqual = $scope.user.password == $scope.user.repeatPassword ? false : true;
  }
  $scope.submitPost = function () {
    $http.post('/api/signup', $scope.user).
      then(function(res) {
        if (!!res.data) {
          $scope.hasError = false;
          userInfoService.userInfo.user = $scope.user;
          userInfoService.userInfo.hasSignin = true;
          $location.path('/');
        } else {
          $scope.user.username = "";
          $scope.user.password = "";
          $scope.user.repeatPassword = "";
          $scope.hasError = true;
        }
      });
  };
}

function signinCtrl($scope, $http, $location, userInfoService) {
  $scope.user = {};
  $scope.hasError = false;
  $scope.reset = function() {
    $scope.user.username = "";
    $scope.user.password = "";
    $scope.hasError = false;
  };
  $scope.submitPost = function () {
    $http.post('/api/signin', $scope.user).
      then(function(res) {
        if (!!res.data) {
          userInfoService.userInfo.user = $scope.user;
          userInfoService.userInfo.hasSignin = true;
          $location.path('/');
        } else {
          $scope.user.password = "";
          $scope.hasError = true;
        }
      });
  };
}