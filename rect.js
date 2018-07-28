class Rect {
    constructor(x, y, canvas){
        this.x = x 
        this.y = y
        this.endx = x
        this.endy = y
        this.lineWidthMode = 4
        this.lineWidthMode = 20
        this.finish = false
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
    }
    setFinish(){
        this.finish = true
    }
    draw(){
        var ctx = this.ctx
        // ctx.strokeStyle = '0xff0000'
        ctx.strokeStyle = 'lightblue';
        ctx.fillStyle = 'lightblue';
       
        var x = this.x
        var y = this.y
        var endx = this.endx
        var endy = this.endy
        ctx.fillRect(x, y, endx-x, endy-y)
        
        // log(this.x, this.y, lineWidth, this.endx, this.endy)
         // draws last line of the triangle
        // drawRect(x, y, lineWidth, lineWidth)
    }
    setEend(endx, endy){
        this.endx = endx
        this.endy = endy
    }
        
    update(lineWidthMode, lineWidth){
        if (this.finish){
            return
        }
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
    }
}