angular.module('sc.directivas').directive('onlyLetters', soloTexto);

var TEXT_REGEX = /^[a-zA-Z]*$/;

function soloTexto($parse) {
    var directiva = {
        require: 'ngModel',
        link: link,
        transclude: true
    };
    return directiva;

    function link(scope, elm, attrs, ctrl) {
        scope.$watch(attrs.ngModel, function (valor) {
            
            if (ctrl.$isEmpty(valor)) {
                ctrl.$setValidity('valor', true);
                return true;
            }
            var resultado = TEXT_REGEX.test(valor);          

            if (resultado) {                
                ctrl.$setValidity('valor', true);
                return true;
            } else {                
                ctrl.$setValidity('valor', false);
                return true;
            }
        });
    };
};