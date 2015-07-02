(function() {
    'use strict';

    //<input type="text" ng-model="celnumber" ui-mask="99 99 99 99 99" />

    angular
        .module('sc.directivas')
        .directive('scPhoneMask', scPhoneMask);

    
    
    function scPhoneMask($http, $templateCache, $compile, $parse) {
        // Usage:
        //     <scPhoneMask></scPhoneMask>
        // Creates:
        // 
        var directive = {
            require: ['ngModel'],
            restrict: 'E',
            //templateUrl: 'app/Directives/Templates/DirectivaPhoneTemplate.html',
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