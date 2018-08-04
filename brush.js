class Brush {
    constructor(x, y, canvas,  lineWidthMode, lineWidth, texturedata, texturew, textureh, fill){
        this.x = x 
        this.y = y
        this.endx = x
        this.endy = y
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

        this.brushW = 10
        this.pointX = [x]
        this.pointY = [y]
    }
    end(){
        // this.finish = true
    }
    brush(x, y){
        // var buffer = 
        var texturey =  y % this.textureh 
        var w = canvas.width
        for (var i = 0; i < this.brushW; i++){
            var texturex = (x+i) % this.texturew
            this.buffer.data[(x+y*w+i)*4+3] = this.texturedata[(texturey* this.texturew + texturex)*4 +3]
            this.buffer.data[(x+y*w+i)*4+2] = this.texturedata[(texturey* this.texturew + texturex)*4 +2]
            this.buffer.data[(x+y*w+i)*4+1] = this.texturedata[(texturey* this.texturew + texturex)*4 +1]
            this.buffer.data[(x+y*w+i)*4+0] = this.texturedata[(texturey* this.texturew + texturex)*4 +0]

        }
        // this.ctx.putImageData(buffer, x, y)

    }
    draw(){
        // this.c
        this.buffer = this.ctx.getImageData(0, 0, canvas.width, canvas.height)

      for (var i = 0; i <this.pointX.length-1; i++){
        //   log(i,'ewrwe');
        // this.ctx.strokeRect(this.pointX[0], this.pointY[0])
        this.ctx.beginPath();
        // this.ctx.setLineDash([3, 10]);
        var x0 = this.pointX[i]
        var x1 = this.pointX[i+1]
        var y0 = this.pointY[i]
        var y1 = this.pointY[i+1]
        // var h = Math.max()
        for (var y = y0; y < y1; y++){
            var x = x0 + (x1-x0)*(y-y0)/(y1-y0)
            x = Math.floor(x)
            this.brush(x, y)
            // var x = this.pointX[0] + (this.pon)
        }
        
        // this.ctx.b
        }
        this.ctx.putImageData(this.buffer, 0, 0)
    }
    setEend(endx, endy){
        this.endx = endx
        this.endy = endy
        this.pointX.push(endx)
        this.pointY.push(endy)
    }
        
    update(lineWidthMode, lineWidth){
        // if (this.finish){
        //     return
        // }
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
    }
}