(function() {
    'use strict';

    var detailSolutionCtrl = function($scope, APIFactory, $location, $stateParams) {
        console.log('detailSolutionCtrl');

        console.log('$stateParams:', $stateParams.selected_id);
        if ($stateParams.selected_id) {
            APIFactory.getDetailSolution($stateParams.selected_id, function(err, data) {
                if (data.statusCode == 200 && data.response.success) {
                    $scope.details = data.response.result;
                    console.log('$scope.details:', $scope.details);
                }
            });
        }
    };

    Application.Controllers.controller('detailSolutionCtrl', ['$scope', 'APIFactory', '$location', '$stateParams', detailSolutionCtrl]);

})();
