/*globals angular*/
(function () {

	'use strict';

	angular
		.module('scApp.common')
		.directive('soloLetrasEnteros', soloLetrasEnteros);
	
	soloLetrasEnteros.$inject = ['EVENTO_VALIDACION'];
	
	function soloLetrasEnteros( EVENTO_VALIDACION ) {

		var LETRASENTEROS_REGEX = /^[a-zA-Z0-9 _]*$/;
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
					ngModel.$setValidity('soloLetrasEnteros', LETRASENTEROS_REGEX.test(value));
					panel.inputValidado = !LETRASENTEROS_REGEX.test(value);
				}
			});
            
              //evento previene ingreso numerico en el campo de texto
            element.on("keypress", function (event) {
                var value = element.context.value;
                if (scope.tipo === 'textonum') {
                    var char = String.fromCharCode(event.which)
                    if (!LETRASENTEROS_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
            //evento previene pegar valores en campo
            element.on("paste", function (event) {
                var value = element.context.value;
                if (scope.tipo === 'textonum') {
                    var char = String.fromCharCode(event.which)
                    if (!LETRASENTEROS_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
		}
	}
})();