﻿(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scPhoneMask', scPhoneMask);

    scPhoneMask.$inject = ['$http', '$templateCache', '$compile', '$parse'];
    
    function scPhoneMask($http, $templateCache, $compile, $parse) {
        
        var directive = {
            require: ['ngModel'],
            restrict: 'E',
            
            scope: {
                value: '=ngModel',
            },
            link: function (scope, iElement, iAttrs) {

                $http.get('/App/Directives/Templates/Directiva' + iAttrs.tipo + 'Template.html', { cache: $templateCache }).success(function (tplContent) {
                    iElement.replaceWith($compile(tplContent)(scope));
                });
            }
        };
        return directive;
    }
})();