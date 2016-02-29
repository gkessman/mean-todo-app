import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todosController from 'controllers/todos';

const app = angular.module('app', [uiRouter]);

app.config(($stateProvider, $urlRouterProvider, $locationProvider) => {
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('todos', {
			url: '/',
			template: require('partials/todos.html'),
			controller: todosController
		})
		.state('about', {
			url: '/about',
			template: require('partials/about.html')
		})

	$locationProvider.html5Mode(true);
});

export default app;