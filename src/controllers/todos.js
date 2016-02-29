import _ from 'lodash';

export default function($scope, todoFactory) {

	let params = {
		createHasInput: false
	};

	// $scope.todos = [
	// 	{
	// 		task: 'do dishes',
	// 		isCompleted: false,
	// 		isEditing: false
	// 	},
	// 	{
	// 		task: 'walk dog',
	// 		isCompleted: true,
	// 		isEditing: false
	// 	}
	// ];

	todoFactory.getTasks($scope);

	const { createTask, updateTask, deleteTask, onCompletedClick, onEditClick, onCancelClick } = todoFactory;

	$scope.createTask = _.partial(createTask, $scope, params);

	$scope.updateTask = _.partial(updateTask, $scope);

	$scope.deleteTask = _.partial(deleteTask, $scope);

	$scope.onCompletedClick = _.partial(onCompletedClick);

	$scope.onEditClick = _.partial(onEditClick);

	$scope.onCancelClick = _.partial(onCancelClick);

	$scope.$watch('createTaskInput', _.partial(todoFactory.watchCreateTaskInput, $scope, params));

}