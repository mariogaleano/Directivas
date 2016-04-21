/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('soloEnteros', scSoloEnteros);

    scSoloEnteros.$inject = ['EVENTO_VALIDACION'];

    function scSoloEnteros(EVENTO_VALIDACION) {

        var NUMBERS_REGEX = /^[0-9]*$/;
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directiva;

        function link(scope, element, attrs, ngModel) {

            var panel = scope.$parent.$parent;

            scope.$watch(attrs.ngModel, function (mv) {
                if (angular.isSet(mv)) {
                    validacion(mv);
                }
            });

            element.on(EVENTO_VALIDACION, function () {
                validacion(ngModel.$viewValue);
            });
            element.on("keypress", function (event) {
                //                value = element.val();
                var value = element.context.value;

                if (scope.tipo === 'num') {
                    var char = String.fromCharCode(event.which);
                    if (!NUMBERS_REGEX.test(value + char)) {

                        validacion();
                        event.preventDefault();

                    }
                }
            });
            element.on("paste", function (event) {
                //                value = element.val();
                var value = element.context.value;
                if (scope.tipo === 'num') {
                    var char = String.fromCharCode(event.which);
                    if (!NUMBERS_REGEX.test(value + char)) {

                        validacion();
                        event.preventDefault();

                    }
                }
            });

            function validacion(value) {
                var cond = (angular.isSet(value) || scope.requerido);
                var cond2 = (attrs.maxlength && value) ? (value.length > attrs.ngMaxlength) : false;
                //				var cond3 = (ngModel.$touched);
                //se quito  "&& cond3"
                if (cond) {
                    ngModel.$setValidity('soloEnteros', NUMBERS_REGEX.test(value));
                    panel.inputValidado = (attrs.maxlength) ? (NUMBERS_REGEX.test(value) && cond2) : !NUMBERS_REGEX.test(value);
                }
            }

        }

    }
})();