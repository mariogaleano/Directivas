/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('soloLetras', soloLetras);

    soloLetras.$inject = ['EVENTO_VALIDACION'];

    function soloLetras(EVENTO_VALIDACION) {

        var TEXT_REGEX = /^[a-zA-ZÑñÁáÉéÍíÓóÚú_ ]*$/;
        //        ^\s*[a-zA-Z,\s]+\s*$
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
                    ngModel.$setValidity('soloLetras', TEXT_REGEX.test(value));
                    panel.inputValidado = !TEXT_REGEX.test(value);
                }
            });
            //evento previene ingreso numerico en el campo de texto
            element.on("keypress", function (event) {
                var value = element.context.value;
                if (scope.tipo === 'texto') {
                    var char = String.fromCharCode(event.which)
                    if (!TEXT_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
            //evento previene pegar valores en campo
            element.on("paste", function (event) {
                var value = element.context.value;
                if (scope.tipo === 'texto') {
                    var char = String.fromCharCode(event.which)
                    if (!TEXT_REGEX.test(value + char)) {
                        event.preventDefault();

                    }
                }
            });
        }
    }
})();