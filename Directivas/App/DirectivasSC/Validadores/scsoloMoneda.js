/*globals angular*/
(function () {
	
    'use strict';

    angular
		.module('sc.directivas')
		.directive('soloMoneda', scSoloMoneda);

    scSoloMoneda.$inject = ['$window', '$filter'];

    function scSoloMoneda($window, $filter) {

        var directive = {
            link: link,
            require: '^ngModel',
            restrict: 'A'
        };
		
        return directive;
		
        function link(scope, elem, attrs, ctrl) {
			
			//var currencyIcon = '<i class="icn-currency">$</i>';
			
            if (!ctrl){ return; }

            if (isNaN(scope.value)) {
                scope.value = '';
            }
			
			//elem.parent().prepend(currencyIcon);
			
            ctrl.$formatters.unshift(function (a) {
				console.log(a);
				var condicion = ((a === "") || (ctrl.$modelValue === undefined) || (a.lenght > 10));
				
                if (condicion){
                    return;
				}
				
                return $filter('number')(ctrl.$modelValue);
            });
        }
    }

})();