angular.module('sc.directivas').directive('onlyIntegers', soloEnteros);


function soloEnteros($parse) {
    var directiva = {
        require: 'ngModel',
        link: link,
        transclude: true
    };
    return directiva;

    function link(scope, elm, attrs, ctrl) {
        scope.$watch(attrs.ngModel, function (valor) {

            if (ctrl.$isEmpty(valor)) {
                ctrl.$setValidity('onlyIntegers', true);
                //scope.MostrarError = false;
                return true;
            }
            var NUMBERS_REGEX = /^[0-9]*$/;
            var resultado = NUMBERS_REGEX.test(valor);            

            if (resultado) {                
                ctrl.$setValidity('onlyIntegers', true);                
                //scope.MostrarError = false;
                return true;
            } else {                
                ctrl.$setValidity('onlyIntegers', false);
                //scope.MostrarError = true;
                return true;
            }
        });
    };
};