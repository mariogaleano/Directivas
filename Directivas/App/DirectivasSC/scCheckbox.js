(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scCheckbox', scCheckbox);

    scCheckbox.$inject = ['$window'];
    
    function scCheckbox ($window) {
        // Usage:
        //     <scCheckbox></scCheckbox>
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