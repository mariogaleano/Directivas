(function () {
    'use strict';
    angular.module('sc.directivas').directive('scServerEval', scServerEval);

    function scServerEval() {
        var directiva = {
            require: 'ngModel',
            link: link,
            restrict: 'A'
        };
        return directiva;

        function link(scope, elm, attrs, ngModel) {
            ngModel.$asyncValidators.servereval = function (modelValue) {
                var defer = $q.defer();
                $timeout(function () {
                    if (modelValue === "") {
                        defer.resolve();
                    } else {
                        defer.reject();
                    }
                }, 2000);
                return defer.promise;
            }
        };
    }
})();