(function() {
    'use strict';

    angular
        .module('app')
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