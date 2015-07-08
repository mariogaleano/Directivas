angular.module('sc.directivas').directive('onlyLettersIntegers', soloTexto);

var VALID_REGEX = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/;

function soloTexto() {
    var directiva = {
        require: 'ngModel',
        link: link,
        transclude: true
    };
    return directiva;

    function link(scope, elm, attrs, ctrl) {
        scope.$watch(attrs.ngModel, function (valor) {

            if (ctrl.$isEmpty(valor)) {
                ctrl.$setValidity('onlyLettersIntegers', true);
                return true;
            }
            var resultado = VALID_REGEX.test(valor);            

            if (resultado) {                
                ctrl.$setValidity('onlyLettersIntegers', true);
                return true;
            } else {                
                ctrl.$setValidity('onlyLettersIntegers', false);
                return true;
            }
        });
    };
};