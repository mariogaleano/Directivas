(function () {
    'use strict';

    angular.module('sc.directivas').directive('scCombo', scCombo);
    scCombo.$inject = ['$window', '$compile', 'tipoCombo'];
    function scCombo($window, $compile, tipoCombo) {
        // Usage:
        //     <sc-combo></sc-combo>
        // Creates:
        // 
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: ['$element', '$attrs', Ctrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vmt',
            bindToController: {
                value: '=ngModel',
                tipo: '@',//[normal,multiple]
                id: "@",
                requerido: "=",
                label: '@',
                opciones: '=',
                mostrar: '@'
            },
            scope: {},
            templateUrl: 'app/DirectivasSC/Templates/scCombo.html'
        };
        return directive;

        function Ctrl($element, $attrs) {
            var vmt = this;
        }

        function link(scope, elm, attrs, controllers) {
            var ngModel = controllers[0];
            var ctrlpanel = controllers[1];
            var ctrl = scope.vmt;
            scope.$watch(ctrlpanel.control, function () {
                ctrl.control = ctrlpanel.control;
            });
            var input = elm.find(":input");
            if (attrs.tipo === tipoCombo.multiple) {
                input.attr('multiple','multiple');
            }
            var x = angular.element(input);
            $compile(x)(scope);
        }
    }

})();