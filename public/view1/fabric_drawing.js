(function() {
    var $ = function(id){return document.getElementById(id)};

    var canvas = new fabric.Canvas('c', {
        isDrawingMode: true
    });

    fabric.Object.prototype.transparentCorners = false;

    var drawingColorEl = $('drawing-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        clearEl = $('clear-canvas');

  //  clearEl.onclick = function() { canvas.clear() };

    //if (fabric.PatternBrush) {
    //
    //
    //    var img = new Image();
    //    //img.src = '../assets/honey_im_subtle.png';
    //
    //    //var texturePatternBrush = new fabric.PatternBrush(canvas);
    //    //texturePatternBrush.source = img;
    //}

    $('drawing-mode-selector').onchange = function() {


        if (this.value === 'texture') {
            canvas.freeDrawingBrush = texturePatternBrush;
        }
        else {
            canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
        }

        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
            //canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
        }
    };

    drawingColorEl.onchange = function() {
        canvas.freeDrawingBrush.color = this.value;
    };

    drawingLineWidthEl.onchange = function() {
        canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
        this.previousSibling.innerHTML = this.value;
    };

    if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = drawingColorEl.value;
        canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
    }
})();