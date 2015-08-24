(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scTextoHtml', directive1);

    scTextoHtml.$inject = ['$window'];
    
    function scTextoHtml($window) {
        var directive = {
            link: link,
            restrict: 'E',
            label: '@'
        };
        return directive;

        function link(scope, element, attrs) {
        }
    }

})();