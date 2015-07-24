(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scRadio', scRadio);

    scRadio.$inject = ['$window'];
    
    function scRadio ($window) {       
        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                value: '=ngModel',
                opciones: '=opciones',
                id: '@',
                requerido: "="
            },
            templateUrl: 'app/DirectivasSC/Templates/scRadio.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.optValue = attrs.optValue;            
        }
    }
})();