(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scInputLabelNumber', directivaInputLabelNumber);

    directivaInputLabelNumber.$inject = ['$compile'];

    function directivaInputLabelNumber($compile) {
        var directive = {
            require: 'ngModel',
            link: link,
            scope: {
                value: '=ngModel',
                id: "@",
                label: "@",
                haserror: '=',
                errormessage: '@',
                emptymessage : '@'
            },
            restrict: 'EA',
            transculde:'element',
            templateUrl: 'app/Directives/Templates/DirectivainputLabelNumberTemplate.html',
            replace:  true
        };
        return directive;

        function link(scope, element, attrs,ctrl) {


            var input = element.find(":input");

            input.attr("placeholder", attrs.nombre);
            if (attrs.ngRequired != undefined) {
                input.attr("required", "");
            }            

            if (attrs.onlyIntegers != undefined) {
                element.find(":input").attr("only-integers", "");
            }            

            var x = angular.element(input);
            $compile(x)(scope);
        }
    }
})();