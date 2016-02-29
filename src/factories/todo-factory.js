import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
	
	function getTasks($scope) {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	}

	function createTask($scope, params) {
		if (!$scope.createTaskInput) { return; }

		$http.post('/todos', {
			task: $scope.createTaskInput,
			isCompleted: false,
			isEditing: false
		}).success(response => {
			getTasks($scope);
			$scope.createTaskInput = '';
		});
	};

	function updateTask($scope, todo) {
		$http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(
			response => {
				getTasks($scope);
				todo.isEditing = false;
			});

		// todo.task = todo.updatedTask;
		// todo.isEditing = false;
	};

	function deleteTask($scope, todoToDelete) {
		$http.delete(`/todos/${todoToDelete._id}`).success(response => {
			getTasks($scope);
		});

		// _.remove($scope.todos, todo => todo.task === todoToDelete.task);
	};

	function onCompletedClick(todo) {
		todo.isCompleted = !todo.isCompleted;
	};

	function onEditClick(todo) {
		todo.updatedTask = todo.task;
		todo.isEditing = true;
	};

	function onCancelClick(todo) {
		todo.isEditing = false;
	}

	function watchCreateTaskInput($scope, params, val) {
		if (!val && params.createHasInput) {
			$scope.todos.pop();
			params.createHasInput = false;
		} else if (val && !params.createHasInput) {
			$scope.todos.push({ task: val, isCompleted: false });
			params.createHasInput = true;
		} else if (val && params.createHasInput) {
			$scope.todos[$scope.todos.length - 1].task = val;
		}
	};


	return {
		getTasks,
		createTask,
		updateTask,
		deleteTask,
		onCompletedClick,
		onEditClick,
		onCancelClick,
		watchCreateTaskInput
	};
});

export default todoFactory;