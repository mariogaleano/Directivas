/*globals angular*/
(function () {

    'use strict';

    angular
        .module('scApp.common')
        .directive('scFiltro', scFiltro);

    scFiltro.$inject = ['$templateCache', 'APPROUTES'];

    function scFiltro($templateCache, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('filtro.html');

        var directive = {
            link: link,
            require: 'ngModel',
            restrict: 'E',
            scope: {
                id: '@',
                label: '@',
                ngModel: '=',
                limpiar: '=?',
            },
        };
        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'filtro.html';
        }
        return directive;

        function link(scope, element, attrs) {
            //watchers
            scope.$watch('limpiar', function (mv) {
                if (mv) {
                    scope.filtro = '';
                    scope.limpiar=false;
                }

            });

        }
    }

})();