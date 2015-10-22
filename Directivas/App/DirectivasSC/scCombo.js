/*globals angular*/
(function () {

    'use strict';

    angular
		.module('scApp.common')
		.directive('scCombo', scCombo);

    scCombo.$inject = ['$compile', 'tipoCombo', 'APPROUTES'];

    function scCombo($compile, tipoCombo, APPROUTES) {
        // Usage:
        //     <sc-combo></sc-combo>
        // Creates:
        // 
        var appFolder = APPROUTES.APP_FOLDER.directivesTemplates

        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: ['$element', '$attrs', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                value: '=ngModel',
                tipo: '@',//[normal,multiple]
                id: "@", //identificador del campo
                requerido: "=",//Boolean = "true" si el campo es requerido false en el caso contrario
                disabled: "=",//Boolean
                label: '@', //String = Contiene el nombre para mostrar del campo
                lista: '=',//Array = lista de opciones para el combo. 
                opcion: '@',//String = para definir cual sera el texto valor a mostrar en cada opcion 
                valorRetorno: '@', //String = para definir cual sera el valor que se retornara al seleccionar un item				lista: '=',
                onselect: '&' //Function = Contiene la funcion de ejecucion para el cuando se lanze el evento "on-select" del elemento
            },
            scope: {},
            templateUrl: appFolder + '/Combo.html'
        };
        return directive;

        function Ctrl() {
            var vm = this;
        }

        function link(scope, elm, attrs, controllers) {

            var ctrlpanel = controllers[1];
            var ctrl = scope.vm;

            scope.$watch(ctrlpanel.control, function () {
                ctrl.control = ctrlpanel.control;
            });

            var input = elm.find(":input");

            if (attrs.tipo === tipoCombo.multiple) {
                input.attr('multiple', 'multiple');
            }

            var x = angular.element(input);

            $compile(x)(scope);
        }
    }

})();