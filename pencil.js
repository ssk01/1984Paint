class Pencil {
    constructor(x, y, canvas, lineWidthMode, lineWidth){
        this.x = x 
        this.y = y
        this.endx = x
        this.endy = y
        this.pointX = [x]
        this.pointY = [y]
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
        // this.c
      for (var i = 0; i <this.pointX.length-1; i++){
        //   log(i,'ewrwe');
        // this.ctx.strokeRect(this.pointX[0], this.pointY[0])
        this.ctx.beginPath();
        // this.ctx.setLineDash([3, 10]);
        if (this.pointX[i] == this.pointX[i+1]){
            this.ctx.moveTo(this.pointX[i], this.pointY[i]);
            this.ctx.lineTo(this.pointX[i+1], this.pointY[i+1]);
            this.ctx.lineWidth = 2.5;
            this.ctx.stroke();
            this.ctx.lineWidth = 1;
        }else  if (this.pointY[i] == this.pointY[i+1]){
                this.ctx.moveTo(this.pointX[i], this.pointY[i]);
                // this.ctx.lineTo
                this.ctx.lineTo(this.pointX[i]-2, this.pointY[i+1]);
                this.ctx.lineWidth = 2.5;
                this.ctx.stroke();
                this.ctx.lineWidth = 1;
                this.ctx.lineTo(this.pointX[i+1], this.pointY[i+1]);
                this.ctx.stroke();
            
        } else {
            this.ctx.moveTo(this.pointX[i], this.pointY[i]);
            this.ctx.lineTo(this.pointX[i+1], this.pointY[i+1]);
            this.ctx.lineWidth = 10;

            this.ctx.stroke();
        }

        // this.ctx.b
      }
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