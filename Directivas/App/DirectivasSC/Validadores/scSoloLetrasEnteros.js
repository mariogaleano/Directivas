(function () {
    'use strict';
    angular.module('sc.directivas').directive('soloLetrasEnteros', scSoloLetrasEnteros);

    var VALID_REGEX = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

    function scSoloLetrasEnteros() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function (valor) {

                if (ctrl.$isEmpty(valor)) {
                    ctrl.$setValidity('soloLetrasEnteros', true);
                    return true;
                }
                var resultado = VALID_REGEX.test(valor);

                if (resultado) {
                    ctrl.$setValidity('soloLetrasEnteros', true);
                    return true;
                } else {
                    ctrl.$setValidity('soloLetrasEnteros', false);
                    return true;
                }
            });
        };
    }
})();