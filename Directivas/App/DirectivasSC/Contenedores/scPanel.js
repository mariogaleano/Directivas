/// <reference path="E:\Git\Siste\Directivas\Directivas\Scripts/angular.js" />
/*globals angular*/
(function () {
	
    'use strict';

    angular
		.module('sc.directivas')
		.directive('scPanel', scPanel);
	
    scPanel.$inject = ['$window', '$compile', '$timeout', 'tamanoPanel'];

    function scPanel($window, $compile, $timeout, tamanoPanel) {
        // Usage:
        //     <sc-panel></sc-panel>
        // Creates:
		
        var directive = {
            controller: ['$scope', '$element', '$attrs', panelCtrl],
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

        function panelCtrl() {
			
            var vm = this;
			
            var clasetmp = '';

            vm.claseTamano = function () {
                switch (vm.tamano) {
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
				
                return (clasetmp += ' pull-left');
            };
        }

    }

})();