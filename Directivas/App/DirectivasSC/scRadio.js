﻿(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scRadio', scRadio);

    scRadio.$inject = ['$window'];
    
    function scRadio ($window) {
        // Usage:
        //     <scRadio></scRadio>
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