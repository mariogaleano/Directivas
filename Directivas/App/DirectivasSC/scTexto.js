/*globals angular*/
(function () {
    'use strict';
    angular
		.module('scApp.common')
		.directive('scTexto', scTexto);

    scTexto.$inject = ['$compile', 'tipoInput', 'APPROUTES'];
    function scTexto($compile, tipoInput, APPROUTES) {

        var appFolder = APPROUTES.APP_FOLDER.directivesTemplates

        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: ['$rootScope', '$element', '$attrs', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                value: '=ngModel',
                tipo: '@',//[texto, textonum, todo, moneda, num]
                id: "@",
                requerido: "=",
                label: '@'
            },
            scope: {},
            templateUrl: appFolder + '/texto.html'
        };

        return directive;


        function Ctrl($rootScope, $element) {
            var vm = this;
            vm.cancel = function (e) {
                if (e.keyCode == 27) {
                    vm.control.$$lastCommittedViewValue = vm.control.$viewValue;
                    vm.control.$rollbackViewValue();
                }
            };
            vm.tooltipVisible = false;

            vm.tolltip = function () {
                var mensajeError;
                if (vm.control.$invalid) {

                    var errores = vm.control.$error;

                    mensajeError = (errores.required) ? "Valor Requerido" : '';

                    switch (true) {
                        case errores.soloEnteros:
                            mensajeError += (mensajeError !== '') ? ' y ' : '';
                            mensajeError += "Solo Numeros Permitidos";
                            break;
                        case errores.soloLetras:
                            mensajeError += (mensajeError !== '') ? ' y ' : '';
                            mensajeError += "Solo Letras Permitidos";
                            break;
                        case errores.soloLetrasEnteros:
                            mensajeError += (mensajeError !== '') ? ' y ' : '';
                            mensajeError += "Solo Numeros y Letras Permitidos";
                            break;
                        case errores.soloMoneda:
                            mensajeError += (mensajeError !== '') ? ' y ' : '';
                            mensajeError += "Solo Formato Moneda";
                            break;
                        case errores.soloNit:
                            mensajeError += (mensajeError !== '') ? ' y ' : '';
                            mensajeError += "No es un numero valido";
                            break;
                    }

                }
                var input = $element.find(":input");
                input.popover({
                    content: mensajeError,
                    placement: 'top'
                });
                if (vm.tooltipVisible) {
                    input.popover('destroy');
                    vm.tooltipVisible = false;
                } else {
                    vm.tooltipVisible = true;
                    input.popover('show');
                }
            };
            vm.mostrarError = function () {
                return true;
            };


        }

        function link(scope, elm, attrs, controllers) {

            var ctrlpanel = controllers[1];
            var ctrl = scope.vm;

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
                case tipoInput.nit:
                    input.attr("solo-nit", "");
                    break;
                case tipoInput.moneda:
                    var simbolo = '<span class="icn-moneda">' + attrs.simbolo + '</span>';
                    input.attr("solo-moneda", "number");
                    input.parent().prepend(simbolo);
                    break;
            }

            var x = angular.element(input);
            $compile(x)(scope);

        }
    }
})();