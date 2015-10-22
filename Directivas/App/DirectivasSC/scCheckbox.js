/*globals angular*/
(function () {
    'use strict';
    angular
		.module('scApp.common')
		.directive('scCheckbox', scCheckbox);

    scCheckbox.$inject = ['APPROUTES'];

    function scCheckbox(APPROUTES) {

        var appFolder = APPROUTES.APP_FOLDER.directivesTemplates
        /*uso
         * <sc-checbox></sc-checbox>
         */
        var directive = {
            require: ['^scPanel'],
            link: link,
            restrict: 'E',
            scope: {
                value: '=ngModel',
                id: "@",
                estado: '@',
                label: '@'
            },
            templateUrl: appFolder + '/checkbox.html'
        };

        return directive;

        function link(scope) {

            var cond1 = scope.value === undefined;
            var cond2 = scope.estado !== undefined && scope.estado === 'activo';

            scope.value = (cond1) ? false : true;
            scope.value = (cond2) ? true : scope.value;
        }
    }
})();