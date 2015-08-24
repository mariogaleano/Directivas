(function () {
    'use strict';

    angular.module('sc.directivas').directive('scTextoArea', scTextoArea);

    scTextoArea.$inject = ['$window', '$compile', 'tipoInput'];

    function scTextoArea($window, $compile, tipoInput) {
        // Usage:
        //     <scTextoArea></scTextoArea>
        // Creates:
        // 
        var directive = {
            require: ['^ngModel', '^scPanel'],
            controller: Ctrl,
            link: link,
            restrict: 'E',
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                value: '=ngModel',
                id: "@",
                requerido: "=",
                label: '@'
            },
            templateUrl: 'app/DirectivasSC/Templates/scTextoArea.html'
        };
        Ctrl.$inject = ['$scope'];
        return directive;

        function Ctrl($scope) {
            var vm = this;
            this.cancel = function (e) {
                if (e.keyCode == 27) {
                    console.log("control=" + JSON.stringify($scope.control));
                    $scope.control.$$lastCommittedViewValue = $scope.control$viewValue;
                    $scope.control.$rollbackViewValue();
                }
            };
            ///este valor cambiara segun el tipo de error
            vm.tooltip = "Valor Errado";
            vm.tooltipclass = "errornegocio";

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
                case tipoInput.moneda:
                    input.attr("solo-moneda", "");
                    break;
                default:
                    break;
            }

            var x = angular.element(input);
            $compile(x)(scope);
        }
    }

})();