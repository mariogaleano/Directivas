/*globals angular*/
(function () {
	
    'use strict';
	
    angular
		.module('sc.directivas')
		.directive('soloLetras', scSoloLetras);

    var TEXT_REGEX = /^[a-zA-ZÑñÁáÉéÍíÓóÚú_ ]*$/;

    function scSoloLetras() {
		
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
		
        return directiva;

        function link(scope, elm, attrs, ngModel) {
			
            scope.$watch(attrs.ngModel, function (value) {
				
                ngModel.$setValidity('soloLetras', TEXT_REGEX.test(value));
				
            });
            //ngModel.$validators.soloLetras = function (valor) {
            //    return TEXT_REGEX.test(valor);
            //}
        }
    }
	
})();