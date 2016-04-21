/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('soloFechas', soloFechas);

    soloFechas.$inject = ['$tooltip', '$filter', 'EVENTO_VALIDACION'];

    function soloFechas($tooltip, $filter, EVENTO_VALIDACION) {

        var FECHAS_REGEX = /^[a-zA-Z]{0,10}\s\d{0,2}(\sde|,)\s\d{4}$/;
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directiva;

        function link(scope, element, attrs, ngModel) {

            var valor;
            var panel = scope.$parent.$parent;

            scope.$watch('ngModel', function (mv) {
                valor = $filter('date')(mv, 'longDate');
                validarInput();
            });

            element.on(EVENTO_VALIDACION, function () {
                validarInput();
                ngModel.$setTouched();
            });

            function validarInput() {
                if (angular.isSet(valor)) {
                    if (scope.requerido) {
                        ngModel.$setValidity('soloFechas', FECHAS_REGEX.test(valor));
                    } else {
                        ngModel.$setValidity('soloFechas', true);
                    }
                    panel.inputValidado = !FECHAS_REGEX.test(valor);
                } else {
                    panel.inputValidado = false;
                }
            }
        }
    }
})();