(function () {
    'use strict';

    angular
        .module('sc.directivas')
        .controller('controller', controller);

    controller.$inject = ['$location'];

    function controller($location) {
        /* jshint validthis:true */
        var vm = this;


        vm.persona = {
            Nombre: 'Mario',
            Apellido: 'Galeano',
            Edad: 33
        };


        vm.title = 'controller';

        vm.VerValores = function () {

            vm.nombreCompleto = vm.persona.Nombre + ' ' + vm.persona.Apellido + ' (' + vm.persona.Edad + ' años)';

        };

    }
})();
