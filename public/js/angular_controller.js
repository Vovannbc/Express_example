var app = angular.module("SampleApp", []);

app.controller("SampleAppCtrl", function ($scope) {
    $scope.styleObj = {
        color: false,
        border: false,
        size: false
    };
    $scope.clickHandler = function (color) {
        alert(color);
    }
}

);