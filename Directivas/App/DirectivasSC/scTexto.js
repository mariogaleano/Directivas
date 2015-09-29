/*globals angular*/
(function () {
    'use strict';
    angular
		.module('sc.directivas')
		.directive('scTexto', scTexto);

    scTexto.$inject = ['$compile', 'tipoInput'];
    function scTexto($compile, tipoInput) {
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: ['$rootScope','$element', '$attrs', Ctrl],
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


        function Ctrl($rootScope, $element) {
            var vmt = this;
            this.cancel = function (e) {
                if (e.keyCode == 27) {
                    vmt.control.$$lastCommittedViewValue = vmt.control.$viewValue;
                    vmt.control.$rollbackViewValue();
                }
            };
			console.log($rootScope);
            vmt.tooltipVisible = false;
			
            vmt.tolltip = function () {
				var mensajeError;
                if (vmt.control.$invalid) {
					
                    var errores = vmt.control.$error;
					
                	mensajeError = (errores.required) ? "Valor Requerido" : '' ;
					
                    switch(true) {
						case errores.soloEnteros:
							mensajeError += (mensajeError != '' ) ? ' y ' : '';
                        	mensajeError += "Solo Numeros Permitidos";
							break;
						case errores.soloLetras: 
							mensajeError += (mensajeError != '' ) ? ' y ' : '';
                        	mensajeError += "Solo Letras Permitidos";
							break;
						case errores.soloLetrasEnteros:
							mensajeError += (mensajeError != '' ) ? ' y ' : '';
                        	mensajeError += "Solo Numeros y Letras Permitidos";
							break;
						case errores.soloMoneda:
							mensajeError += (mensajeError != '' ) ? ' y ' : '';
                        	mensajeError += "Solo Formato Moneda";
							break;
                    }
					
				}
                var input = $element.find(":input");
                input.popover({
                    content: mensajeError,
                    placement: 'top'
                });
                if (vmt.tooltipVisible) {
                    input.popover('destroy');
                    vmt.tooltipVisible = false;
                } else {
                    vmt.tooltipVisible = true;
                    input.popover('show');
                }
            };
            vmt.mostrarError = function () {
                return true;
            };


        }
        function link(scope, elm, attrs, controllers) {
			
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