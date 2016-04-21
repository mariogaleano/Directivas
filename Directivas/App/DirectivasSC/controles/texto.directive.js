/*globals angular*/
(function () {
    'use strict';
    angular
        .module('scApp.common')
        .directive('scTexto', scTexto);

    scTexto.$inject = ['$parse', '$tooltip', '$templateCache', '$compile', 'TIPO_INPUT', 'INPUT_MENSAJES', 'APPROUTES'];

    function scTexto($parse, $tooltip, $templateCache, $compile, TIPO_INPUT, INPUT_MENSAJES, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('texto.html');
        var directive = {
            require: '^ngModel',
            link: link,
            restrict: 'E',
            scope: {
                id: "@",
                tipo: '@', //[texto,textonum,todo,moneda,num,decimal,radicado,porcentaje,correoE]
                maximo: '@',
                value: '=ngModel',
                label: '@',
                requerido: "=?",
                index: "=?",
                deshabilitar: '=?',
                eventoBlur: "&"
            },
        };

        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'texto.html';
        }

        return directive;

        function link(scope, element, attrs) {
            //ambitos de variable
            var panel;
            var mensajeError;
            var tooltip;
            var errores;
            var input = element.find(":input");
            var mensajes = INPUT_MENSAJES;
            //var requerido = ($parse(scope.requerido)());
            //var requerido = scope.requerido;
            //variables de bindeo 
            scope.tooltipVisible = false;
            scope.validado = false;
            scope.requerir = scope.requerido;
            scope.bloquear = scope.deshabilitar;

            //inicializacion de funciones
            incluirValidador();

            //funciones binding
            scope.$watch('deshabilitar', function (mv) {
                scope.bloquear = mv;
            });


            scope.$watch('requerido', function (mv) {
                var cond = (angular.isSet(mv) && typeof mv === 'object' && mv.estadoActual);
                if (cond) {
                    scope.requerir = comprobarReglas();
                } else {
                    scope.requerir = mv;
                }
            });

            //funcionalidades generales de bindeo
            scope.tooltip = function () {
                panel = scope.$parent.$parent;
                scope.control = panel.control;

                if (scope.control.$invalid) {

                    errores = scope.control.$error;
                    mensajeError = '';

                    angular.forEach(errores, function (item, index) {
                        mensajeError = mensajes[index];
                    });
                }
                if (!tooltip) {
                    tooltip = $tooltip(input, {
                        title: mensajeError,
                        html: true,
                        placement: 'top',
                        trigger: 'manual'
                    });
                    if (!tooltip.$scope.$isShown) {
                        tooltip.$scope.$show();
                    }
                } else {
                    tooltip.$scope.$toggle();
                }
            };
            //funciones varias
            function comprobarReglas() {
                var cond1 = false;
                var requerido = scope.requerido;
                if (angular.isSet(requerido.estadosValidar) && angular.isArray(requerido.estadosValidar)) {
                    cond1 = (requerido.estadosValidar.indexOf(requerido.estadoActual) >= 0);
                }

                return cond1;
            }

            function incluirValidador() {
                input = angular.element(input);

                input.attr(TIPO_INPUT[attrs.tipo], "");

                if (TIPO_INPUT.moneda == TIPO_INPUT[attrs.tipo]) {
                    var simbolo = '<span class="icn-moneda">' + attrs.simbolo + '</span>';
                    input.prepend(simbolo);
                }

                input.on('blur', function () {
                    scope.eventoBlur();
                    scope.value = scope.value.trim();
                    if (tooltip) {
                        tooltip.$scope.$hide();
                    }
                });

                $compile(input)(scope);
            }
        }
    }
})();