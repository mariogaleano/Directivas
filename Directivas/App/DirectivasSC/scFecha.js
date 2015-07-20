(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scFecha', scFecha);

    scFecha.$inject = ['$window'];
    
    function scFecha ($window) {
        // Usage:
        //     <scFecha></scFecha>
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