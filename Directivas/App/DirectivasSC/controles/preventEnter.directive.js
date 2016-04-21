/*globals angular*/
(function () {
    'use strict';

    angular
        .module('scApp.common')
        .directive('scEnter', scEnter);

    scEnter.$inject = ['$templateCache', 'APPROUTES'];

    function scEnter($templateCache, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;

        var directive = {
            link: link,
            restrict: 'A',
        };

        return directive;

        function link(scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }
    }
})();