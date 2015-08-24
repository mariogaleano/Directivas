(function () {
    'use strict';
    angular.module('sc.directivas').directive('scTexto', scTexto);

    scTexto.$inject = ['$window', '$compile', 'tipoInput'];
    function scTexto($window, $compile, tipoInput) {
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: ['$element', '$attrs', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vmt',
            bindToController: {
                value: '=ngModel',
                tipo: '@',//[texto,textonum,todo,moneda]
                id: "@",
                requerido: "=",
                label: '@'
            },
            scope: {},
            templateUrl: 'app/DirectivasSC/Templates/scTexto.html'
        };

        return directive;


        function Ctrl($element, $attrs) {
            var vmt = this;
            this.cancel = function (e) {
                if (e.keyCode == 27) {
                    //console.log("control val=" + JSON.stringify(this.control));
                    //console.log("control view val=" + JSON.stringify(this.control.$viewValue));
                    //console.log("control last commited val=" + JSON.stringify(this.control.$$lastCommittedViewValue));
                    //this.control.$$lastCommittedViewValue = this.control.$viewValue;
                    //this.control.$rollbackViewValue();
                }
            };
            this.mostrarError = function () {
                return true;
                //if (vmt.control.$invalid) {
                //}
                //else {
                //    return false;
                //}
            };


            ///este valor cambiara segun el tipo de error
            this.tooltip = "Valor Errado";
            this.tooltipclass = "errornegocio";

        }
        function link(scope, elm, attrs, controllers) {
            var ngModel = controllers[0];
            var ctrlpanel = controllers[1];
            var ctrl = scope.vmt;
            scope.$watch(ctrlpanel.control, function () {
                ctrl.control = ctrlpanel.control;
            });
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
                case tipoInput.moneda:
                    input.attr("solo-moneda", "number");
                    break;
                default:
                    break;
            }

            var x = angular.element(input);
            $compile(x)(scope);

        }
    }
})();