todoapp.controller('UserController', ['$scope', '$http', 'users', 'todos',
  function ($scope, $http, users, todos) {

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

    function reloadWithSelectedUser(data) {
      $scope.todoData = {};
      $scope.users = data;
      $scope.userSelected = _.find(data, function (user) {
        return $scope.userSelected._id === user._id;
      })
    }

    $scope.createTodo = function () {
      if ($scope.todoData.text != undefined) {
        todos.create($scope.userSelected._id, $scope.todoData).success(function (data) {
          reloadWithSelectedUser(data);
        });
      }
    };

    $scope.deleteTodo = function (id) {
      todos.delete($scope.userSelected._id, id).success(function (data) {
        reloadWithSelectedUser(data);
      });
    };

    $scope.load();

  }]);