class LinePolygon {
    constructor(x, y,  canvas,  lineWidthMode, lineWidth, texturedata, texturew, textureh, fill){
        this.x = x 
        this.y = y
        this.fill = fill
        this.initx = x
        this.inity = y
        this.endx = x
        this.endy = y
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
        this.finish = false
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.texturedata = texturedata
        this.texturew = texturew
        this.textureh = textureh
        this.lines = []
        this.line = new Line(x, y, canvas, lineWidthMode, lineWidth)
        log(this.line, 'line poly')
        this.lines.push(this.line)
        this.minx = x
        this.miny = y
        this.maxx = x
        this.maxy = y
        this.buffer = null
    }
    storeOldBuffer(x, y, width, height){
        // this.oldbuffer = 
        log(x, y, width, height)
        log('old', this.buffer,this.ctx.getImageData(x, y, width, height))
        this.buffer = this.ctx.getImageData(x, y, width, height)
        log('th', this.buffer)
        this.ctx.clearRect(x, y, width, height);
    }
    drawline(buffer ,width,  y, x1, x2){
        for(var i = x1+1; i<x2;i++){
            var texturey =  y % this.textureh 
            var texturex = i % this.texturew
            // if (i%10 == 1  || i%10 == 2){
                buffer.data[(width*y+i)*4+3] = this.texturedata[(texturey* this.texturew + texturex)*4 +3]
                buffer.data[(width*y+i)*4+2] = this.texturedata[(texturey* this.texturew + texturex)*4 +2]
                buffer.data[(width*y+i)*4+1] = this.texturedata[(texturey* this.texturew + texturex)*4 +1]
                buffer.data[(width*y+i)*4+0] = this.texturedata[(texturey* this.texturew + texturex)*4 +0]
        }
    }
    fillIn(){
        if (this.maxx == this.minx || this.maxy == this.miny){
            return
        }
        var innerx = this.minx
        var innery = this.miny
        var innerw  =this.maxx - this.minx
        var innerh = this.maxy- this.miny
        this.storeOldBuffer(this.minx, this.miny, innerw+1, innerh)
        ctx.fillStyle = 'white'
        log('inner ', innerx, innery, innerw,innerh)
        ctx.fillRect(innerx, innery, innerw+1, innerh)
        for (var l of this.lines){
            l.draw()
            // log(l , 'poly draw')
        }
        this.newBuffer = this.ctx.getImageData(innerx, innery, innerw+1, innerh)
        log('fffck',this.newBuffer.data)
        var vecs = []
        for (var b = 0; b < innerh; b++){
            var vec = []
            for (var a = 0; a <=innerw; a++){
                if (this.newBuffer.data[(b*(innerw+1)+a)*4+1]  != 255){
                    vec.push(a)
                    // log('foooo',a-x)
                }
            }
            vecs.push(vec)
        }
        var b = 1
        log('vecs', vecs,  'fff',innerx, innery, innerw, innerh)// vecs.length,x, y, width, endy-y, this.newBuffer)
        for (var vec of vecs){
            log(vec[0],vec[vec.length-1])
            this.drawline(this.buffer,innerw+1, b, vec[0], vec[vec.length-1] )
            b++
        }
       
        this.ctx.putImageData(this.buffer, innerx, innery)
    }
    end(){
        if (this.fill){
            this.line.setEend(this.initx, this.inity)
            // this.fillIn()
        } else {
            this.line = null
            this.lines.pop()
        }
        this.finish = true
    }
    setEend(endx, endy){
        this.line.setEend(endx, endy)
        // log(this.line, 'line poly')

        // log(this.line, endx, endy)
        // this.endy = endy
    }
    setNewStart(startx, starty){
        log('set new start')
        this.x = startx
        this.y = starty
        this.minx = Math.min(this.minx, this.x)
        this.maxx = Math.max(this.maxx, this.x)
        this.miny = Math.min(this.miny, this.y)
        this.maxy = Math.max(this.maxy, this.y)

        // this.xy.push([startx, starty])
        this.line.setEend(startx, starty)
        this.line = new Line(startx, starty, this.canvas, this.lineWidthMode,this.lineWidth)
        log(this.line, 'line poly')

        this.lines.push(this.line)

    }
    // draw1(){
    //     this.line.draw()
    // }
    draw(){
        if (this.fill && this.finish){
            this.fillIn()
        }
                    for (var l of this.lines){
                        l.draw()
                        // log(l , 'poly draw')
                    }
    }        
    update(lineWidthMode, lineWidth){
        if (this.finish){
            return
        }
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
    }
}