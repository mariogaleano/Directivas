(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scCombo', scCombo);

    scCombo.$inject = ['$window'];
    
    function scCombo ($window) {
        // Usage:
        //     <scCombo></scCombo>
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