(function () {
    'use strict';

    angular
      .module('sc.directivas')
      .directive('scLabel', directivaLabel);

    

    function directivaLabel() {
        var directive = {           
            link: link,
            scope: {
                label: '@label'
            },
            restrict: 'E',
            templateUrl: 'app/Directives/Templates/DirectivaLabelTemplate.html'            
        };
        return directive;

        function link(scope, element, attrs) {            
        }
    }
})();