/*globals angular*/
(function () {
    'use strict';
    angular
		.module('scApp.common')
		.directive('scCheckbox', scCheckbox);

    scCheckbox.$inject = ['$templateCache', 'APPROUTES'];

    function scCheckbox($templateCache, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('checbox.html');

        var directive = {
            require: '^ngModel',
            link: link,
            restrict: 'E',
            scope: {
                ngModel: '=',
                deshabilitar: '=',
                id: "@",
                estado: '@',
                label: '@',
                eventoCambio: "&",
				eventoClick: "&",
                activar: "=?",
            },
        };
        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'checkbox.html';
        }
        return directive;

        function link(scope) {
            scope.ngModel = (angular.isSet(scope.ngModel)) ? scope.ngModel : scope.activar ; 
            
        }
    }
})();