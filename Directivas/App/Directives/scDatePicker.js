(function () {
    'use strict';

    angular
    .module('sc.directivas')
    .directive('scDatePicker', directivaDatePicker);

    function directivaDatePicker() {
        var directive = {
            require: 'ngModel',
            restrict: "E",
            scope: {
                Model: '=ngModel',
                dateOptions: "=",
                opened: "=",
                id: "@",
                label : "@"
            },
            link: link,
            controller: function ($scope) {
                $scope.open = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    $scope.opened = true;
                };
                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1,
                    showWeeks: false
                };
            },
            templateUrl: 'app/Directives/Templates/DirectivaDatePickerTemplate.html'
        };
        return directive;
        function link(scope, element, attrs, ngModel) {
            
        }
    }
})();