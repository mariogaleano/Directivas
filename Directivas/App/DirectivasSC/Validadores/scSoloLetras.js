(function () {
    'use strict';
    angular.module('sc.directivas').directive('soloLetras', scSoloLetras);

    function scSoloLetras() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ctrl) {

            scope.$watch(attrs.ngModel, function (valor) {

                if (ctrl.$isEmpty(valor)) {
                    ctrl.$setValidity('soloLetras', true);
                    return true;
                }
                var TEXT_REGEX = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ_ ]*$/;
                var resultado = TEXT_REGEX.test(valor);

                if (resultado) {
                    ctrl.$setValidity('soloLetras', true);
                    return true;
                } else {
                    ctrl.$setValidity('soloLetras', false);
                    return true;
                }
            });
        };
    }
})();