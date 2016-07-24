angular.module('todoService', []).factory('todos', ['$http',function($http) {
		return {
			create : function(userId,todoData) {
				return $http.post('/api/users/'+userId+'/todo', todoData);
			},
			delete : function(userId, id) {
				return $http.delete('/api/users/'+userId+'/todo/' + id);
			}
		}
	}]);