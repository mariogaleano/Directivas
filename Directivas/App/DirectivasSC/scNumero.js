(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scNumero', scNumero);

    scNumero.$inject = ['$window'];
    
    function scNumero ($window) {
        // Usage:
        //     <scNumero></scNumero>
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