class Texture{
    constructor( canvas, paint){
        this.canvas = canvas
        this.w = 25
        this.h = 20
        this.paint = paint
        this.ctx = canvas.getContext('2d');
        this.init()
    }
    init(){
        var ctxText = this.ctx
        var img1 = new Image(); // HTML5 Constructor
        img1.src = 'texture1.png';
        img1.onload = function(){
            log('2323o k')
            ctxText.drawImage(img1, 0, 0)
            // var x = 25
            // var y = 20
            // ctxText.beginPath()
            // for (var i = 0; i< 5;i++){
            //     ctxText.moveTo(x * i, 0)
            //     ctxText.lineTo(x * i, y*3)
            //     ctxText.stroke()
            // }
            // ctxText.moveTo(0 , y)
            // ctxText.lineTo(800, y)
            // ctxText.stroke()
    
                //  ctx.Text.stroke
                log(img1)
        }
    }
    // addEventListener(){
    //     log(this.canvas,'dsfd')
    //     let canvas = this.canvas
      
    // }
}