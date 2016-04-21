/*globals angular*/
(function () {
    'use strict';
    angular
		.module('scApp.common')
		.directive('scTelefono', scTelefono);

    scTelefono.$inject = ['$templateCache', 'APPROUTES'];

    /**
    * scTelefono: Uso "<sc-telefono [params scope]></sc-telefono>" la directiva telefono recibe dentro del atributo ngModel un objeto el cual debe estar construido con 3 propieadades especificas.
	* 			  { tipoTelefono: [numerico], numeroTelefono: [string], extensionTelefono }.				
    * @public
    * @method scTelefono
    * @param {String} id: es el nombre identificador que distinguira los controles dentro de esta directiva se contruye sin anteponer el namespace scInput
    * @param {String} label: Sela el nombre que visual dentro del ui que tendra el conjunto de inputs.
    * @param {String} iniciar: corresponde al valor que tendra por defecto el combo de tipo telefono.
    * @param {Object} modelo: corresponde a la variable de que recibe y entrega los datos two way data binding.
    * @param {Boolean} requerido: recibe un booleano el cual determina la necesidad de que existan datos en este campo.
    * @param {Function} cambioTipo: recibe una funcion para hacer callback al momento de que el combo tipo de telefono cambie.
    * @param {Array} listaTipos: corresponde a la lista de tipos que se mostrara en el combo de tipos
    * @return {Object} Elemento directiva de telefono.
    */
    function scTelefono($templateCache, APPROUTES) {

        var carpetaDirectivas = APPROUTES.APP_FOLDER + APPROUTES.FOLDER_VISTAS_DIRECTIVAS;
        var plantilla = $templateCache.get('telefonos.html');

        var directive = {
            require: '^ngModel',
            restrict: 'E',
			link: link,
            scope: {
                id: "@",
                label: "@",
                index: "=?",
				iniciar: "=",
                modelo: "=ngModel",
                requerido: "=",
				cambioTipo: "&",
				listaTipos: "=",
                deshabilitar:"=?"
            }
        };

        if (plantilla) {
            directive.template = plantilla;
        } else {
            directive.templateUrl = carpetaDirectivas + 'telefonos.html';
        }

        return directive;
		
		function link (scope) {
		
			scope.$watch('modelo',function (mv) {
				if(angular.isSet(mv) && !angular.isSet(mv.tipoTelefono)){
					scope.modelo.tipoTelefono = scope.iniciar;
				}
			});
			
		}
    }
})();