'use strict';

var app = angular.module('app', ['ngSanitize', 'ui.select']);

angular.module('app')
.controller('ctrl', ['$scope', function ($scope){
    $scope.itemArray = [
        {id: 1, name: 'first'},
        {id: 2, name: 'second'},
        {id: 3, name: 'third'},
        {id: 4, name: 'fourth'},
        {id: 5, name: 'fifth'},
    ];

    $scope.selectedItem = $scope.itemArray[0];


    $scope.addresses = [];
    $scope.refreshAddresses = function(address) {
        var params = {address: address, sensor: false};
        return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {params: params})
          .then(function(response) {
            $scope.addresses = response.data.results
          });
    };
}]);
