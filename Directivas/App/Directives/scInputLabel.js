(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scInputLabel', directivaInputLabel);

    directivaInputLabel.$inject = ['$compile','$parse'];

    function directivaInputLabel($compile,$parse) {
        var directive = {
            require: 'ngModel',
            scope: {
                value: '=ngModel',
                id: "@",
                label: "@",
                haserror: '=',                
                requiredmessage: '@'                
            },
            restrict: 'E',
            link: link,
            templateUrl: 'app/Directives/Templates/DirectivaInputLabelTemplate.html',
            replace: true            
        };
        return directive;

        function link(scope, element, attrs) {            

            var input = element.find(":input");
            scope.required = false;
            input.attr("placeholder", attrs.placeholder);

            if (attrs.onlyLetters != undefined) {
                input.attr("only-letters", "");
            }

            if (attrs.onlyLettersIntegers != undefined) {
                input.attr("only-letters-integers", "");
            }

            if (attrs.ngRequired != undefined) {
                element.find(":input").attr("required", "");
                scope.required = true;
            }            
           
            var x = angular.element(input);
            $compile(x)(scope);
        }
    }
})();