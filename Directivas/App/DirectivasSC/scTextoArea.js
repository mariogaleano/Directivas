/*globals angular*/
(function () {
    'use strict';

    angular
		.module('scApp.common')
		.directive('scTextoArea', scTextoArea);

    scTextoArea.$inject = ['APPROUTES'];

    function scTextoArea(APPROUTES) {
        // Usage:
        //     <scTextoArea></scTextoArea>
        // Creates:
        // 
        var appFolder = APPROUTES.APP_FOLDER.directivesTemplates;

        var directive = {
            require: ['^ngModel', '^scPanel'],
            restrict: 'E',
            scope: {
                value: '=ngModel',
                id: "@",
                requerido: "=",
                label: '@'
            },
            templateUrl: appFolder + '/textoArea.html'
        };

        return directive;

    }
})();