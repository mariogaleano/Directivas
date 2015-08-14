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
            controller: Ctrl,
            link: link,
            restrict: 'E',
            transclude: true,
            scope: {
                control: '='
            },
            templateUrl: 'app/DirectivasSC/Templates/scPanel.html'
        };
        return directive;

        function Ctrl($scope) {
            ///este valor cambiara segun el tipo de error
            $scope.tooltip = "Valor Errado";
            $scope.tooltipclass = "";
        }

        function link($scope, elm, attrs) {
           
        }
    }

})();