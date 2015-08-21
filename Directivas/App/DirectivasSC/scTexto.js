(function () {
    'use strict';
    angular.module('sc.directivas').directive('scTexto', scTexto);

    scTexto.$inject = ['$window', '$compile', 'tipoInput'];
    function scTexto($window, $compile, tipoInput) {
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: Ctrl,
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                value: '=ngModel',
                tipo: '@',//[texto,textonum,todo]
                id: "@",
                requerido: "="
            },
            templateUrl: 'app/DirectivasSC/Templates/scTexto.html'
        };
        return directive;

        function Ctrl($scope) {
            //console.log("value=" + this.value);
            //console.log("tipo=" + this.tipo);
            //console.log("id=" + this.id);
            //console.log("req=" + this.requerido);
            this.cancel = function (e) {
                if (e.keyCode == 27) {
                    console.log("control=" + JSON.stringify($scope.control));
                    $scope.control.$$lastCommittedViewValue = $scope.control$viewValue;
                    $scope.control.$rollbackViewValue();
                }
            };

        }
        function link(scope, elm, attrs, controllers) {
            var ngModel = controllers[0];
            var ctrlpanel = controllers[1];
            scope.$watch(ctrlpanel.control, function () {
                scope.control = ctrlpanel.control;
            });
            var input = elm.find(":input");

            switch (attrs.tipo) {
                case tipoInput.todo:
                    break;
                case tipoInput.texto:
                    input.attr("solo-letras", "");
                    break;
                case tipoInput.textonum:
                    input.attr("solo-letras-enteros", "");
                    break;
                case tipoInput.num:
                    input.attr("solo-enteros", "");
                    break;
                default:
                    break;
            }

            var x = angular.element(input);
            $compile(x)(scope);

        }
    }
})();