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

    var eraser = function(x, y, click){

    }
    var drawRect = function(x, y, click){
        if (click){
            ctx.fillStyle = 'black';
            ctx.fillRect(x * barw, y * barh, barw, barh)
            ctx.strokeStyle = 'white';
            ctx.strokeRect( x*barw+10, y*barh+10, barw-20, barh-20);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.strokeStyle = 'black';
            ctx.strokeRect( x*barw+10, y*barh+10, barw-20, barh-20);
        }
    }
    var fillRect = function(x, y, click){
        if (click){
            ctx.fillStyle = 'black';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.fillStyle = 'blue';
            ctx.fillRect( x*barw+10, y*barh+10, barw-20, barh-20);
        }else{
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.fillStyle = 'blue';
            ctx.fillRect( x*barw+10, y*barh+10, barw-20, barh-20);
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
    var linePolygon = function(x, y, click){
        if (click) {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.strokeStyle = 'lightblue';
            ctx.fillRect( x*barw+10, y*barh+10, barw-20, barh-20);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.strokeStyle = 'lightblue';
            ctx.strokeRect( x*barw+10, y*barh+10, barw-20, barh-20);
        }
    }
    var fillLinePolygon = function(x, y, click){
        if (click) {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.strokeStyle = 'lightblue';
            ctx.fillRect( x*barw+10, y*barh+10, barw-20, barh-20);
        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            ctx.strokeStyle = 'lightblue';
            ctx.strokeRect( x*barw+10, y*barh+10, barw-20, barh-20);
        }
    }

    var selectRect = function(x, y ,click){
        if (click){
            // drawDashRect(ctx,x*barw+10, y*barh+10, barw-20, barh-20, 0)
            ctx.fillStyle = 'lightblue';
            ctx.fillRect( x*barw+10, y*barh+10, barw-20, barh-20);
            // ctx.fillRect(x * barw, y * barh, barw-1, barh)
        
            drawDashRect(ctx,x*barw+10, y*barh+10, barw-20, barh-20, 3)

        } else {
            ctx.fillStyle = 'white';
            ctx.fillRect(x * barw, y * barh, barw-1, barh)
            drawDashRect(ctx,x*barw+10, y*barh+10, barw-20, barh-20, 0)
        }
    }
    var drawPencil = function(x, y, click){
        ctx.fillStyle = 'white';
        ctx.fillRect(x * barw, y * barh, barw-1, barh)
        drawDashRect(ctx,x*barw+10, y*barh+10, barw-20, barh-20, 0)
    }
    var brush = function(x, y, click){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x * barw, y * barh, barw-1, barh)
        drawDashRect(ctx,x*barw+10, y*barh+10, barw-20, barh-20, 0)
    }
    var canvasToolbarDraw = {
        'drawLine': drawLine,
        'drawRect': drawRect,
        'fillRect': fillRect,
        'eraser': eraser,
        'linePolygon': linePolygon,
        'fillLinePolygon':fillLinePolygon,
        'selectRect': selectRect,
        'drawPencil': drawPencil,
        'brush': brush,
    }
    var canvasToolbarConfig = [
        ['drawLine', 'eraser'],
        ['drawRect', 'fillRect'],
        ['linePolygon', 'fillLinePolygon'],
        ['selectRect'],
        ['drawPencil', 'brush'],
    ]
    drawLine(0, 0, true)
    drawRect(0, 1, false)
    fillRect(1, 1, false)
    linePolygon(0, 2, false)
    fillLinePolygon(1, 2, false)
    selectRect(0, 3, false)
    drawPencil(0, 4, false)
    brush(1, 4, false)
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