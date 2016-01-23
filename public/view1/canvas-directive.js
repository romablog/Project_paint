/**
 * Created by Андрей on 21.01.2016.
 */

var v1 = angular.module('myApp.view1');

v1.directive('canvasDirective', ['$http', '$interval', 'ImageService', function($http, $interval, ImageService) {
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            var canvas = new fabric.Canvas(attrs.id, {
                isDrawingMode: true,
                backgroundColor : "#414476"

            });

            $http.get('/link').then(function(responce){
                console.log(responce);
                var savedCanvas = new Image();
                savedCanvas.crossOrigin='Anonymous';
                savedCanvas.src = responce.data;
                canvas.add(new fabric.Image(savedCanvas,{
                    top: 0 ,
                    left: 0
                }));
            });



            canvas.stateful = false;

            var image = null;
            scope.is_hanging = false;
            //fabric.Object.prototype.transparentCorners = false;

            scope.send = function() {
                var url = canvas.toDataURL({format: 'jpeg', quality: 1});
                console.log(JSON.stringify(url));

                $http.post('/link', {data: url}).then(function(){console.log('Sent successfully!')}, function(){console.log('sth went wrong')});
            };

            $interval(function() {
                console.log('time!')
            }, 15000);

            scope.Clear = function() {
                canvas.clear();
                if(scope.is_hanging == true) {
                    canvas.remove(image);
                    canvas.add(image);
                }
            };
            scope.Inc = function(inc) {
                if(scope.is_hanging == true) {
                    canvas.remove(image);
                    scope.is_hanging = false;
                }
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


            scope.init_image = function(flag) {

                if (scope.is_hanging == false || flag == true) {
                    var img = new Image();
                    img.onload = function () {
                        image = new fabric.Image(img);
                        image.set({
                            height: ImageService.downScale(img).height,
                            width: ImageService.downScale(img).width
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
                            top: e.e.offsetY,
                            left: e.e.offsetX,
                            height:
                            ImageService.downScale(local_img).height,
                            width:
                            ImageService.downScale(local_img).width
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
