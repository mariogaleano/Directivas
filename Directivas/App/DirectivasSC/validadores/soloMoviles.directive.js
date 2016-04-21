/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('soloMovil', soloMovil);

    soloMovil.$inject = ['EVENTO_VALIDACION'];

    function soloMovil(EVENTO_VALIDACION) {

        var MOVIL_REGEX = /^\d{3}[\s]?\d{3}[\s]?\d{2}[\s]?\d{2}$/;
        var NUMEROS_REGEX = /^([0-9]\d*-\d+|[0-9]{1,10})$/;

        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directiva;

        function link(scope, element, attrs, ngModel) {

            var panel = scope.$parent.$parent;

            scope.$watch(attrs.ngModel, function (mv) {
                validarTelefono(mv);
            });

            element.on(EVENTO_VALIDACION, function () {
                validarTelefono(ngModel.$viewValue);
            });
            element.on("keypress", function (event) {
                //                value = element.val();
                var value = element.context.value;

                if (scope.tipo === 'movil') {
                    var char = String.fromCharCode(event.which);
                    if (!NUMEROS_REGEX.test(value + char)) {

                        event.preventDefault();

                    }
                }
            });
            element.on("paste", function (event) {
                //                value = element.val();
                var value = element.context.value;
                if (scope.tipo === 'movil') {
                    var char = String.fromCharCode(event.which);
                    if (!NUMEROS_REGEX.test(value + char)) {

                        event.preventDefault();

                    }
                }
            });

            function validarTelefono(value) {

                var cond = (angular.isSet(value) || (angular.isSet(value) && scope.requerido) || (!angular.isSet(value) && scope.requerido));

                if (cond) {
                    if (value) {
                        ngModel.$setValidity('soloTelefono', MOVIL_REGEX.test(value));
                        panel.inputValidado = !MOVIL_REGEX.test(value);
                        ngModel.$viewValue = formatearDato(value);
                    }
                }
            }

            function formatearDato(dato) {

                var cond;
                var index;
                var nuevoValor = '';
                var valor = (dato.search(/\s/) >= 0) ? dato.replace(/\s/g, '').split('') : dato.split('');
                var numeroCaracteres = valor.length;

                if (numeroCaracteres === 10) {
                    for (var i in valor) {
                        index = parseInt(i);
                        cond = (index === 2 || index === 5 || index === 7);
                        nuevoValor += (cond) ? valor[i] + ' ' : valor[i];
                    }
                } else {
                    nuevoValor = dato;
                }

                return nuevoValor;
            }

        }
    }
})();