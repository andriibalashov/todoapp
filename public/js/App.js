var todoapp = angular.module('todoapp', ['ngRoute', 'ngAnimate', 'userService', 'todoService']);

todoapp.config(function ($routeProvider) {
  $routeProvider

      .when('/', {
        templateUrl: 'pages/home.html',
        controller: 'UserController'
      })
      .when('/todo', {
        templateUrl: 'pages/todo.html',
        controller: 'TodoController'
      })
      .when('/todo/:todoId', {
        templateUrl: 'pages/todo.html',
        controller: 'TodoController'
      })

      .otherwise({
        redirectTo: '/'
      });

});


