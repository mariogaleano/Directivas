(function() {
    'use strict';

    angular
        .module('app')
        .directive('scTextoHtml', directive1);

    scTextoHtml.$inject = ['$window'];
    
    function scTextoHtml($window) {
        var directive = {
            link: link,
            restrict: 'E'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();