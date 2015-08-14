﻿(function () {
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

        function link(scope, elm, attrs, ngModel) {
            ngModel.$validators.soloLetrasEnteros = function (valor) {
                return VALID_REGEX.test(valor);
            }
        };
    }
})();