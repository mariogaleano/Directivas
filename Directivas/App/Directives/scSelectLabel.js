(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scSelectLabel', directivaInputLabel);

    directivaInputLabel.$inject = ['$compile'];

    function directivaInputLabel($compile) {
        var directive = {
            require: 'ngModel',
            scope: {
                value: '=ngModel',
                opciones: '=opciones',
                id: "@",
                label: "@",
                haserror: '=',
                errormessage: "@"
            },
            restrict: 'E',
            link: link,
            templateUrl: 'app/Directives/Templates/DirectivaSelectLabelTemplate.html',
            replace: true
        };
        return directive;

        function link(scope, element, attrs) {
            scope.optValue = attrs.optValue;
            scope.optDescription = attrs.optDescription;

            if (attrs.ngRequired != undefined) {

                var selectctrl = element.children()[1];

                var control = angular.element(selectctrl);
                control.attr("required", true);
                $compile(selectctrl)(scope);
            }
        }
    }
})();