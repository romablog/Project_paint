var v1 = angular.module('myApp.view1');

v1.directive("dropDirective", ['ImageService', function(ImageService) {
    return {
        restrict : "AE",
        link: function (scope, elem) {

            elem.bind('dragenter', function(event) {
                elem.textContent = '';
                event.stopPropagation();
                event.preventDefault();
            });
            elem.bind('dragover', function(event) {
                event.stopPropagation();
                event.preventDefault();
            });
            elem.bind('drop', function(event) {

                event.stopPropagation();
                event.preventDefault();
                console.log("what", event.dataTransfer);

                var dt = event.dataTransfer || (event.originalEvent && event.originalEvent.dataTransfer);
                var files = event.target.files || (dt && dt.files);

                for (var i = 0, f; f = files[i]; i++) {
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(f);

                    reader.onload = (function(theFile) {
                        return function(e) {
                            var newFile = { name : theFile.name,
                                type : theFile.type,
                                size : theFile.size,
                                lastModifiedDate : theFile.lastModifiedDate
                            };

                            ImageService.imagelist.push({
                                stats: newFile,
                                file: theFile,
                                URL: URL.createObjectURL(theFile)
                            });
                            scope.$apply();
                            console.log("Imagelist", ImageService.imagelist.length);

                        };
                    })(f);

                    console.log("Processed", f);
                }
                ImageService.file = files[files.length - 1];
            });
        }
    }
}]);