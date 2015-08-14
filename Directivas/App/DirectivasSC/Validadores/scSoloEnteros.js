﻿(function () {
    'use strict';
    angular.module('sc.directivas').directive('soloEnteros', scSoloEnteros);
    var NUMBERS_REGEX = /^[0-9]*$/;

    function scSoloEnteros() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ngModel) {
            ngModel.$validators.soloEnteros = function (valor) {
                return NUMBERS_REGEX.test(valor);
            }
        };
    }
})();