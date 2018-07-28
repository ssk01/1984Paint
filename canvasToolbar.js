var initCanvasToobar = function(paint){
    var canvas = es('#canvasToolbar')[0]
    var ctx = canvas.getContext('2d');
    var width = canvas.width
    var height = canvas.height
    var num = 10
    // 50 40
    var barw = width / 2 
    var barh = height / num
    
    for (var i = 0; i < num; i++){
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, i * barh, barw, barh)
        ctx.strokeRect(barw, i * barh, barw, barh)
    } 
    var canvasToolbarConfig = [['drawLine', 'drawRect']]
 
    var drawRect = function(x, y, click){
        if (click){
            ctx.fillStyle = 'black';
            ctx.fillRect(x * barw, y * barh, barw, barh)
            ctx.strokeStyle = 'white';
            ctx.strokeRect( x*barw+10, y*barw+10, barw-20, barh-20);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw, barh)
            ctx.strokeStyle = 'black';
            ctx.strokeRect( x*barw+10, y*barw+10, barw-20, barh-20);
        }
    }
    var drawLine = function(x, y, click){
        if (click){
            log('click drawline', x, y)
            ctx.fillStyle = 'black';
            ctx.fillRect(x * barw, y * barh, barw, barh)
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(x * barw + 5, y * barh + 5);
            ctx.lineTo((x+1) * barw - 5 , (y+1) * barh - 5);
            ctx.stroke();
        } else {
            log('change draw line')
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw, barh)
            // ctx.clearRect(x * barw, y * barh, barw, barh)
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.moveTo(x * barw + 5, y * barh + 5);
            ctx.lineTo((x+1) * barw - 5 , (y+1) * barh - 5);
            ctx.stroke();
            // ctx.drawLine(+, y * barh,)
        }
    }
    var canvasToolbarDraw = {
        'drawLine': drawLine,
        'drawRect': drawRect,
    }
    drawLine(0, 0, true)
    drawRect(1, 0, false)
    var oldmode = 'drawLine'
    var oldxIdx = 0
    var oldyIdx = 0
    canvas.addEventListener('click', function(event){
        xy = getXY(event, canvas)
        x = xy[0]
        y = xy[1]
        xIdx = Math.floor(x/barw)
        yIdx =  Math.floor(y/barh)
        var mode = canvasToolbarConfig[yIdx][xIdx]
        log('click xidx yidx', xIdx, yIdx, mode )
        if (mode != oldmode){
            canvasToolbarDraw[oldmode](oldxIdx, oldyIdx, false)
            canvasToolbarDraw[mode](xIdx, yIdx, true)
            oldmode = mode
            oldxIdx = xIdx
            oldyIdx = yIdx
            paint.setToolBar(mode)
        }
    })
        // ctx.strokeStyle = 'green';
    // ctx.strokeRect(10, 10, 100, 100);
    log(canvas)
}