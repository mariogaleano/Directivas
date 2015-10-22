/*globals angular*/
(function () {
	
    'use strict';
	
    angular
		.module('scApp.common')
		.directive('soloNit', scSoloNit);
    var NIT_REGEX = /^\d{1,15}\-{1}\d{1}$/;

    function scSoloNit() {
		
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
		
        return directiva;

        function link(scope, elm, attrs, ngModel) {
			
			scope.$watch(attrs.ngModel, function (value) {
				if(value !== undefined && value !== null){
					ngModel.$setValidity('soloNit', calcularDigitoVerificacion(value));
				}
			});
			
            function calcularDigitoVerificacion(num) {
				
				var digito = num.split('-').pop();
				var vpri, nit,x, y, z, dv;
				
				nit = num.split('-').shift();
				
				if (isNaN(nit)) {
					return false;
				} else {
					
					vpri = new Array(16);
					x = 0;
					y = 0;
					z = nit.length;
					
					vpri[14] = 3;
					vpri[13] = 7;
					vpri[12] = 13;
					vpri[11] = 17;
					vpri[10] = 19;
					vpri[9] = 23;
					vpri[8] = 29;
					vpri[7] = 37;
					vpri[6] = 41;
					vpri[5] = 43;
					vpri[4] = 47;
					vpri[3] = 53;
					vpri[2] = 59;
					vpri[1] = 67;
					vpri[0] = 71;
					
					for (var i = (15 - z); i < 15 ; i++) {
						y = (nit.substr(((i-15)+z), 1));
						x += ( y * vpri[i] );
					}
					
					y = x % 11;
					if (y > 1) {
						dv = 11 - y;
					} else {
						dv = y;
					}
					
					
					if(parseInt(digito) === dv && NIT_REGEX.test(num)){
						return true;
					}else{
						return false;
					}
				}
			}
        }
    }
})();