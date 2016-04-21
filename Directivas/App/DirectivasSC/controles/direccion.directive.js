/*globals angular, _*/
(function () {
    'use strict';
    angular
		.module('scApp.common')
		.directive('scDireccion', scDireccion);

    scDireccion.$inject = ['$parse', '$templateCache', '$compile', 'TIPO_INPUT', 'APPROUTES'];

    function scDireccion($parse, $templateCache, $compile, TIPO_INPUT, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('direccion.html');

        var directive = {
            require: '^ngModel',
            controller: ['$scope', '$rootScope', '$element', 'paisesFactory', 'departamentosFactory', 'municipiosFactory', 'barriosFactory', 'commonFactory', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'dir',
            bindToController: {
                listaTipos: "=",
                value: "=ngModel",
                acceso: "@",//[modal,contenedor]
                id: "@",
                idTipo: "=",
                tipo: "@",//[contacto, razonsocial, referenciapersonal, cliente]
                requerido: "=?",
                label: "@"
            },
            scope: {},
        };

        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'direccion.html';
        }

        return directive;

        function Ctrl($scope, $rootScope, $element, paisesFactory, departamentosFactory, municipiosFactory, barriosFactory, commonFactory) {
            var dir = this;
            //var requerir = $parse(dir.requerido)();
            var modal = $element.parent();
            //evento que limpia campos de direccion
            var ListenerDatosGlobales = $rootScope.$on('nuevoContacto', limpiarPeticion);
            //para prevenir que se ejecute evento mas de una vez 
            $scope.$on('$destroy', ListenerDatosGlobales);

            dir.peticion = {};
            dir.tooltipVisible = false;
            dir.modalVisible = false;
            dir.valueInput = dir.value;
            dir.requerir = dir.requerido;

            dir.lugares = {
                paises: [],
                departamentos: [],
                municipios: [],
                barrios: []
            };
            
            $scope.$watch('requerido', function (mv) {
                var cond = (typeof mv === 'object' && mv.estadoActual);
                if (cond) {
                    dir.requerir = comprobarReglas();
                } else {
                    dir.requerir = dir.requerido;
                }
            });

            dir.consultarDatosDireccion = function () {
                //dir.consultarPaises();

                switch (dir.tipo.toLowerCase()) {
                    case 'contacto':
                        commonFactory.obtenerDireccionPorIdContacto(dir.idTipo, sincDatosDireccion);
                        break;
                    case 'cliente':
                        commonFactory.obtenerDireccionPorIdCliente(dir.idTipo, sincDatosDireccion);
                        break;
                    case 'razonsocial':
                        commonFactory.obtenerDireccionPorIdRazon(dir.idTipo, sincDatosDireccion);
                        break;
                    case 'referenciapersonal':
                        commonFactory.obtenerDireccionPorIdReferencia(dir.idTipo, sincDatosDireccion);
                        break;
                    case 'almacen':
                        commonFactory.obtenerDireccionPorIdAlmacen(dir.idTipo, sincDatosDireccion);
                        break;
                }
            };

            dir.ingresarDireccion = function () {
                dir.modalVisible = (dir.modalVisible) ? false : true ;
            };

            dir.consultarPaises = function () {
                dir.lugares.departamentos = null;
                dir.lugares.municipios = null;
                dir.lugares.barrios = null;
                paisesFactory.obtenerPaises(sincPaises);
            };


            dir.mostrarDepartamentos = function () {
                dir.lugares.municipios = null;
                dir.lugares.barrios = null;
                if (dir.peticion.PaisId) {
                    departamentosFactory.obtenerDepartamentoPorId(dir.peticion.PaisId, sincDepartamentos);
                }
            };

            dir.mostrarMunicipios = function () {
                dir.lugares.barrios = null;
                if (dir.peticion.DepartamentoId) {
                    municipiosFactory.obtenerMunicipiosPorIdDepartamento(dir.peticion.DepartamentoId, sincMunicipios);
                }
            };

            dir.mostrarBarrios = function () {
                if (dir.peticion.CiudadId) {
                    barriosFactory.obtenerBarriosPorIdCiudad(dir.peticion.CiudadId, sincBarrios);
                }
            };


            dir.generarCodPostal = function () {
                commonFactory.obtenerDireccionTransformada(dir.peticion.DireccionCompleta, sincDatosDireccionTransformada);

                var idciudad = dir.peticion.CiudadId;
                var iddep = dir.peticion.DepartamentoId;

                var ciudad = dir.lugares.municipios.filter(function (item) {
                    return item.CiudadId == idciudad;
                });

                var departamento = dir.lugares.departamentos.filter(function (item) {
                    return item.DepartamentoId == iddep;
                });

                //se genera codigo postal
                if (angular.isDefined(departamento[0]) && angular.isDefined(ciudad[0])) {

                    dir.peticion.CodigoPostal = departamento[0].CodDane + ciudad[0].CodDane;

                }
                dir.value = dir.peticion;
            };

            dir.cancelar = function () {
                var modal = angular.element('.modal');

                modal.on('hidden.bs.modal', function () {
                    dir.modalVisible = false;
                });
                dir.limpiarPeticion();
            };

            dir.limpiarPeticion = function () {
                dir.peticion = {};
                dir.lugares = {
                    paises: [],
                    departamentos: [],
                    municipios: [],
                    barrios: []
                };
            };
            
            function limpiarPeticion() {
                dir.limpiarPeticion();
            }
            
            function comprobarReglas() {
                var requerido = dir.requerido;
                var cond1 = (requerido.estadosValidar.indexOf(requerido.estadoActual) >= 0);

                return cond1;
            }

            function sincPaises(respuesta) {
                dir.lugares.paises = respuesta;
                var cond = dir.peticion.PaisId !== dir.direccion.PaisId;
                if(cond){
                    dir.peticion.DepartamentoId = undefined;
                }
                dir.mostrarDepartamentos();
            }

            function sincDepartamentos(respuesta) {
                dir.lugares.departamentos = respuesta;
                var cond = dir.peticion.DepartamentoId !== dir.direccion.DepartamentoId;
                if(cond){
                    dir.peticion.CiudadId = undefined;
                }
                dir.mostrarMunicipios();
            }

            function sincMunicipios(respuesta) {
                dir.lugares.municipios = respuesta;
                var cond = dir.peticion.CiudadId !== dir.direccion.CiudadId;
                if(cond){
                    dir.peticion.BarrioId = undefined;
                }
                dir.mostrarBarrios();
            }

            function sincBarrios(respuesta) {
                dir.lugares.barrios = respuesta;
            }
            
            function sincDatosDireccionTransformada(respuesta) {
                var barrio;
                var ciudad;
                if (dir.peticion.BarrioId) {
                    barrio = _.find(dir.lugares.barrios, function (elem) { return elem.BarrioId == dir.peticion.BarrioId; });
                }
                if (dir.peticion.CiudadId) {
                    ciudad = _.find(dir.lugares.municipios, function (elem) { return elem.CiudadId == dir.peticion.CiudadId; });
                }
                //verifica si la respuesta transformada llega con el barrio y la ciudad
                if (respuesta.toLowerCase().indexOf(barrio.Nombre.toLowerCase()) != -1 || respuesta.toLowerCase().indexOf(ciudad.Nombre.toLowerCase()) != -1) {

                    dir.peticion.DireccionCompleta = respuesta;
                } else {
                    //si no tiene el barrio y ciudad se ajusta direccion con estos datos 
                    dir.peticion.DireccionCompleta = respuesta + " " + barrio.Nombre + ", " + ciudad.Nombre;
                }
            }
            function sincDatosDireccion(respuesta) {
                dir.peticion = respuesta;
                dir.direccion = respuesta;
                dir.consultarPaises();
            }
            dir.mostrarError = function () {
                return true;
            };


        }

        function link(scope, elem) {

            var ctrl = scope.dir;
            var input = angular.element(elem.find('button.icon-credinetFont-01'));

            input.on('click', function () {
                //angular.element(directivaDireccionContacto).show();

                if (ctrl.value !== undefined) {
                    ctrl.consultarDatosDireccion();
                } else {
                    ctrl.limpiarPeticion();
                    ctrl.consultarPaises();
                }
            });
        }
    }
})();