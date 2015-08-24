(function () {
    'use strict';

    angular.module('sc.directivas', ['ui.router', 'ui.bootstrap', 'ui.mask', 'textAngular', 'ui.select']);

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
        state('inputnumberlabel', {
            url: "/inputnumberlabel",
            templateUrl: "Pages/PruebaDirectivaInputLabelNumber.html"
        }).
        state('picker', {
            url: "/picker",
            templateUrl: "Pages/PruebaDirectivaDatePicker.html"
        }).
        state('telefono', {
            url: "/telefono",
            templateUrl: "Pages/PruebaDirectivaPhone.html"
        }).
         state('richtext', {
             url: "/richtext",
             templateUrl: "Pages/PruebaDirectivaTextAngular.html"
         }).
         state('select', {
             url: "/select",
             templateUrl: "Pages/PruebaDirectivaSelectLabel.html"
         });
    });

    angular.module('sc.directivas').config(['$provide', function ($provide) {

        $provide.decorator('taOptions', ['$delegate', function (taOptions) {

            taOptions.toolbar = [
              ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
              ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
              ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent'],
              ['html']//, 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
            ];

            return taOptions;
        }]);

        $provide.decorator('taTools', ['$delegate', function (taTools) {

            taTools.bold.tooltiptext = 'Negrita';
            taTools.italics.tooltiptext = 'Cursiva';
            taTools.underline.tooltiptext = 'Subrayado';
            taTools.ul.tooltiptext = 'Viñeta';
            taTools.ol.tooltiptext = 'Numeración';
            taTools.justifyCenter.tooltiptext = 'Centrar';
            taTools.justifyLeft.tooltiptext = 'Alinear a la izquierda';
            taTools.justifyRight.tooltiptext = 'Alinear a la derecha';
            taTools.outdent.tooltiptext = "Aumentar sangría";
            taTools.indent.tooltiptext = "Disminuir sangría";
            taTools.strikeThrough.tooltiptext = "Subrayado";

            taTools.insertImage.tooltiptext = 'Insertar imagen';
            taTools.insertLink.tooltiptext = 'Insertar link';
            taTools.insertVideo.tooltiptext = 'Insertar video';

            taTools.html.tooltiptext = 'HTML / Texto enriquecido';

            taTools.undo.tooltiptext = 'Deshacer';
            taTools.redo.tooltiptext = 'Rehacer';

            taTools.clear.tooltiptext = 'Limpiar formato';

            taTools.h1.tooltiptext = 'Título 1';
            taTools.h2.tooltiptext = 'Título 2';
            taTools.h3.tooltiptext = 'Título 3';
            taTools.h4.tooltiptext = 'Título 4';
            taTools.h5.tooltiptext = 'Título 5';
            taTools.h6.tooltiptext = 'Título 6';

            taTools.p.tooltiptext = 'Párrafo';

            taTools.wordcount.display = '<div id="toolbarWC" style="display:block; min-width:100px;">Palabras: <span ng-bind="wordcount"></span></div>';
            taTools.charcount.display = '<div id="toolbarCC" style="display:block; min-width:120px;">C&aacute;racteres: <span ng-bind="charcount"></span></div>';

            taTools.quote.tooltiptext = 'Encerrar/Eliminar comillas de la selección o el párrafo';
            taTools.pre.tooltiptext = 'Texto preformateado';



            return taTools;
        }]);
    }]);

    angular.module('sc.directivas').constant('tipoInput', { texto: 'texto', textonum: 'textonum', todo: 'todo', num: 'num', moneda: 'moneda' });
    angular.module('sc.directivas').constant('tamanoPanel', { completo: 'completo', medio: 'medio', tercio: 'tercio', cuarto: 'cuarto' });
    angular.module('sc.directivas').constant('tipoCombo', { normal: 'normal', multiple: 'multiple' });

})();