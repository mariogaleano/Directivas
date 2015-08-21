(function () {
    'use strict';

    angular.module('sc.directivas').directive('scPanel', scPanel);
    scPanel.$inject = ['$window', '$compile', '$timeout'];

    function scPanel($window, $compile, $timeout) {
        // Usage:
        //     <sc-panel></sc-panel>
        // Creates:
        // 
        var directive = {
            controller: panelCtrl,
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            scope: {
                control: '=',
                tamano: '=',
                tieneicono: '='
            },
            templateUrl: function (elem, attrs) {
                var size = attrs.tamano || '';
                return 'app/DirectivasSC/Templates/scPanel' + size + '.html';;
            }
        };
        return directive;

        function panelCtrl($scope) {
            var vm = this;
            ///este valor cambiara segun el tipo de error
            vm.tooltip = "Valor Errado";
            vm.tooltipclass = "errornegocio";
        }

        function link(scope, elm, attrs) {
            scope.$watch('tieneicono', function (newValue) {
                if (scope.tieneicono === true) {
                    elm.addClass('f-controlIconRight');
                }
            });
        }
    }

})();