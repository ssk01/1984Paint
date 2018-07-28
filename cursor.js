class Cursor{
    constructor(x, y,canvas){
        this.x = x 
        this.y = y
        this.lineWidth = 10
        this.modes = {'drawLine': this.lineCursor}
        this.mode = 'drawLine'
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');

    }
    lineCursor(t){
        // log('lineCursor')
        var ctx = t.ctx

        ctx.beginPath();
        ctx.fillStyle="#FF0000";
        var cursorLen = 30
        var halfCursorLen = cursorLen / 2
        var halfLineWidth = t.lineWidth / 2
        var x = t.x + halfLineWidth
        var y = t.y + halfLineWidth
        // ctx.moveTo(x, y);
        // log(x, y, t.x, halfLineWidth, halfCursorLen)                    
        ctx.moveTo(x - halfCursorLen, y - halfLineWidth);
        ctx.lineTo(x - halfLineWidth, y - halfLineWidth);
        ctx.lineTo(x - halfLineWidth, y - halfCursorLen);
        ctx.lineTo(x + halfLineWidth, y - halfCursorLen);
        ctx.lineTo(x + halfLineWidth, y - halfLineWidth);
        ctx.lineTo(x + halfCursorLen, y - halfLineWidth);
        ctx.lineTo(x + halfCursorLen, y + halfLineWidth);
        ctx.lineTo(x + halfLineWidth, y + halfLineWidth);
        ctx.lineTo(x + halfLineWidth, y + halfCursorLen);
        ctx.lineTo(x - halfLineWidth, y + halfCursorLen);
        ctx.lineTo(x - halfLineWidth, y + halfLineWidth);
        ctx.lineTo(x - halfCursorLen, y + halfLineWidth);
        ctx.closePath();
        ctx.fill();
    }
    setXY(x, y){
        this.x = x
        this.y = y
    }
    setMode(){

    }
    update(lineWidthMode, lineWidth){
        this.lineWidth = lineWidth
    }
    draw(){
        var t = this
        this.modes[this.mode](t)
    }
}