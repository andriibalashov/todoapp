angular.module('userController', []).controller('mainController', ['$scope', '$http', 'users', 'todos', function ($scope, $http, users, todos) {

  $scope.userData = {};
  $scope.todoData = {};
  $scope.userSelected = null;

  $scope.load = function () {
    users.get().success(function (data) {
      $scope.users = data;
    });
  };

  $scope.createUser = function () {

    if ($scope.userData.text != undefined) {

      users.create($scope.userData).success(function (data) {
        $scope.userData = {};
        $scope.users = data;
      });
    }
  };

  $scope.deleteUser = function (id) {

    users.delete(id).success(function (data) {
      $scope.users = data;
      $scope.userSelected = null;

    });
  };

  $scope.setSelected = function (userSelected) {
    $scope.load();
    $scope.userSelected = userSelected;
  };


  $scope.unselectUser = function () {
    $scope.userSelected = null;
  };

  $scope.createTodo = function () {
    if ($scope.todoData.text != undefined) {
      todos.create($scope.userSelected._id, $scope.todoData).success(function (data) {
        $scope.todoData = {};
        $scope.users = data;
        for(var i=0; i < $scope.users.length; i++) {
          if ($scope.userSelected._id === $scope.users[i]._id) {
            $scope.userSelected = $scope.users[i];
          }
        };
      });
    }
  };

  $scope.deleteTodo = function (id) {

    todos.delete($scope.userSelected._id, id).success(function (data) {
      $scope.users = data;
      for(var i=0; i < $scope.users.length; i++) {
        if ($scope.userSelected._id === $scope.users[i]._id) {
          $scope.userSelected = $scope.users[i];
        }
      };
    });
  };

  $scope.load();

}]);