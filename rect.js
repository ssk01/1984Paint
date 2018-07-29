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
        this.buffer = null
        this.ctx = canvas.getContext('2d');
    }
    setFinish(){
        this.finish = true
    }
    storeOldBuffer(x, y, width, height){
        // this.oldbuffer = 
        log('old', this.buffer,this.ctx.getImageData(x, y, width, height))
        this.buffer = this.ctx.getImageData(x, y, width, height)
        log('th', this.buffer)
        this.ctx.clearRect(x, y, width, height);
    }
    drawline(buffer ,width,  y, x1, x2){
        for(var i = x1+1; i<x2;i++){
            buffer.data[(width*y+i)*4+3] = 255
            buffer.data[(width*y+i)*4+2] = 255
        }
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
        if (endx == x){
            return
        }
        if (endy == y) {
            return
        }
        var width =endx-x
        this.storeOldBuffer(x, y, endx-x, endy-y)
        // ctx.strokeRect(x, y, endx-x, endy-y)
        ctx.beginPath();
        // ctx.setLineDash([3, 10]);
        ctx.moveTo(x, y);
        ctx.lineTo(endx, endy);
        ctx.lineTo((endx +x)/2, (y+ endy)/2+20)
        ctx.closePath()
        ctx.stroke();
        this.newBuffer = this.ctx.getImageData(x, y, endx-x, endy-y)
        var vecs = []
        for (var b =y+1; b < endy-1; b++){
            var vec = []
            for (var a = x; a <=endx; a++){
                // log('this.newBuffer', ((b-y)*width+a-x)*4+3, this.newBuffer[0], this.newBuffer.data[((b-y)*width+a-x)*4+3])
                if (this.newBuffer.data[((b-y)*width+a-x)*4+3] != 0){
                    vec.push(a-x)
                    // log('foooo',a-x)
                }
                // if ( != [0, 0, 0, 0]) {
                // }
            }
            // return
            vecs.push(vec)
        }
        var b = 1
        log('vecs', vecs, vecs.length,x, y, width, endy-y, this.newBuffer)
        for (var vec of vecs){

            this.drawline(this.newBuffer, b, width, vec[0], vec[vec.length-1] )
            // for (var a of vec) {
            // }
            b++
        }
        log('length', this.buffer.data.length)
        for (var i = 0; i < this.buffer.data.length;i++){
            if (this.newBuffer.data[i] != 0){
                this.buffer.data[i] = this.newBuffer.data[i]
            }
        }
        this.ctx.putImageData(this.buffer, x, y)
        // this.ctx.putImageData(this.newBuffer, x, y)

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