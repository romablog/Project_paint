/**
 * Created by Андрей on 21.01.2016.
 */

var v1 = angular.module('myApp.view1');

v1.directive('canvasDirective', ['ImageService', function(ImageService) {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            var canvas = new fabric.Canvas(attrs.id, {
                isDrawingMode: true
            });
            canvas.stateful = false;
            //fabric.Object.prototype.transparentCorners = false;

            scope.Clear = function() {
                canvas.clear();
                if(scope.is_hanging == true) {
                    canvas.remove(image);
                    canvas.add(image);
                }
            };
            scope.Inc = function(inc) {
                canvas.freeDrawingBrush.width=inc;
            };
            scope.Color = function(color) {
                canvas.freeDrawingBrush.color = color;
            };
            scope.FirstWidth = function(){
                scope.Inc(10);
            };
            scope.SecondWidth = function(){
                scope.Inc(20);
            };
            scope.ThirdWidth = function(){
                scope.Inc(30);
            };
            scope.$watch('brushcolor', function(newValue, oldValue) {
                scope.Color(newValue);
            });
            scope.$watch('brushwidth', function(newValue, oldValue) {
                scope.Inc(newValue);
            });

            var image = null;
            scope.is_hanging = false;

            scope.init_image = function(flag) {

                if (scope.is_hanging == false || flag == true) {
                    var img = new Image();
                    img.onload = function () {
                        image = new fabric.Image(img);
                        image.set({
                            height: ImageService.scaleSize(200, 110, img.width, img.height)[1],
                            width: ImageService.scaleSize(200, 110, img.width, img.height)[0],
                        });
                        canvas.add(image);
                        scope.is_hanging = true;
                    };
                    console.log("INIT_IMAGE", ImageService.file);
                    img.src = URL.createObjectURL(ImageService.file);

                } else {
                    scope.is_hanging = false;
                    canvas.remove(image);
                }

            };

            scope.brushcolor = '#0000CD';
            scope.brushwidth = 10;


            canvas.on('mouse:move', function(e) {
                // console.log("MOUSEMOVED", e.e.offsetX, e.e.offsetY );
                if (scope.is_hanging == true) {
                    image.set({
                        left:   e.e.offsetX,
                        top:    e.e.offsetY
                    });
                    canvas.renderAll();
                }
            });

            scope.w = 0;
            canvas.on('mouse:down', function(e) {
                if (scope.is_hanging == true) {

                    scope.w = canvas.freeDrawingBrush.width;
                    canvas.freeDrawingBrush.width = 0;

                    var local_img = new Image();
                    local_img.onload = function () {
                        var local_image = new fabric.Image(local_img);
                        console.log("Stamping", e.e.clientX, e.e.clientY);
                        local_image.set({
                            top: e.e.clientY - 121,
                            left: e.e.clientX - 105,
                            height:
                                ImageService.scaleSize(200, 110, local_img.width, local_img.height)[1],
                            width:
                                ImageService.scaleSize(200, 110, local_img.width, local_img.height)[0]
                        });

                        canvas.add(local_image);
                        canvas.remove(image);
                        canvas.add(image);
                    };
                    local_img.src=URL.createObjectURL(ImageService.file);
                }
            });
            canvas.on('mouse:up', function(e) {
                if(scope.is_hanging == true) {
                    canvas.freeDrawingBrush.width = scope.w;
                }
            });
        }
    }
}]);
