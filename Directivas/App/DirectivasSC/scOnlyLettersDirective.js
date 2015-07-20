angular.module('sc.directivas').directive('onlyLetters', soloTexto);

soloTexto.$inject = ['$compile'];

function soloTexto($compile) {
    var directiva = {
        require: 'ngModel',
        link: link,
        transclude: true      
    };
    return directiva;

    function link(scope, elm, attrs, ctrl) {          

        scope.$watch(attrs.ngModel, function (valor) {
            
            if (ctrl.$isEmpty(valor)) {
                ctrl.$setValidity('onlyLetters', true);
                return true;
            }
            var TEXT_REGEX = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ_ ]*$/;
            var resultado = TEXT_REGEX.test(valor);          

            if (resultado) {                
                ctrl.$setValidity('onlyLetters', true);
                return true;
            } else {          
                ctrl.$setValidity('onlyLetters', false);
                return true;
            }
        });     
    };
};