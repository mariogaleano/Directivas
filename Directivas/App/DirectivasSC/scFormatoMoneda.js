(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('format', scFormatoMoneda);

    scFormatoMoneda.$inject = ['$window', '$filter'];
    
    function scFormatoMoneda($window, $filter) {
       
        var directive = {
            link: link,
            require: '?ngModel',
            restrict: 'A'            
        };
        return directive;

        function link(scope, elem, attrs, ctrl) {

            if (!ctrl) return;

            if (isNaN(scope.value)) {
                scope.value = '';
            }

            ctrl.$formatters.unshift(function (a) {

                if (a === "")
                    return;

                return '$' + $filter(attrs.format)(ctrl.$modelValue)
            });

            ctrl.$parsers.unshift(function (viewValue) {
                var plainNumber = viewValue.replace(/[^\d.\',']/g, '').replace(/[^\d]/g, '');
                var valorLimpio = ($filter(attrs.format)(plainNumber)).replace(/,/g, ',');

                if (plainNumber === "") {
                    elem.val('');
                    return;
                } else {

                    if ((valorLimpio == "0" && attrs.min != "0")) {
                        elem.val('');
                    } else {
                        elem.val('$' + valorLimpio);
                    }
                }
                return plainNumber;
            });
        }
    }

})();