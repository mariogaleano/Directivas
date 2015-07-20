(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scTelefono', scTelefonos);

    scTelefono.$inject = ['$window'];
    
    function scTelefono($window) {
        // Usage:
        //     <scTelefonos></scTelefonos>
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