﻿(function () {
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

        vm.Nombres = ['Sección 1', 'Nombre', 'Apellido', 'Edad'];

        //<input type="date" class="form-control" datepicker-popup ng-model="vm.dt" is-open="vm.opened" min-date="vm.minDate" max-date="'2015-06-22'" 
        //datepicker-options="vm.dateOptions" date-disabled="vm.disabled(date, mode)" ng-required="true" close-text="Close" />
        vm.Model = new Date(2015, 1, 1);
        vm.minDate = new Date();
        vm.dateOptions = { formatYear: 'yy', startingDay: 1 };
        vm.disabled = function (date, mode) { return false; }
        vm.open = function (event) {
            event.preventDefault();
            event.stopPropagation();
            vm.opened = true;
        };


        vm.options = [{ id: 1,   valor: 'Option 1' },
                        { id: 2, valor: 'Option 2' },
                        { id: 3, valor: 'Option 3' },
                        { id: 4, valor: 'Option 4' },
                        { id: 5, valor: 'Option 5' },
                        { id: 6, valor: 'Option 6' },
                        { id: 7, valor: 'Option 7' },
                        { id: 8, valor: 'Option 8' }
        ];


        vm.DatosInputLabel = function () {            
            console.log(new Date());
        };

        ///watchers Count
        console.time("TiempoMide-watchers");
        var root = angular.element(document.getElementsByTagName('html'));

        var watchers = [];

        var f = function (element) {
            angular.forEach(['$scope', '$isolateScope'], function (scopeProperty) {
                if (element.data() && element.data().hasOwnProperty(scopeProperty)) {
                    angular.forEach(element.data()[scopeProperty].$$watchers, function (watcher) {
                        watchers.push(watcher);
                    });
                }
            });

            angular.forEach(element.children(), function (childElement) {
                f(angular.element(childElement));
            });
        };

        f(root);

        // Remove duplicate watchers
        var watchersWithoutDuplicates = [];
        angular.forEach(watchers, function (item) {
            if (watchersWithoutDuplicates.indexOf(item) < 0) {
                watchersWithoutDuplicates.push(item);
            }
        });

        console.log("watchers:" + watchersWithoutDuplicates.length);
        console.timeEnd("TiempoMide-watchers");
    }
})();
