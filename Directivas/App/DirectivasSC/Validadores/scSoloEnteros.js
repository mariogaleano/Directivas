(function () {
    'use strict';
    angular.module('sc.directivas').directive('soloEnteros', scSoloEnteros);

    function scSoloEnteros() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function (valor) {

                if (ctrl.$isEmpty(valor)) {
                    ctrl.$setValidity('soloEnteros', true);                    
                    return true;
                }
                var NUMBERS_REGEX = /^[0-9]*$/;
                var resultado = NUMBERS_REGEX.test(valor);

                if (resultado) {
                    ctrl.$setValidity('soloEnteros', true);
                    //scope.MostrarError = false;
                    return true;
                } else {
                    ctrl.$setValidity('soloEnteros', false);
                    //scope.MostrarError = true;
                    return true;
                }
            });
        };
    }
})();