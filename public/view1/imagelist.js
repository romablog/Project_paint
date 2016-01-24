var v1 = angular.module('myApp.view1');

v1.directive("imageDirective", ['ImageService', function(ImageService) {
    return {
        restrict : "AE",
        template: '<span><h6>{{image.stats.name}}</h6><img ng-src="{{image.URL}}" ng-click="select(image)" class="btn btn-default text-warning"/><button ng-click="remove(image)">X</button></span>',
        link: function(scope, elem) {
        }
    }
}]);

v1.controller("ImageListController", function($scope, ImageService) {
    $scope.images = ImageService.imagelist;
    $scope.remove = function(image) {
        var index = $scope.images.indexOf(image);
        $scope.images.splice(index, 1);
        console.log('trying to remove!');
        if ($scope.images.length == 0)
            $scope.init_image();
    };
    $scope.select = function(image) {
        ImageService.file = $scope.images[$scope.images.indexOf(image)].file;
        $scope.init_image(true);
    };
});