class SelectRect {
    constructor(x, y, canvas,  lineWidthMode, lineWidth, texturedata, texturew, textureh, fill){
        // left top x min y min
        this.x = x 
        this.y = y

        // init x point
        this.startx = x
        this.starty = y
        
        // right bottom x max y max
        this.rectx = x
        this.recty = y

        this.endx = 0
        this.endy = 0
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
        this.finish = false
        this.canvas = canvas
        this.buffer = null
        this.ctx = canvas.getContext('2d');
        this.fill = fill
        this.texturedata = texturedata
        this.texturew = texturew
        this.textureh = textureh
        this.i = 0
        this.move = false
        this.cursorStartX = 0
        this.cursorStartY = 0
        
        this.moveX = this.x
        this.moveY = this.y
        this.middle = false
    }
    startMove(x, y){
        // if (x > this.endx && x  < this.recx - this.x + this.endx && y > this.endy && y < this.endy,)
        if (pointInRect(x, y, this.moveX, this.moveY, this.rectx - this.x, this.recty - this.y)){
            if (this.buffer == null){

                this.move = true
            }
            this.cursorStartX = x
            this.cursorStartY = y
            this.endx = x
            this.endy = y
            this.middle = false
            return 0
        }
        log('ff ',x, y, this.moveX, this.moveX, this.rectx - this.x, this.recty - this.y)
        return 1
        // this.buffer = this.ctx.getImageData(this.x, this.y, this.rectx - this.x, this.recty - this.y)

    }
    setNextMoveStart(x, y){
        // if (this.move == false){
        //     return
        // }
        if(this.move){
            this.moveX = this.moveX + x - this.cursorStartX
            this.moveY = this.moveY + y - this.cursorStartY
            this.endx = 0
            this.endy = 0
            this.cursorStartX = 0
            this.cursorStartY = 0
            log(this.moveX, this.moveY)
            // this.move = false
            this.middle = true
        }
        // else{
        //     this.rectx = this.endx
        //     this.recty = this.endy
        // }
    }
    drawDashLine(x, y , endx, endy){
        var ctx = this.ctx
        ctx.beginPath();
        ctx.strokeStyle= 'red'
        ctx.setLineDash([5, 10]);
        this.i++
        if (this.i == 15) {
            this.i = 0
        }
        ctx.lineDashOffset = this.i;
        ctx.moveTo(x, y);
        ctx.lineTo(endx, endy);
        ctx.stroke()
    }
    drawDashRect(x, y, w, h){
        this.drawDashLine(x, y, x+w, y)
        this.drawDashLine(x, y, x, y+h)
        this.drawDashLine(x+w, y, x+w, y+h)
        this.drawDashLine(x, y+h, x+w, y+h)
    }
    draw(){
        if (this.move){
            // var ctx = this.ctx
            if (this.buffer == null){
                this.buffer = this.ctx.getImageData(this.x, this.y, this.rectx - this.x, this.recty - this.y)
            }
            this.ctx.clearRect(this.x, this.y, this.rectx - this.x, this.recty - this.y)
            if (this.middle){
                this.ctx.putImageData(this.buffer, this.moveX, this.moveY)

            }else{
                this.ctx.putImageData(this.buffer, this.moveX + this.endx-this.cursorStartX, this.moveY + this.endy -this.cursorStartY)

            }
            // log('fuck')

        // }else{
        }
        var x = this.moveX + this.endx-this.cursorStartX
        var y =  this.moveY + this.endy -this.cursorStartY
        if (!this.finish) {
            this.drawDashRect(x, y, this.rectx - this.x, this.recty - this.y)
        }
        log(x, y,  this.rectx - this.x, this.recty - this.y)
        // log()
        // this.drawDashLine(this.moveX + this.endx-this.cursorStartX, this.y, this.x, this.recty)
        // this.drawDashLine(this.rectx, this.y, this.rectx, this.recty)
        // this.drawDashLine(this.x, this.recty, this.rectx, this.recty)
    }
    setEend(endx, endy){
        if (this.move){
            this.endx = endx
            this.endy = endy
        } else {
            // var minx = Math.min(endx, this.x, endy, this.y)
            var rect = getRect(this.startx, this.starty, endx, endy)
            // var maxx = Math.max(endx, this.x)     
            this.x = rect[0]
            this.y = rect[1]
            this.moveX = this.x
            this.moveY = this.y
            // this.rectx = x
            // this.recty = y
            this.rectx = rect[2]
            this.recty = rect[3]
            log(this.x, this.rectx)
        }
    }
    end(){
        this.finish = true
        log('endend select Rect')
    }
}