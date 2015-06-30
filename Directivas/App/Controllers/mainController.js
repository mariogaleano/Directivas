(function () {
    'use strict';

    angular
        .module('sc.directivas')
        .controller('mainController', mainController);

    mainController.$inject = ['$location']; 

    function mainController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'mainController';

        vm.persona = {
            Nombre: 'Mario',
            Apellido: 'Galeano',
            Edad: 1
        };

        vm.Nombres = ['Sección 1', 'Nombre','Apellido','Edad'];

        //<input type="date" class="form-control" datepicker-popup ng-model="vm.dt" is-open="vm.opened" min-date="vm.minDate" max-date="'2015-06-22'" 
        //datepicker-options="vm.dateOptions" date-disabled="vm.disabled(date, mode)" ng-required="true" close-text="Close" />
        vm.Model = new Date(2015,1,1);
        vm.minDate = new Date();
        vm.dateOptions = {formatYear: 'yy', startingDay: 1  };
        vm.disabled = function (date, mode) { return false; }
        vm.open = function (event) {
            event.preventDefault();
            event.stopPropagation();
            vm.opened = true;
        };
    }
})();
