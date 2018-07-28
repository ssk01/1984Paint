var log = console.log.bind(console)
var getXY = function(event, canvas){
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return [x, y]
}