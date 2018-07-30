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
