angular.module('sc.directivas').directive('onlyLetters', soloTexto);

soloTexto.$inject = ['$compile'];

function soloTexto($compile) {
    var directiva = {
        require: 'ngModel',
        link: link,
        transclude: true,
        //compile: function (tElm, tAttrs) {
            

        //    return function (scope, elm) {
        //        //elm.bind('click', function () {
        //        //    exp(scope);
        //        //});
        //        //var exp = $parse('fxn()');
        //        var input = elm.find(":input");
        //        if (input != undefined) {
                    
        //            input.attr("only-letters", "");
        //            //exp(scope);
        //        }
        //    };
        //}
    };
    return directiva;

    function link(scope, elm, attrs, ctrl) {    

        var input = elm.find(":input");
       
        if (input != undefined) {
            //console.log(input);
            input.attr("only-letters", "");
            //var x = angular.element(input);
            //$compile(input)(scope);            
        }

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
                var elmento = angular.element(input);
                
                //console.log(ctrl);
                ctrl.$setValidity('onlyLetters', false);
                return true;
            }
        });

        var x = angular.element(input);
        //$compile(x)(scope);
    };
};