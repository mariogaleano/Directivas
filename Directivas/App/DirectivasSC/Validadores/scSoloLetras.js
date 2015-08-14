(function () {
    'use strict';
    angular.module('sc.directivas').directive('soloLetras', scSoloLetras);

    var TEXT_REGEX = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ_ ]*$/;

    function scSoloLetras() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ngModel) {
            ngModel.$validators.soloLetras = function (valor) {
                return TEXT_REGEX.test(valor);
            }
        };
    }
})();