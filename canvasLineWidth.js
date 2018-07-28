var initCanvasLineWide = function(paint){
    log('paint linewide')
    var canvasLineWide = es('#canvasLineWide')[0]
    var ctx = canvasLineWide.getContext('2d');
    ctx.fillStyle="#000000";
    //300 *100
    var height = 300 / 5
    var begx = 35
    var width = 50
    var drawCanvasLineWide = function(){
        ctx.fillRect(begx, height * 4+10, width, 20)
        ctx.fillRect(begx, height * 3+10, width, 10)
        ctx.fillRect(begx, height * 2+10, width, 5)
        ctx.fillRect(begx, height * 1+10, width, 1)
        // ctx.fillRect(20, height * 0+10, 70, 0)
        // ctx.drawLine
        ctx.beginPath();
        ctx.setLineDash([3, 10]);
        ctx.moveTo(begx, 10);
        ctx.lineTo(begx+width, 10);
        ctx.stroke();
    }
    var drawCheckMark = function (level, height) {
        ctx.beginPath()
        var startX = 5
        var startY =  5 + level*height
        var midX = startX + 10
        var midY = startY + 10
        var endX = begx
        ctx.setLineDash([]);
        ctx.moveTo(startX, startY)
        ctx.lineTo(midX, midY)
        ctx.lineTo(endX, startY)
        ctx.stroke();
    }
    drawCanvasLineWide()
    canvasLineWide.addEventListener('click', function(event){
        var xy = getXY(event, canvasLineWide)
        var x = xy[0]
        var y = xy[1]
        var level = Math.floor(y/height)
        log('level', level,x , y)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paint.setLineWidthMode(level)
        // ctx.clearRect()
        drawCanvasLineWide()
        drawCheckMark(level, height )
    })
}
