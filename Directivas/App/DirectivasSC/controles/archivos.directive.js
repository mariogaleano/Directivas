/*globals angular, FormData, FileReader, document*/
(function () {
    'use strict';
    angular
        .module('scApp.common')
        .directive('scArchivo', scArchivo);

    scArchivo.$inject = ['$templateCache', '$sce', 'commonFactory', 'APPROUTES'];
    /**
    * scArchivo: directiva para el manejo de diferentes tipos de archivos.
	* Uso: <sc-archivo ng-model="" prop="" tipo="" aceptar="" id="" label="" requerido=""></sc-archivo>
	* Atributos: 
	*     ng-model: {Object} requerido siempre y equivale a la variable que almacena o proporciona el dato de archivo
	*     prop: {Object} Corresponde a las propiedades que posee el archivo que se cargara.
	*     id: {String} Nombre identificador de la directiva
	*	  label: {String} Nombre visible del campo
	*	  requerido: {Boolean} Define si el campo es necesario en la validacion del formulario. 
	*	  		 
    * @public
    * @method scArchivo
    * @Dependency {Object} $templateCache: dependencia nativa de angular con la cual se genera cahce de plantillas
    * @Dependency {Object} APPROUTES: Contiene el lista de las rutas disponibles en la aplicacion
    * @return {Object} La definicion y funcinalidad de la directiva.
    */
    function scArchivo($templateCache, $sce, commonFactory, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('archivos.html');

        var directive = {
            require: '^ngModel',
            controller: ['$element', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                id: '@',//Identificador del input 
                value: '=ngModel',// devuelve los datos del archivo el input de la diretive
                tipo: '@', //[normal, multiple]
                aceptar: '@',//Para Hacer: Describe que tipos de formato debe aceptar el input
                prop: '=',//Devuelve las propiedades del archivo que se carga
                loaded: '=', //indicador de cuando el archivo se carga por completo, (cuando se obtiene desde el equipo)
                requerido: '=',// Define el tipo de prioridad del archivo y enciendo la validacion para evitar que este input este vacio
                label: '@',//Nombre visual del Campo
				blob: '=',
				alCargar:'&',//callback: Funcion que se ejecuta cuando el archivo se ha cargado y subido al Storage
            },
            scope: {
				nombreArchivo: '=',//Se utiliza para cambiar el nombre del archivo
				modulo: '@',//Nombre de la carpeta donde debera guardarse el archivo en el storage de azure
				accion:'=',//['subir'] Controla la opcion de subir la imagen inmediatamente que se obtiene desde el equipo
			},
        };
        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'archivos.html';
        }
        return directive;


        function Ctrl($element) {
            var vm = this;
            var input = $element.find(":input");
            vm.tooltipVisible = false;

            vm.tolltip = function () {
                var mensajeError;
                if (vm.control.$invalid) {

                    var errores = vm.control.$error;

                    mensajeError = (errores.required) ? "Valor Requerido" : '';

                    switch (true) {
                    case errores.soloNit:
                        mensajeError += (mensajeError !== '') ? ' y ' : '';
                        mensajeError += "No es un archivo valido";
                        break;
                    }

                }

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

        function link(scope, element) {
			
            var input = element.find(':input');
            var number = element.find('.number');
            var ctrl = scope.vm;
			var permitirSubir = false;
			var reader = new FileReader();
			var formData = new FormData();
			
			scope.$watch('accion', function (mv) {
				var opciones = {
					modulo: scope.modulo, 
					nombreArchivo: scope.nombreArchivo
				};
				if(mv === 'subir' && permitirSubir){
					commonFactory.subirArchivoEnAzure(opciones, {file: ctrl.value}, sincArchivo);
				}
			});
			scope.$watch('vm.value', function (mv) {
				if(!angular.isSet(mv)){
					input.val('');
					number.text('');
				}
			});
			//subir archivo a storage de azure
            element.on('change', function (e) {
				input = e.target;
                var archivos = input.files;
				formData = new FormData();
                //se crea formdata y se inserta archivo
                input = angular.element(e.target);
				//se agrega el archivo a un objeto formulario multi-type
                formData.append("file", archivos[0]);
				
                //asignacion de arhivo para previsualizarlo
                reader.onload = function () {
					ctrl.blob = reader.result;
					permitirSubir = true;
					scope.accion = '';
					scope.$apply();
                };
                reader.readAsDataURL(archivos[0]);
				
                if (archivos.length > 0) {
                    number.text(archivos.length);
                } else {
                    number.text('');
                }
				
                ctrl.loaded = false;
                ctrl.prop = archivos[0];
                ctrl.value = formData;
				scope.$apply();
				
            });
			//callback
			function sincArchivo (respuesta) {
				ctrl.value = respuesta;
				scope.accion = '';
			}
			//funciones varias
        }
    }
})();