(function() {
    'use strict';

    angular
        .module('sc.directivas')
        .directive('scTextoArea', scTextoArea);

    scTextoArea.$inject = ['$window'];
    
    function scTextoArea ($window) {
        // Usage:
        //     <scTextoArea></scTextoArea>
        // Creates:
        // 
        var directive = {
            require: ['ngModel'],
            link: link,
            restrict: 'E',
            scope: {
                value: '=ngModel',                
                id: "@",
                requerido: "="
            },
            templateUrl: 'app/DirectivasSC/Templates/scTextoArea.html'
        };
        return directive;

        function link(scope, element, attrs) {

            //console.log(attrs.ngRequired);

            //if (attrs.ngRequired === "true") {
            //    element.find("textarea").attr("ng-required", true);
            //}
        }
    }

})();