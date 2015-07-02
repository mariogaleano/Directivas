(function () {
    'use strict';

    angular.module('sc.directivas', ['ui.router', 'ui.bootstrap', 'ui.mask']);

    angular.module('sc.directivas').config(function ($stateProvider, $urlRouterProvider) {
       
        $urlRouterProvider.otherwise("/index");
        //
        // Now set up the states
        $stateProvider
          .state('full', {
              url: "/full",
              templateUrl: "pages/Pruebafull.html",
              //controller: 'controller'
          })
          .state('label', {
              url: "/label",
              templateUrl: "Pages/PruebaLabel.html"
          })
        .state('numerosletras', {
            url: "/numerosletras",
            templateUrl: "Pages/PruebaDirectivaNumerosLetras.html"
        })
            .state('letras', {
                url: "/letras",
                templateUrl: "Pages/PruebaDirectivaLetras.html"
            })
        .state('numeros', {
            url: "/numeros",
            templateUrl: "Pages/PruebaDirectivaNumeros.html"
        }).
        state('inputlabel', {
            url: "/inputlabel",
            templateUrl: "Pages/PruebaDirectivaInputLabel.html"
        }).
        state('picker', {
            url: "/picker",
            templateUrl: "Pages/PruebaDirectivaDatePicker.html"
        }).
        state('telefono', {
            url: "/telefono",
            templateUrl: "Pages/PruebaDirectivaPhone.html"
        });
    });


})();