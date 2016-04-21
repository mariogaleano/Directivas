/*globals angular*/
(function () {
    'use strict';

    angular.module("scApp.common")
		   .directive("scFecha", scFecha);

    scFecha.$inject = ['$parse', '$tooltip', '$templateCache', '$filter', '$compile', 'APPROUTES' ,'INPUT_MENSAJES'];

    function scFecha($parse, $tooltip, $templateCache, $filter, $compile, APPROUTES ,INPUT_MENSAJES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('fecha.html');

        var directive = {
			require:'^ngModel',
            restrict: 'E',
            link: link,
            scope: {
                id: '@',
                tipo: '@', //[basico, rango]
                fechaMinima: '=',//[hoy, fecha] 
                label: '@',
                index: "=?",
                ngModel: '=',
                deshabilitar: '=?',
                requerido: '=?',
                porDefecto: '=?'
            }
        };
        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'fecha.html';
        }
        return directive;

        function link(scope, element) {
            //variables de entorno
            var panel;
			var tooltip;
			var errores;
            var mensajeError;
			var mensajes = INPUT_MENSAJES;
            var input1 = element.find('input:first');
            var input = input1;
			var requerido = scope.requerido;
            //variables bindeo
			
            scope.classTipo = (scope.tipo === 'rango') ? 'f-control50' : '';
            scope.fechaMaxima = "2020-05-22";
			scope.requerir = (requerido) ? requerido : scope.requerir ;
			
            //funciones de vindeo			
            scope.$watch('ngModel', function (mv) {
				if (mv) {
					if (angular.isObject(mv) && scope.tipo === 'rango') {
						scope.desde = scope.ngModel.desde;//$translate(adicionarDia(scope.ngModel.desde));
						scope.hasta = scope.ngModel.hasta;//$translate(adicionarDia(scope.ngModel.hasta));
					} else {
						scope.desde = $filter('date')(mv, 'longDate');
					}
				}else{
					scope.desde = '';
					scope.hasta = '';
				}
            });
			
			scope.$watch('requerido', function (mv) {
				var cond = (typeof mv === 'object' && mv.estadoActual);
				if(cond){
					scope.requerir = comprobarReglas();
				}else{
					scope.requerir = scope.requerido ;
				}
            });
			
			input.on('blur',function () {
				scope.control = scope.$parent.$parent.control;
				if(scope.tipo === 'rango'){
					scope.ngModel.desde = scope.desde;//$translate(adicionarDia(scope.ngModel.desde));
					scope.ngModel.hasta = scope.hasta;//$translate(adicionarDia(scope.ngModel.hasta));
				}else{
					scope.ngModel = scope.desde;	
				}
			});
			
			scope.tooltip = function () {
				
				var input = element.find('input:first');
				panel = scope.$parent.$parent;
				scope.control = panel.control;
				
                if(scope.control.$invalid) {
                    errores = scope.control.$error;
					mensajeError = '';
					
					angular.forEach(errores, function (item, index) {
						mensajeError = mensajes[index];
					});
                }
				
				if(!tooltip){
					tooltip = $tooltip(input, {
							title: mensajeError,
							html: true,
							placement:'top',
							trigger:'manual'
						});
					if(!tooltip.$scope.$isShown){
						tooltip.$scope.$show();
					}
				}else{
					tooltip.$scope.$toggle();
				}
            };
			
			function comprobarReglas () {
				var cond1 = false;
				var requerido = scope.requerido;
				if(angular.isSet(requerido.estadosValidar) && angular.isArray(requerido.estadosValidar)){
					cond1 = (requerido.estadosValidar.indexOf(requerido.estadoActual) >= 0);
				}
				
				return cond1;
			}

        }


    }
})();