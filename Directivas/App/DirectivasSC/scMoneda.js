(function() {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scMoneda', directivaInputLabelNumber);   

    function directivaInputLabelNumber() {
        var directive = {
            require: 'ngModel',
            link: link,
            scope: {
                value: '=ngModel',
                id: "@",
                requerido: "="
            },
            restrict: 'E',
            templateUrl: 'app/DirectivasSC/Templates/scMoneda.html'
        };
        return directive;

        function link(scope, elem, attrs, ctrl) {            

        }
    }
})();