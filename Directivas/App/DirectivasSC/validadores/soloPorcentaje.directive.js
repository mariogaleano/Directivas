/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('soloPorcentajes', soloPorcentajes);

    soloPorcentajes.$inject = ['EVENTO_VALIDACION'];

    function soloPorcentajes(EVENTO_VALIDACION) {
        var PORCENTAJES_REGEX = /^(100|0|(^0(\.([0-9]{1,4})?)|([1-9]{1})?[0-9](\.([0-9]{1,4})?)?))$/;
        var DECIMALES_REGEX = /^0\.[0-9]{1,}$/;
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };

        return directiva;

        function link(scope, element, attrs, ngModel) {
            
            var value;
            var panel = scope.$parent.$parent;
            
            scope.$watch('value', function (mv) {
                if(DECIMALES_REGEX.test(mv)){
                    value = (value) ? value : (mv*100);
                    element.val(value);
                }
            });
            
            element.parent().addClass("porcentaje");
            
            element.on(EVENTO_VALIDACION, function() {
                value = element.val();
                var mValue = (value/100);
                if (scope.requerido && value !== undefined && value !== null) {
                    ngModel.$setValidity('soloPorcentajes', PORCENTAJES_REGEX.test(value));
                    if(mValue > 0){scope.value = mValue;}
                    panel.inputValidado = !PORCENTAJES_REGEX.test(value);
                }
            });
            
            element.on("keypress", function (event) {
                value = element.val();
                
                if (scope.tipo === 'porcentaje') {
                    var char = String.fromCharCode(event.which);
                    var mix = value + char;
                    if (!PORCENTAJES_REGEX.test(mix)) {
                        event.preventDefault();
                    }else{
                        value = mix;
                    }
                }
            });
            element.on("paste", function (event) {
                var value = element.val();
                if (scope.tipo === 'porcentaje') {
                    var char = String.fromCharCode(event.which);
                    if (!PORCENTAJES_REGEX.test(value + char)) {
                        event.preventDefault();
                    }
                }
            });
            //funciones varias
        }
    }
})();