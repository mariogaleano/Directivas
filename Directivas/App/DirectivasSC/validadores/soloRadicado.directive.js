/*globals angular*/
(function () {

	'use strict';

	angular
		.module('scApp.common')
		.directive('soloRadicado', soloRadicado);

	soloRadicado.$inject = ['EVENTO_VALIDACION'];
	
	function soloRadicado( EVENTO_VALIDACION ) {

		var RADICADO_REGEX = /^\d{2}\-\d{6}$/;
		var directiva = {
			require: 'ngModel',
			link: link,
			restrict: 'A'
		};

		return directiva;

		function link(scope, element, attrs, ngModel) {
			var panel = scope.$parent.$parent;
			
			element.on(EVENTO_VALIDACION, function () {
				var value = element.val();
				if (value !== undefined && value !== null) {
					ngModel.$setValidity('soloRadicado', RADICADO_REGEX.test(value));
					panel.inputValidado = !RADICADO_REGEX.test(value);
				}
			});
			
			element.on('input',function () {
				var value = element.val();
				formatearRadicado(value);
			});
			
			function formatearRadicado (valor) {
				if(valor.length > 2  && valor.search('-') < 0){
					var text = valor.split('');
					text.splice(2,0,'-');
					element.val(text.join(''));
				}
			}
		}
	}
})();