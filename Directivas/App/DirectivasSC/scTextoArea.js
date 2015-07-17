﻿(function() {
    'use strict';

    angular
        .module('app')
        .directive('scTextoArea', scTextoArea);

    scTextoArea.$inject = ['$window'];
    
    function scTextoArea ($window) {
        // Usage:
        //     <scTextoArea></scTextoArea>
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