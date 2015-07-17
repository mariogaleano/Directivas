(function() {
    'use strict';

    angular
        .module('app')
        .directive('scMoneda', scMoneda);

    scMoneda.$inject = ['$window'];
    
    function scMoneda ($window) {
        // Usage:
        //     <scMoneda></scMoneda>
        // Creates:
        // 
        var directive = {
            link: link,
            restrict: 'E'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();