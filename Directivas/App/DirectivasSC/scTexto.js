(function () {
    'use strict';
    angular.module('sc.directivas').directive('scTexto', scTexto);

    scTexto.$inject = ['$window', '$compile', 'tipoInput'];
    function scTexto($window, $compile, tipoInput) {
        var directive = {
            require: ['ngModel'],
            link: link,
            restrict: 'E',
            scope: {
                value: '=ngModel',
                tipo: '@',//[texto,textonum,todo]
                id: "@",
                requerido: "="
            },
            templateUrl: 'app/DirectivasSC/Templates/scTexto.html'
        };
        return directive;

        function link(scope, elm, attrs, ngModel) {

            var input = elm.find(":input");

            switch (attrs.tipo) {
                case tipoInput.todo:
                    break;
                case tipoInput.texto:
                    input.attr("solo-letras", "");
                    break;
                case tipoInput.textonum:
                    input.attr("solo-letras-enteros", "");
                    break;
                case tipoInput.num:
                    input.attr("solo-enteros", "");
                    break;
                default:
                    break;
            }

            var x = angular.element(input);
            $compile(x)(scope);

        }
    }
})();