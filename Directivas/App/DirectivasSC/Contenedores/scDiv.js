(function () {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scDiv', scDiv);

    scDiv.$inject = ['$window'];

    function scDiv($window) {
        // Usage:
        //     <scDiv></scDiv>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E',
            transculed: true
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();