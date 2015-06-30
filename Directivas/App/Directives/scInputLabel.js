(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scInputLabel', directivaInputLabel);

    //directivaInputLabel.$inject = ['$compile'];

    function directivaInputLabel() {
        var directive = {
            require: 'ngModel',           
            scope: {
                value: '=ngModel',
                id: "@",
                label: "@"
            },
            restrict: 'E',
            link: link,
            templateUrl: 'app/Directives/Templates/DirectivaInputLabelTemplate.html'
        };
        return directive;

        function link(scope, element, attrs) {            
            element.find(":input").attr("placeholder", attrs.placeholder);
            //if (attrs.ngRequired != undefined) {
            //    element.find(":input").attr("required", "");
            //}

            //if (attrs.onlyLetters != undefined) {
            //    element.find(":input").attr("only-letters","");
            //}
        }
    }
})();