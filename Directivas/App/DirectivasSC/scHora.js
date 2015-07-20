(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scHora', scHora);

    scHora.$inject = ['$window'];
    
    function scHora ($window) {
        // Usage:
        //     <scHora></scHora>
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