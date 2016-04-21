/*globals angular*/
(function () {

	'use strict';

	angular
		.module('scApp.common')
		.directive('soloCorreoE', soloCorreoE);
	
	soloCorreoE.$inject = ['EVENTO_VALIDACION'];
	
	function soloCorreoE( EVENTO_VALIDACION ) {

	    //var CORREOE_REGEX = /^[\w|.|-]*@\w*\.[\w|.]*$/;
	    var CORREOE_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        
		var directiva = {
			require: 'ngModel',
			link: link,
			restrict: 'A'
		};

		return directiva;

		function link(scope, element, attrs, ngModel) {

			var value;
			var panel = scope.$parent.$parent;
			
			scope.$watch('ngModel',function (value) {
				value = value;
				validarInput();
			});
			
			element.on(EVENTO_VALIDACION, function () {
				value = element.val();
				validarInput();
			});
			
			function validarInput () {
				var cond = (angular.isSet(value) || scope.requerido );
				var cond2 = (ngModel.$touched);
				
				if (cond && cond2) {
					ngModel.$setValidity('soloCorreoE', CORREOE_REGEX.test(value));
					panel.inputValidado = !CORREOE_REGEX.test(value);
				}else{
					panel.inputValidado = false;
				}
			}
		}
	}
})();