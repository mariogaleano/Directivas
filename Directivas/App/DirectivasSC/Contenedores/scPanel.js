/// <reference path="E:\Git\Siste\Directivas\Directivas\Scripts/angular.js" />
(function () {
    'use strict';

    angular.module('sc.directivas').directive('scPanel', scPanel);
    scPanel.$inject = ['$window', '$compile', '$timeout', 'tamanoPanel'];

    function scPanel($window, $compile, $timeout, tamanoPanel) {
        // Usage:
        //     <sc-panel></sc-panel>
        // Creates:
        // 
        var directive = {
            controller: ['$scope', '$element', '$attrs', panelCtrl],
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: {
                control: '=',
                tamano: '@',//[completo, medio, tercio, cuarto ]
                tieneicono: '@'
            },
            transclude: true,
            scope: {},
            templateUrl: 'app/DirectivasSC/Templates/scPanel.html'
        };
        return directive;

        function panelCtrl($scope, $element, $attrs) {
            var vm = this;
            var clasetmp = '';
            //setTimeout(function () {
            //    $scope.$apply(function () {
            //        if (vm.control.$invalid) {
            //            clasetmp += 'f-controlIconRight error';
            //        }
            //    });
            //}, 2000);

            this.claseTamano = function () {
                switch (this.tamano) {
                    case tamanoPanel.completo:
                        clasetmp = 'f-control f-lg-100';
                        break;
                    case tamanoPanel.medio:
                        clasetmp = 'f-control f-lg-50 f-xs-100';
                        break;
                    case tamanoPanel.tercio:
                        clasetmp = 'f-control f-lg-100';
                        break;
                    case tamanoPanel.cuarto:
                        clasetmp = 'f-control f-lg-25 f-md-50 f-xs-100';
                        break;
                }

                clasetmp += ' pull-left';

                return clasetmp;
            };
        }

        function link(scope, elm, attrs) {

        }
    }

})();