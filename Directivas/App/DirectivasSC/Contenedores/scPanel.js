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
            transclude: true,
            scope: {
                control: '='
            },
            templateUrl: 'app/DirectivasSC/Templates/scPanel.html'
        };
        return directive;

        function panelCtrl($scope) {
            ///este valor cambiara segun el tipo de error
            $scope.tooltip = "Valor Errado";
            $scope.tooltipclass = "errornegocio";
            $scope.cancel = function (e) {
                if (e.keyCode == 27) {
                    $scope.control.$rollbackViewValue();
                }
            };          
        }

        function link($scope, elm, attrs) {
        }
    }

})();