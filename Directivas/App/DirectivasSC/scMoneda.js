(function () {
    'use strict';

    angular.module('sc.directivas').directive('scMoneda', scMoneda);

    scMoneda.$inject = ['$window', '$compile'];

    function scMoneda($window, $compile) {
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: Ctrl,
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                value: '=ngModel',
                id: "@",
                requerido: "="
            },
            templateUrl: 'app/DirectivasSC/Templates/scMoneda.html'
        };
        Ctrl.$inject = ['$scope'];
        return directive;

        function Ctrl($scope) {
            var vm = this;

            ///este valor cambiara segun el tipo de error
            vm.tooltip = "Valor Errado";
            vm.tooltipclass = "errornegocio";
        }

        function link(scope, elem, attrs, controllers) {
            var ngModel = controllers[0];
            var ctrlpanel = controllers[1];
            scope.$watch(ctrlpanel.control, function () {
                scope.control = ctrlpanel.control;
            });
        }
    }
})();