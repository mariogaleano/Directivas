/*globals angular*/
(function () {

    'use strict';

    angular
		.module('scApp.common')
		.directive('soloDecimales', soloDecimales);

    soloDecimales.$inject = ['EVENTO_VALIDACION'];

    function soloDecimales(EVENTO_VALIDACION) {

//        var DECIMAL_REGEX = /^\D?\s*\d*([,.]?\d{3})*[,.]\d/;
        var DECIMAL_REGEX = /^(([0-9]{1,})?)(\.|\.[0-9]{1,})?$/;
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
                    ngModel.$setValidity('soloDecimales', DECIMAL_REGEX.test(value));
                    panel.inputValidado = !DECIMAL_REGEX.test(value);
                }
            });
            element.on("keypress", function (event) {
                //                value = element.val();
                var value = element.context.value;

                if (scope.tipo === 'decimal') {
                    var char = String.fromCharCode(event.which);
                    if (!DECIMAL_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
            element.on("paste", function (event) {
                //                value = element.val();
                var value = element.context.value;
                if (scope.tipo === 'num') {
                    var char = String.fromCharCode(event.which);
                    if (!DECIMAL_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
        }
    }
})();