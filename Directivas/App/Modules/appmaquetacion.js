(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap']);

    angular.module('app').controller('PopoverDemoCtrl', controller);
    controller.$inject = ['$scope'];
    function controller($scope) {
        $scope.dynamicPopover = {
            content: 'Hello, World!',
            templateUrl: 'myPopoverTemplate.html',
            title: 'Title'
        }
    }

})();