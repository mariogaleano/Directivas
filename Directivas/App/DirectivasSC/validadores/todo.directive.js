/*globals angular*/
(function () {

	'use strict';

	angular
		.module('scApp.common')
		.directive('todo', todo);
	
	todo.$inject = ['$compile','EVENTO_VALIDACION'];
	
	function todo( $compile ,EVENTO_VALIDACION ) {

		var TODO_REGEX = /./;
		var directiva = {
			require: 'ngModel',
			restrict: 'A',
			link: link,
		};

		return directiva;

		function link(scope, element, attrs, model) {
			
			var value;
			var required = scope.requerido;
			
			if(required){
				scope.$watch(attrs.ngModel, function(mv){
					value = mv;
					if(model.$touched){
						validar();
					}
				});
			
				element.on(EVENTO_VALIDACION, function () {
					validar();
				});
			}
			
			function validar () {
				var cond = (angular.isSet(value) || (angular.isSet(value) && scope.requerido) || (!angular.isSet(value) && scope.requerido));
				
				if (cond) {
					model.$setValidity('todo', TODO_REGEX.test(value));
					scope.$parent.$parent.inputValidado = !TODO_REGEX.test(value);
				}else{
					scope.$parent.$parent.inputValidado = true;
				}
			}
			
		}
	}
})();