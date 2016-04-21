/*globals angular*/
(function () {
    'use strict';
    angular
        .module('scApp.common')
        .directive('scDocumento', scDocumento);

    scDocumento.$inject = ['$templateCache', '$compile', '$sce', 'TIPO_INPUT', 'APPROUTES'];

    function scDocumento($templateCache, $compile, $sce, TIPO_INPUT, APPROUTES) {
        var vm = this;

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('documento.html');

        var directive = {
            require: '^ngModel',
            controller: ['$rootScope', '$element', 'tiposFactory', 'commonFactory', 'razonsocialLegalFactory', 'razonsocialDocumentoFactory', 'mensajesFactory', 'TIPOS_DOCUMENTOS', 'TEXTO_MENSAJES', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                listaTipos: "=",
                value: "=ngModel",
				precarga: "=",
                acceso: "@", //[modal,contenedor]
                accion: "@",
                modulo: "@",
                id: "=",
                idAlmacen: "=",
                idRazon: "=",
                tipo: "@", //[almacen, razonsocial]
                requerido: "=",
                label: "@"
            },
            scope: {},
        };

        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'documento.html';
        }

        return directive;

        function Ctrl($rootScope, $element, tiposFactory, commonFactory, razonsocialLegalFactory, razonsocialDocumentoFactory, mensajesFactory, TIPOS_DOCUMENTOS, TEXTO_MENSAJES) {
            var vm = this;
            var resources = APPROUTES.RESOURCES;
            var avisos = TEXTO_MENSAJES;
            var mensajes = mensajesFactory;


            vm.deshabilitarTiposDoc = vm.modulo === 'legales' ? true : false;
            vm.archivo = {};
            vm.tooltipVisible = false;
            vm.modalVisible = false;
            vm.valueInput = vm.value;
            vm.ctipoDocumentos = TIPOS_DOCUMENTOS;


            //vm.llenarCampos();
            vm.consultarDatosDocumento = function () {
                tiposFactory.obtenerTipos(resources.tiposDocumentosRazonSocial, sincTipoDocumentos);
            };

            vm.cancelar = function (form) {
                var preguntar = mensajes.confirmacion(avisos.CANCELAR.edicion);

                if (preguntar) {

                    form.$setPristine();
                    form.$setUntouched();
                    angular.element('.modal').modal('hide');
                }
            };

            vm.crearDocumentoAdjunto = function () {
				var opciones = {modulo: vm.modulo};
                //subir archivo a storage de azure
                commonFactory.subirArchivoEnAzure(opciones, vm.archivo, sincArchivo);
            };
			
            vm.limpiarDirectiva = function () {
                vm.archivo = {};
                vm.propiedades = {};
            };
            vm.llenarCampos = function () {
                vm.archivo = {};
                vm.archivo.file = 1;
                vm.archivo.Id = 1;
                vm.archivo.Descripcion = "sc";
            };

            vm.mostrarError = function () {
                return true;
            };

            vm.ingresarDocumento = function () {
                vm.modalVisible = true;
            };

            function sincDocumento(respuesta) {
                vm.value = respuesta;
				vm.precarga = $sce.trustAsResourceUrl(respuesta.RutaDocumento);
                console.log(respuesta);
                angular.element('.modal').modal('hide');
                //vm.archivo = {};

            }

            function sincTipoDocumentos(respuesta) {
                angular.element(formDocumento).scope().formDocumento.$setPristine();
                vm.tipoDocumentos = respuesta;
            }

            function sincArchivo(respuesta) {
                //captura ruta del archivo 
                vm.archivo.RutaDocumento = respuesta;
                //identificadores
                vm.archivo.AlmacenId = vm.idAlmacen;
                vm.archivo.RazonSocialId = vm.idRazon;
                delete vm.archivo.id;
                //guardar documento en bd
                razonsocialDocumentoFactory.guardarDocumento(vm.archivo, sincDocumento);
            }
        }

        function link(scope, elem) {
            var ctrl = scope.vm;
            //se captura boton de directiva para manejar los eventos
            var input = elem.find('.documento_formBtn');
			
//			scope.$watch( "vm.value", function  (vm) {
//				if(vm){
//					ctrl.precarga = $sce.trustAsResourceUrl(vm.RutaDocumento);
//				}
//				
//			});

            input.on('click', function () {
                //limpia campos de form
                ctrl.limpiarDirectiva();
                //carga combo tipo documentos
                ctrl.consultarDatosDocumento();
            });
        }
    }
})();