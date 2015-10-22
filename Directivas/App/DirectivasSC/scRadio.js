/*globals angular*/
(function () {
    'use strict';

    angular
        .module('scApp.common')
        .directive('scRadio', scRadio);

    scRadio.$inject = ['APPROUTES'];

    function scRadio(APPROUTES) {

        var appFolder = APPROUTES.APP_FOLDER.directivesTemplates

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                value: '=ngModel',
                opciones: '=opciones',
                id: '@',
                requerido: "=",
                label: '@'
            },
            templateUrl: appFolder + '/radio.html'
        };
        return directive;

        function link(scope, element, attrs) {
            scope.optValue = attrs.optValue;
        }
    }
})();