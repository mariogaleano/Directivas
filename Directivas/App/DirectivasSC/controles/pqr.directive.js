/*globals angular*/
(function () {
    'use strict';
    angular
        .module('scApp.common')
        .directive('scPqr', scPqr);

    scPqr.$inject = ['$templateCache', '$compile', 'TIPO_INPUT', 'APPROUTES'];

    function scPqr($templateCache, $compile, TIPO_INPUT, APPROUTES) {
        var vm = this;

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('pqr.html');

        var directive = {
            require: '^ngModel',
            controller: ['$rootScope', '$element', 'tiposFactory', 'commonFactory', 'almacenPqrFactory', 'razonsocialPqrFactory', 'PARAMETROS_GENERALES', 'areaFactory', 'usuariosFactory', 'almacenesFactory', 'estadosFactory', 'parametrosFactory', 'mensajesFactory', 'TEXTO_MENSAJES', '$scope', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                listaTipos: "=",
                value: "=ngModel",
                acceso: "@", //[modal,contenedor]
                accion: "@",
                id: "=",
                esRazon: "=",
                idRazon: "=",
                nombreAlmacen: "=",
                idLinea: "=",
                deshabilitar: '=?', //
                tipo: "@", //[ instalacion,capacitacion]
                requerido: "=",
                label: "@"
            },
            scope: {},
        };

        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'pqr.html';
        }

        return directive;

        function Ctrl($rootScope, $element, tiposFactory, commonFactory, almacenPqrFactory, razonsocialPqrFactory, PARAMETROS_GENERALES, areaFactory, usuariosFactory, almacenesFactory, estadosFactory, parametrosFactory, mensajesFactory, TEXTO_MENSAJES, $scope) {
            var vm = this;
            vm.Colecciones = {};
            var resources = APPROUTES.RESOURCES;
            var parametros = PARAMETROS_GENERALES;
            var mensajes = mensajesFactory;
            var avisos = TEXTO_MENSAJES;
            //vm.valueInput = vm.value;

            vm.id = $element.attr("id");

            vm.disable = false;
            vm.peticion = {};
            vm.accionModal = true;

            vm.tooltipVisible = false;
            vm.modalVisible = false;
            vm.requiereDocumento = true;
            vm.consultarDatosPQR = function () {
                vm.modalVisible = true;

                almacenPqrFactory.obtenerTipoPqrs(sincDatosTiposPqr);
                estadosFactory.obtenerEstados(resources.estadosPqr, sincDatosEstadosPqr);
                almacenesFactory.obtenerAlmacenes(sincDatosAlmacenes);
                usuariosFactory.obtenerUsuarios(sincDatosUsuarios);

                areaFactory.obtenerAreas(sincDatosArea);
                if (vm.tipo == "instalacion") {
                    vm.tipoActual = parametros.PQRinstalacion;
                    parametrosFactory.obtenerParametros(sincDatosParametros);
                } else if (vm.tipo == "capacitacion") {
                    vm.tipoActual = parametros.PQRcapacitacion;
                    parametrosFactory.obtenerParametros(sincDatosParametros);
                }


            };

            vm.prueba = function () {
                vm.peticion.RutaPqr = 'prueba';
            };
            vm.cargarUsuarios = function (id) {
                //se filtra los usuarios por area 
                vm.Colecciones.UsuariosSc = vm.Colecciones.Usuarios.filter(function (elem) {
                    return elem.AreaId === id;
                });
            };
            vm.cancelar = function () {
                var preguntar = mensajes.confirmacion(avisos.CANCELAR.edicion);

                if (preguntar) {
                    vm.limpiarDirectiva();
                    //                    comercio.terminarEdicion();
                    var modal = angular.element('#contenedorPQR' + vm.id);
                    modal.modal('hide');
                    modal.on('hidden.bs.modal', function () {
                        console.log(arguments);
                        vm.modalVisible = false;
                    });
                }
            };

            vm.verificarDocumento = function (id) {
                var result = _.find(vm.Colecciones.TipoPqr, function (obj) {
                    return obj.TipoPqrId === id;
                });
                if (angular.isObject(result)) {
                vm.requiereDocumento = result.RequiereDocumento;
                }
                var fechaActual = new Date();

                Date.prototype.addDays = function (days) {
                    var dat = new Date(this.valueOf());
                    dat.setDate(dat.getDate() + days);
                    return dat;
                };
                vm.peticion.FechaCumplimiento = fechaActual.addDays(result.DiasServicio);
            }
            vm.crearPqr = function () {

                vm.peticion.UsuarioNombre = $rootScope.userInfo.userName;
                vm.peticion.AlmacenLineaCreditoId = vm.idLinea;
                vm.peticion.NombreAlmacen = vm.nombreAlmacen;
                vm.peticion.RazonSocialId = vm.idRazon;
                if (vm.esRazon) {
                    razonsocialPqrFactory.guardarPqr(vm.peticion, sincPqr);
                } else {
                    if (vm.tipo == "capacitacion") {
                        almacenPqrFactory.guardarPqrCapacitacion(vm.peticion, sincPqr);

                    } else {
                        almacenPqrFactory.guardarPqr(vm.peticion, sincPqr);
                    }
                }

            };
            vm.limpiarDirectiva = function () {
                vm.peticion = {};
            };

            function sincPqr(respuesta) {
                var comercio = vm.value;
                if (angular.isObject(respuesta)) {
                    //inserta respuesta en coleccion pqr
                    comercio.pqrsAlmacen.push(respuesta);
                    //ajusta coleccion con datos y formatos requieridos
                    comercio.prepararColeccionAlmacenPqr(comercio.pqrsAlmacen);
                }
                console.log("comercio", comercio);
                angular.element('.modal').modal('hide');

            }

            function sincDatosArea(respuesta) {
                vm.Colecciones.Areas = respuesta;

            }

            function sincDatosUsuarios(respuesta) {
                vm.Colecciones.Usuarios = respuesta;

            }

            function sincDatosTiposPqr(respuesta) {
                vm.Colecciones.TipoPqr = respuesta;

            }

            function sincDatosEstadosPqr(respuesta) {
                vm.Colecciones.EstadoPqr = respuesta;
                var todos = {
                    Id: -99,
                    Nombre: 'Todos'
                };
                vm.Colecciones.EstadoPqr.push(todos);

            }

            function sincDatosAlmacenes(respuesta) {
                vm.Colecciones.ListaAlmacenes = respuesta;

            }

            function sincDatosParametros(respuesta) {
                //busca id de la pqr de tipo PQRinstalacion
                var result = _.find(respuesta, function (obj) {
                    return obj.Nombre == vm.tipoActual
                });
                if (result) {
                    //setea campo con el identificador del tipoPQR
                    vm.peticion.TipoPqrId = parseInt(result.Valor);
                    vm.disable = true;
                }
            }
            function incluirDatos(obj1, obj2, comparador1, comparador2, nombreCampoObj1, nombreCampoObj2) {
                var incluir = {
                    comparador1: comparador1,
                    comparador2: comparador2,
                    claveNecesaria: nombreCampoObj1,
                    claveIncluir: nombreCampoObj2
                };
                return commonFactory.incluirDatos(obj1, obj2, incluir);
            }
            vm.mostrarError = function () {
                return true;
            };

            vm.ingresarPQR = function () {
                vm.modalVisible = true;
            };
        }

        function link(scope, elem) {
            var ctrl = scope.vm;
            var input = angular.element(elem.find('.amc_formBtn123'));

            input.on('load', function () { });

            input.on('click', function () {
                //ctrl.abrirModal = true;
                angular.element('#contenedorPQR' + ctrl.id).modal("show");
                ctrl.consultarDatosPQR();
                ctrl.limpiarDirectiva();
            });
        }
    }
})();