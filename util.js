var log = console.log.bind(console)
var getXY = function(event, canvas){
    // var rect = canvas.getBoundingClientRect();
    // var x = event.clientX - rect.left;
    // var y = event.clientY - rect.top;
    var  gCanvasElement = canvas
    var e = event
    var x;
    var y;
    if (e.pageX || e.pageY) { 
    x = e.pageX;
    y = e.pageY;
    }
    else { 
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
    } 
    x -= gCanvasElement.offsetLeft;
    y -= gCanvasElement.offsetTop;

    return [x, y]
}
var  getRect = function(x, y, endx, endy){
    var rec = []
    rec[0] = Math.min(x, endx)
    rec[1] = Math.min(y, endy)
    rec[2] = Math.max(x, endx)
    rec[3] = Math.max(y, endy)
    return rec
}
var pointInRect = function(x, y, x1, y1, w, h){
    return (x > x1 && x < x1+w && y > y1 && y < y1+h)
}
var drawDashLine =  function(ctx, x, y , endx, endy, offset){
    ctx.beginPath();
    ctx.strokeStyle= 'red'
    ctx.setLineDash([5, 10]);
   
    ctx.lineDashOffset = offset;
    ctx.moveTo(x, y);
    ctx.lineTo(endx, endy);
    ctx.stroke()
    // ctx.closePath()
    ctx.setLineDash([])
}
var drawDashRect = function(ctx, x, y, w, h, offset){
    drawDashLine(ctx, x, y, x+w, y, offset)
    drawDashLine(ctx, x, y, x, y+h, offset)
    drawDashLine(ctx, x+w, y, x+w, y+h, offset)
    drawDashLine(ctx, x, y+h, x+w, y+h, offset)
}