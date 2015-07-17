(function() {
    'use strict';

    angular
        .module('app')
        .directive('scTexto', directive1);

    scTexto.$inject = ['$window'];
    
    function scTexto($window) {
        var directive = {
            link: link,
            restrict: 'E'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();