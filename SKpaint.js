class SKpaint{
    constructor(canvas){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.buffer = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        this.imgs = []
        this.curImg = null
        this.toobarMode = 'drawLine'
        this.lineWidth = 20
        this.lineWidthMode = 4
        this.updateBuffer = false
        this.cursor = null
    }
    addCursor(img){
        this.cursor = img
    }
    add(img){   
        this.imgs.push(img)
        this.curImg = img
        this.updateBuffer = false
        log('add', img)
    }
    end(){
        this.updateBuffer = true
    }
    newImg(x, y, canvas){
        var img = null;
        if (this.toobarMode == 'drawLine'){
            img = new Line(x, y, canvas)
            this.add(img)
        } else{
            img = new Rect(x, y, canvas)

        }
        this.add(img)
        return img
    }
    draw(){
        this.ctx.putImageData(this.buffer, 0, 0)
        if (this.curImg != null){
            var ctx = this.ctx
            this.curImg.draw()
            if (this.updateBuffer){
                this.curImg = null
                this.buffer = this.ctx.getImageData(0, 0, canvas.width, canvas.height)

            }
        }
        this.cursor.draw()
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        // // log('addsss', this.imgs)
        // for (var img of this.imgs){
        //     // log('fuck', img, this.imgs, )
        //     img.draw()
        // }
    }
    setToolBar(toobarMode){
        this.toobarMode = toobarMode
    }
    setLineWidthMode(level){
        this.lineWidthMode = level
        this.lineWidth = lineWidthConfig[level]
    }
    update(){
        if (this.curImg != null){
            this.curImg.update(this.lineWidthMode, this.lineWidth)
        }
        // else {
        //     if (!this.updateBuffer){
        //         this.buffer = this.ctx.getImageData(0, 0, canvas.width, canvas.height)
        //     }
        // }
        // for (var img of this.imgs){
        //     img.update(this.lineWidthMode, this.lineWidth)
        // }
    }
}