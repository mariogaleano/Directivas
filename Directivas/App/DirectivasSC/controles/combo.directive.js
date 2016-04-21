/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('scCombo', scCombo);

    scCombo.$inject = ['$parse', '$tooltip', '$templateCache', 'TIPO_COMBO', 'INPUT_MENSAJES', 'APPROUTES'];

    function scCombo($parse, $tooltip, $templateCache, TIPO_COMBO, INPUT_MENSAJES, APPROUTES) {
        // Usage:
        //     <sc-combo></sc-combo>
        // Creates:
        // 
        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('combo.html');

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                id: '@', //identificador del campo
                tipo: '@', //[normal,multiple]
                label: '@', //String = Contiene el nombre para mostrar del campo
                lista: '=?', //Array = lista de opciones para el combo. 
                opcion: '@', //String = para definir cual sera el texto valor a mostrar en cada opcion 
                ngModel: '=ngModel',
                index: "=?",//orden de control
                iniciar: '=?', //String or Object = es string si el objeto devuelve una propiedad de la lista de lo contraario se unsa el objeto que hace referencia a la opcion que se seleccionara
                onselect: '&', //Function = Contiene la funcion de ejecucion para el cuando se lanze el evento "on-select" del elemento
                requerido: '=?', //Boolean = "true" si el campo es requerido false en el caso contrario
                deshabilitar: '=?', //
                valorRetorno: '@', //String = para definir cual sera el valor que se retornara al seleccionar un item				lista: '=',
            }
        };
        if (plantilla) {
            directive.template = $templateCache.get('combo.html');
        } else {
            directive.templateUrl = carpetaDirectivas + 'combo.html';
        }
        return directive;

        function link(scope, element) {
            //variables de entorno
            var cant,
                code,
                lista,
                errores,
                tooltip,
                sobreItem,
                selectPos,
                listaCombo,
                abrioLista,
                mensajeError;
            var inicia = angular.copy(scope.iniciar);
            var mensajes = INPUT_MENSAJES;
            var textoInicial = 'Seleccione...';
            var search = element.find('input');
            var teclas = {
                ARRIBA: 38,
                ABAJO: 40,
                ENTER: 13
            };

            scope.listaFiltrada = [];
            scope.buscar = false;
            scope.seleccion = textoInicial;
            scope.activar = new Array(scope.listaFiltrada.length);
            scope.requerir = scope.requerido;
            scope.bloquear = scope.deshabilitar;
            scope.ngModel = (scope.ngModel) ? scope.ngModel : inicia;
            //watchers
            scope.$watch('lista', function (mv) {
                scope.modelo = undefined;
                scope.seleccion = textoInicial;
                scope.iniciar =  (!isSet(scope.ngModel) && scope.iniciar) ? scope.iniciar : scope.ngModel ; 
                if (isSet(mv) && angular.isArray(mv)) {
                    scope.listaFiltrada = mv;
                    if (inicia && !isSet(scope.ngModel)) {
                        scope.reiniciarCombo();
                    } else {
                        scope.iniciarCombo();
                    }
                }
            });

            scope.$watch('ngModel', function (mv) {
                var cond1 = (isSet(mv)  || mv === null);
                var cond2 = (isSet(scope.ngModel) && (scope.listaFiltrada.length > 0) && !angular.isObject(mv));
                if (cond1) {
                    if (cond2) {
                        scope.iniciarCombo();
                    }
                    lanzarEventos();
                } else {
					//se comento para hacer que se reinicie el combo al cancelar un form - esperar caso
//                    if (!abrioLista) {
                        scope.reiniciarCombo();
//                    }
                }
            });

            scope.$watch('requerido', function (mv) {
                var cond = (isSet(mv) && typeof mv === 'object' && mv.estadoActual);
                if (cond) {
                    scope.requerir = comprobarReglas();
                } else {
                    scope.requerir = mv;
                }
            });

            scope.$watch('deshabilitar', function (mv) {
                scope.bloquear = mv;
            });

            //Eventos DOM
            search.on('focus', function () {
                if (!scope.deshabilitar) {
                    scope.abrirLista();
                    scope.buscar = true;
                }
            });

            scope.click = function () {
                search.focus();
            };

            scope.blur = function () {
                if (!sobreItem) {
                    scope.buscar = false;
                    if (scope.ngModel) {
                        scope.iniciarCombo();
                    }
                }
            };


            scope.accionesTeclas = function (e) {
                code = e.keyCode;

                lista = element.find('.lista-combo>a');
                cant = scope.listaFiltrada.length;
                
                switch (code) {
                    case teclas.ARRIBA:
                        selectPos = (!isSet(selectPos)) ? cant - 1 : (selectPos - 1);
                        activarSeleccion(selectPos);
                        break;
                    case teclas.ABAJO:
                        selectPos = (!isSet(selectPos)) ? 0 : selectPos + 1;
                        activarSeleccion(selectPos);
                        break;
                    case teclas.ENTER:
                        scope.eligiendo(selectPos, scope.listaFiltrada[selectPos]);
                        break;
                }
            };

            scope.eligiendo = function (index, elegido) {
                var cond1 = (angular.isDefined(elegido));
                if (cond1) {
                    scope.modelo = (isSet(elegido)) ? elegido[scope.opcion] : '';
                    scope.seleccion = (isSet(elegido)) ? elegido[scope.opcion] : textoInicial;
                    scope.ngModel = (isSet(scope.valorRetorno)) ? elegido[scope.valorRetorno] : elegido;
                }
                if (scope.buscar) {
                    activarSeleccion(index);
                    search.focus();
                    scope.buscar = false;
                }
            };

            scope.iniciarCombo = function () {
                if (!selectPos && isSet(scope.ngModel) && !angular.isObject(scope.ngModel)) {
                    var item = buscarItem();
                    if (isSet(item) && isSet(item.elegido)) {
                        scope.eligiendo(item.index, item.elegido);
                    } else {
                        if (!isSet(scope.ngModel)) {
                            scope.seleccion = textoInicial;
                        }
                    }
                    comprobarReglas();
                }
            };

            scope.reiniciarCombo = function () {
                if (!inicia) {
                    scope.modelo = null;
                    scope.ngModel = null;
                    selectPos = undefined;
                    scope.seleccion = textoInicial;
                } else {
                    scope.ngModel = inicia;
                }
            };

            scope.tooltip = function () {
                var input = element.find('input');
                if (!isSet(scope.modelo)) {
                    errores = {
                        required: scope.requerido(),
                    };
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
                        trigger: 'focus'
                    });
                    if (!tooltip.$scope.$isShown) {
                        tooltip.$scope.$show();
                    }
                } else {
                    tooltip.$scope.$toggle();
                }
            };

            scope.filtrarLista = function () {
                var accionesNav = [];
                for(var i in teclas){accionesNav.push(teclas[i]);}
                
                if(accionesNav.indexOf(code) < 0){
                    var search = element.find('input');
                    var val = search.val();

                    scope.listaFiltrada = scope.lista.filter(function (item) {
                        return (item[scope.opcion].toLowerCase().search(val) >= 0);
                    });
                    if (scope.listaFiltrada.length <= 0) {
                        scope.listaFiltrada = scope.lista;
                        limpiarTexto();
                    }
                    if (scope.listaFiltrada.length > 0 && val !== '') {
                        estiloTexto(val);
                    } else {
                        limpiarTexto();
                    }
                }
            };

            scope.abrirLista = function () {
                abrioLista = true;
                search = element.find('input');
                listaCombo = element.find(".lista-combo");
                listaCombo.css('width', search.css('width'));
                listaCombo.on({
                    mouseenter: function () {
                        sobreItem = true;
                    },
                    mouseleave: function () {
                        sobreItem = false;
                    }
                });
            };
            function comprobarReglas() {
                var cond1 = false;
                if (scope.requerido) {
                    var requerido = scope.requerido;
                    if (angular.isSet(requerido.estadosValidar) && angular.isArray(requerido.estadosValidar)) {
                        cond1 = (requerido.estadosValidar.indexOf(requerido.estadoActual) >= 0);
                    }

                    return cond1;
                }
            }

            function lanzarEventos() {
                if (scope.onselect) {
                    scope.onselect();
                }
            }

            function buscarItem() {

                var indexInicio;
                var elegidoInicio;
                var buscado = (angular.isNumber(scope.ngModel)) ? parseInt(scope.ngModel) : scope.ngModel;

                if (buscado) {
                    angular.forEach(scope.listaFiltrada, function (item, index) {
                        var cond1 = (!angular.isObject(buscado)) ? (buscado === item[scope.valorRetorno]) : (buscado[scope.valorRetorno] === item[scope.valorRetorno]);
                        if (cond1) {
                            indexInicio = index;
                            elegidoInicio = item;
                        }
                    });
                    return {
                        index: indexInicio,
                        elegido: elegidoInicio
                    };
                }
            }

            function activarSeleccion(index) {
                selectPos = index;
                lista = element.find('.lista-combo>a');
                if (angular.isDefined(cant)) {
                    if (selectPos >= cant) {
                        selectPos = 0;
                    }
                    if (selectPos < 0) {
                        selectPos = (cant - 1);
                    }
                }
                scope.activar = new Array(lista.length);
                scope.activar[selectPos] = 'active';
            }

            function estiloTexto(val) {
                limpiarTexto();
                lista = element.find('.lista-combo>a');
                angular.forEach(lista, function (item) {
                    var element = angular.element(item);
                    var texto = element.text().toLowerCase();
                    var textoPos = texto.indexOf(val);
                    var ntexto = texto.replace(val, '<strong>' + val + '</strong>');

                    if (textoPos >= 0) {
                        element.html(ntexto);
                    }
                });
                activarSeleccion(0);
            }

            function limpiarTexto() {
                lista = element.find('.lista-combo>a');
                angular.forEach(lista, function (item) {
                    var element = angular.element(item);
                    var texto = element.text();
                    var nTexto = texto;
                    element.html(nTexto);
                });
                scope.activar[0] = '';
            }
//            function estaEnLista () {
//                var modelEsta = false;
//                for(var i in scope.listaFiltrada){
//                    var item = scope.listaFiltrada[0];
//                    var propieadades = Object.keys(item);
//                    
//                    if(item[propieadades[0]] && angular.isObject(scope.ngModel) && scope.ngModel[]){
//                        scope.ngModel
//                    }
//                }
//            }
            function isSet(variable) {
                return (variable !== undefined && variable !== null && variable !== '')
            }
        }
    }

})();