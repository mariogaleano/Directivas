/*globals angular*/
(function () {
	
    'use strict';

    angular
		.module('scApp.common')
		.directive('soloMoneda', scSoloMoneda);

    scSoloMoneda.$inject = ['$filter'];

    function scSoloMoneda($filter) {

        var directive = {
            link: link,
            require: '^ngModel',
            restrict: 'A'
        };
		
        return directive;
		
        function link(scope, elem, attrs, ctrl) {
			
			//var currencyIcon = '<i class="icn-currency">$</i>';
			
            if (!ctrl) { return; }

            if (isNaN(scope.value)) {
                scope.value = '';
            }
			
			//elem.parent().prepend(currencyIcon);

            ctrl.$formatters.unshift(function (a) {

                if (a === "" || ctrl.$modelValue === undefined){
                    return;
				}
				
                return $filter('number')(ctrl.$modelValue);
            });
        }
    }

})();