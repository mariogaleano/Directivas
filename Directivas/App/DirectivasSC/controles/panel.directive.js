/*globals angular, document*/
(function () {
	
    'use strict';

    angular
		.module('scApp.common')
		.directive('scPanel', scPanel);
	
    scPanel.$inject = ['$rootScope', '$templateCache', 'TAMANO_PANEL', 'APPROUTES'];

    function scPanel($rootScope, $templateCache, TAMANO_PANEL, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
		var plantilla = $templateCache.get('panel.html');
		
        var directive = {
            transclude: true,
			required: 'control',
            restrict: 'E',
			link: link,
            scope: {
				control: '=',
                tamano: '@', //[completo, medio, tercio, cuarto,quinto ,octavo,decimo]
                tieneicono: '@'
			},
        };
		
		if(plantilla){
			directive.template = plantilla;
		}else{
			directive.templateUrl = carpetaDirectivas + 'panel.html';
		}
		
        return directive;

        function link(scope) {
			scope.inputValidado = false;
			scope.claseTmp = 'f-control f-filtroCont ' + TAMANO_PANEL[scope.tamano] + ' ';
			
        }
    }

})();