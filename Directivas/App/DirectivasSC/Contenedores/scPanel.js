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
            controllerAs: 'vm',
            bindToController: true,
            restrict: 'E',
            transclude: true,
            scope: {
                control: '='
            },
            templateUrl: 'app/DirectivasSC/Templates/scPanel.html'
        };
        return directive;

        function panelCtrl($scope) {
            ///este valor cambiara segun el tipo de error
            this.tooltip = "Valor Errado";
            this.tooltipclass = "errornegocio";                   
        }

        function link($scope, elm, attrs) {
        }
    }

})();