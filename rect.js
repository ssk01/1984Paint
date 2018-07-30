class Rect {
    constructor(x, y, canvas, fill){
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
        this.fill = fill
        this.texturedata = null
        this.texturew = null
        this.textureh = null
    }
    setFinish(){
        this.finish = true
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
                // buffer.data[(width*y+i)*4+2] = 255
                // log('ddddd')
            // } else {
            //     buffer.data[(width*y+i)*4+3] = 255
            //     buffer.data[(width*y+i)*4+2] = 255
            //     buffer.data[(width*y+i)*4+1] = 255
            //     buffer.data[(width*y+i)*4+0] = 255
            // }
        }
    }
    draw(){
        var ctx = this.ctx
        // ctx.strokeStyle = '0xff0000'
        ctx.strokeStyle = 'lightblue';
        ctx.fillStyle = 'lightblue';
        
        var x = Math.min( this.x, this.endx)
        var y = Math.min( this.y, this.endy)
        var endx = Math.max( this.x, this.endx)
        var endy = Math.max( this.y, this.endy)
        if (endx == x){
            return
        }
        if (endy == y) {
            return
        }
        if (this.lineWidth * 2 >= Math.min( endx - x , endy -y)){
            ctx.fillStyle = 'black'
            ctx.fillRect(x, y, endx - x, endy -y)
        } else {
            var innerx = x + this.lineWidth
            var innery = y + this.lineWidth
            var innerw = endx -x -2*this.lineWidth
            var innerh = endy -y -2*this.lineWidth
            this.storeOldBuffer(innerx, innery, innerw+1, innerh)
            ctx.fillStyle = 'black'
            ctx.fillRect(x, y, endx - x, endy -y)
            ctx.fillStyle = 'white'
            ctx.fillRect(innerx+1, innery, innerw-1, innerh)
            if (this.fill){
                this.newBuffer = this.ctx.getImageData(innerx, innery, innerw+1, innerh)
                log('fffck',this.newBuffer.data)
                var vecs = []
                for (var b = 0; b < innerh; b++){
                    var vec = []
                    for (var a = 0; a <=innerw; a++){
                        // log('this.newBuffer', ((b-y)*width+a-x)*4+3, this.newBuffer[0], this.newBuffer.data[((b-y)*width+a-x)*4+3])
                        if (this.newBuffer.data[(b*(innerw+1)+a)*4+1]  != 255){
                            vec.push(a)
                            // log('foooo',a-x)
                        }
                        // if ( != [0, 0, 0, 0]) {
                        // }
                    }
                    // return
                    vecs.push(vec)
                }
                var b = 1
                log('vecs', vecs, x, y, endx, endy, 'fff',innerx, innery, innerw, innerh)// vecs.length,x, y, width, endy-y, this.newBuffer)
                for (var vec of vecs){

                    this.drawline(this.buffer,innerw+1, b, vec[0], vec[vec.length-1] )
                    // for (var a of vec) {
                    // }
                    b++
                }
                // log('length', this.buffer.data.length,this.buffer,this.buffer[1], this.buffer.length)
                // var data = this.newBuffer.data
                // for (var i = 0; i < data.length;i+=4){
                //     if (data[i] | data[i+1] | data[i+2]){
                //         this.buffer.data[i] = data[i]
                //         this.buffer.data[i+1] = data[i+1]
                //         this.buffer.data[i+2] = data[i+2]
                //         this.buffer.data[i+3] = data[i+3]
                //     }
                // }
            }
            this.ctx.putImageData(this.buffer, innerx, innery)
        }
    }
    setEend(endx, endy){
        this.endx = endx
        this.endy = endy
    }
        
    update(lineWidthMode, lineWidth, texturedata, texturew, textureh){
        if (this.finish){
            return
        }
        this.lineWidthMode = lineWidthMode
        this.lineWidth = lineWidth
        this.texturedata = texturedata
        this.texturew = texturew
        this.textureh = textureh
    }
}