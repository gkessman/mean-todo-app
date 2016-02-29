import _ from 'lodash';
import angular from 'angular';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
	
	// Display tasks from DB
	function getTasks($scope) {
		$http.get('/todos').success(response => {
			$scope.todos = response.todos;
		});
	}

	// Create task and store on DB
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

	// Update existing task on DB
	function updateTask($scope, todo) {
		$http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(
			response => {
				getTasks($scope);
				todo.isEditing = false;
			});
	};

	// Delete task from DB
	function deleteTask($scope, todoToDelete) {
		$http.delete(`/todos/${todoToDelete._id}`).success(response => {
			getTasks($scope);
		});
	};


	/** Event driven functions **/

	// Toggle task checked/unchecked
	function onCompletedClick(todo) {
		todo.isCompleted = !todo.isCompleted;
	};

	// enable 'editing mode' 
	function onEditClick(todo) {
		todo.updatedTask = todo.task;
		todo.isEditing = true;
	};

	// disable 'editing mode' on cancel
	function onCancelClick(todo) {
		todo.isEditing = false;
	}

	// 'real-time' text entry into task row
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

	// return all factory functions
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