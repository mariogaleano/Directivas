(function() {
    'use strict';

    angular
        .module('sc.directivas')
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