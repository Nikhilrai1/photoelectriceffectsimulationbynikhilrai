const canvas = document.getElementById("canvas");
const box = document.getElementById("box");
const input = document.getElementById("input");
console.log(input.value)

const ctx = canvas.getContext("2d");
canvas.height = 600;
canvas.width = 1200;
box.style.backgroundColor = input.value

input.addEventListener("change", () => {
    box.style.backgroundColor = input.value
})
class Electron{
    constructor(x,y,radius,velocity){
        this.velocity = velocity
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawElectron(){
        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.arc(this.x + this.radius,this.y + this.radius, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    moveElectron(){
        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.arc(this.x + this.radius,this.y + this.radius, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
        this.x+=this.velocity + 1;
    }
  
}

function  clearElectron() {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, canvas.width, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
};

const electrons = [];
for(let i=0; i<10; i++){
    electrons.push(new Electron(30*i,30*i,10,i))
}



function animate(){
    clearElectron();
    electrons.forEach((electron) => {
        electron.moveElectron();
    })
    requestAnimationFrame(animate)
}

// animate()




