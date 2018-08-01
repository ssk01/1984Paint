class Line {
    constructor(x, y, canvas, lineWidthMode, lineWidth){
        this.x = x 
        this.y = y
        this.endx = x
        this.endy = y
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
        this.finish = false
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
    }
    end(){
        // this.finish = true
    }
    draw(){
        var ctx = this.ctx
        // ctx.strokeStyle = '0xff0000'
        ctx.strokeStyle = 'lightblue';
        ctx.fillStyle = 'lightblue';
        if (this.lineWidthMode == 0){
            var x = this.x
            var y = this.y
            var endx = this.endx
            var endy = this.endy 
            ctx.beginPath();
            ctx.setLineDash([3, 10]);
            ctx.moveTo(x, y);
            ctx.lineTo(endx, endy);
            ctx.stroke();
            return
        }
        // mode 对应x,y为原点 endx，endy所在正常二维坐标系的象限。
        var mode = 0
        var x = this.x
        var y = this.y
        var endx = this.endx
        var endy = this.endy
        // log('draw line ',ctx ,x,y, endx, endy, this.lineWidth)
        ctx.fillStyle = 'black';

        // ctx.fillRect(x,y,endx - x,endy -y)
        // return
        if (this.endx > this.x && this.endy > this.y) {
            mode = 4
        }
        else if(this.endx < this.x && this.endy < this.y){
            mode = 2
            x = this.endx
            y = this.endy
            endx = this.x
            endy = this.y
        }
        else if(this.endx > this.x && this.endy < this.y){
            mode = 1
        }                    
        else if(this.endx < this.x && this.endy > this.y){
            mode = 3
            x = this.endx
            y = this.endy
            endx = this.x
            endy = this.y
        }
        var lineWidth = this.lineWidth
        ctx.beginPath();
        if (mode == 2 || mode == 4) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + lineWidth, y);
            ctx.lineTo(endx + lineWidth, endy);
            ctx.lineTo(endx + lineWidth, endy + lineWidth);
            ctx.lineTo(endx, endy + lineWidth);
            ctx.lineTo(x, y + lineWidth);
        } else {
            ctx.moveTo(x, y);
            ctx.lineTo(endx, endy);
            ctx.lineTo(endx + lineWidth, endy);
            ctx.lineTo(endx + lineWidth, endy + lineWidth);
            ctx.lineTo(x + lineWidth, y + lineWidth);
            ctx.lineTo(x, y + lineWidth);
        }
        ctx.closePath();
        ctx.fill();
        // log(this.x, this.y, lineWidth, this.endx, this.endy)
         // draws last line of the triangle
        // drawRect(x, y, lineWidth, lineWidth)
    }
    setEend(endx, endy){
        this.endx = endx
        this.endy = endy
    }
        
    update(lineWidthMode, lineWidth){
        // if (this.finish){
        //     return
        // }
        // this.lineWidthMode = lineWidthMode
        // this.lineWidth = lineWidth
    }
}