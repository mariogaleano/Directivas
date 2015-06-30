(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scInputLabelNumber', directivaInputLabelNumber);

    directivaInputLabelNumber.$inject = ['$window'];

    function directivaInputLabelNumber($window) {
        var directive = {
            require: 'ngModel',
            link: link,
            scope: {
                value: '=ngModel',
                id: "@",
                label: "@"
            },
            restrict: 'EA',
            transculde:'element',
            templateUrl: 'app/Directives/Templates/DirectivainputLabelNumberTemplate.html',
            replace:  true
        };
        return directive;

        function link(scope, element, attrs,ctrl) {


            var input = element.find(":input");

            input.attr("placeholder", attrs.nombre);
            if (attrs.ngRequired != undefined) {
                input.attr("required", "");
            }

            

            if (attrs.onlyIntegers != undefined) {
                element.find(":input").attr("only-integers", "");
            }

            var formulario = element.parents("form:first");
            if (formulario != undefined) {
                
                var nombre = formulario[0].name;
                scope.condicion = nombre + '.scInput' + scope.Label + '.$invalid';
            }
        }
    }
})();