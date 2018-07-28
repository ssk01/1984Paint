class SKpaint{
    constructor(canvas){
        this.canvas = canvas
        this.ctx = canvas.getContext('2d');
        this.imgs = []
        this.toobarMode = 'drawLine'
        this.lineWidth = 20
        this.lineWidthMode = 4
    }
    add(img){   
        this.imgs.push(img)
        log('add', img)
    }
    newImg(x, y, canvas){
        if (this.toobarMode == 'drawLine'){
            return new Line(x, y, canvas)
        }
        return new Rect(x, y, canvas)
    }
    draw(){
        var ctx = this.ctx
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // log('addsss', this.imgs)
        for (var img of this.imgs){
            // log('fuck', img, this.imgs, )
            img.draw()
        }
    }
    setToolBar(toobarMode){
        this.toobarMode = toobarMode
    }
    setLineWidthMode(level){
        this.lineWidthMode = level
        this.lineWidth = lineWidthConfig[level]
    }
    update(){

        for (var img of this.imgs){
            img.update(this.lineWidthMode, this.lineWidth)
        }
    }
}