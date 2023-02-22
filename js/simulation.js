const ctx = simulation.getContext("2d");
simulation.height = ctx.canvas.height;
simulation.width = ctx.canvas.width;
const simulationFrame = 5;

// animate updating varriable
let frame = 0;
let newWavelength = 380;
let voltage = 0;

let KE = 1.4394e-19;
let velocity = 5.6245e+5;
let isElectronMove = true;
let electronIntensity = 101 - intensitySlider.value;
let noOfElectrons = 0;
let current = "0.00e+0";
let lampIntensity = 0;


// electrons
const electrons = [];


function drawLine(x1,y1,x2,y2,lineWidth,strokeColor){
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(x1,y1)
    ctx.lineTo(x2, y2);
    ctx.stroke(); 
}

class Chamber {
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawChamber(){
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}

class Electrode{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawElectrode(){
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    updateElectrode(color){
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Ammeter{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.terminal = {
            negative: {
                x: this.x + 16,
                y: this.y - 16,
                width: 16,
                height: 16,
                color: "black"
            },
            positive: {
                x: this.x + this.width - 32,
                y: this.y - 16,
                width: 16,
                height: 16,
                color: "red"
            }
        }
    }

    drawAmmeter(current){
        // ammeter outer 
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        // ammeter inner
        ctx.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height/2 );

        // terminal
        const terminal = this.terminal;
        ctx.fillStyle = terminal.negative.color;
        ctx.fillRect(terminal.negative.x,terminal.negative.y,terminal.negative.width,terminal.negative.height)
        ctx.fillStyle = terminal.positive.color;
        ctx.fillRect(terminal.positive.x,terminal.positive.y,terminal.positive.width,terminal.positive.height)
        ctx.font = "15px Arial";
        ctx.fillText(current + "A",this.x + this.width/2 - 30,this.y + 35)
    }
}

class Battery{
    constructor(x,y,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.terminal = {
            negative: {
                x: this.x + 16,
                y: this.y - 16,
                width: 16,
                height: 16,
                color: "black"
            },
            positive: {
                x: this.x + this.width - 32,
                y: this.y - 16,
                width: 16,
                height: 16,
                color: "red"
            }
        };
       
    }

    drawBattery(voltage){
        // battery outer 
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        // terminal
        const terminal = this.terminal;
        if(voltage < 0){
            ctx.fillStyle = "red";
            ctx.fillRect(terminal.negative.x,terminal.negative.y,terminal.negative.width,terminal.negative.height)
            ctx.fillStyle = "black";
            ctx.fillRect(terminal.positive.x,terminal.positive.y,terminal.positive.width,terminal.positive.height)
        }
        else {
            ctx.fillStyle = terminal.negative.color;
            ctx.fillRect(terminal.negative.x,terminal.negative.y,terminal.negative.width,terminal.negative.height)
            ctx.fillStyle = terminal.positive.color;
            ctx.fillRect(terminal.positive.x,terminal.positive.y,terminal.positive.width,terminal.positive.height)
        }
        ctx.font = "30px Arial";
        ctx.fillText(voltage + "V",this.x + this.width/2 - 20,this.y + this.height/2 + 10)
    }
}

class Lamp{
    constructor(x,y,radiusX,radiusY,rotation){
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.rotation = rotation;
    }

    drawLamp(){
        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
        ctx.stroke();

        const lampStand = [
            {
                x1: this.x - 66,
                y1: this.y - 37,
                x2: this.radiusY * 4 + 50,
                y2: 10,
            },
            {
                x1:this.x + 66, 
                y1:this.y + 37,
                x2:this.radiusY * 4 + 50,
                y2:10
            },
            {
                x1:this.radiusY * 4 + 30,
                y1:40,
                x2:this.radiusY * 5 + 25,
                y2:this.y - 25
            },
            {
                x1:this.radiusY * 5 + 25,
                y1:this.y - 25,
                x2:this.radiusY * 5 + 25,
                y2:chamber.y
            },
            {
                x1:this.radiusY * 4 + 21,
                y1:55,
                x2:this.radiusY * 5 + 5,
                y2:this.y - 16
            },
            {
                x1:this.radiusY * 5 + 5,
                y1:this.y - 16,
                x2:this.radiusY * 5 + 5,
                y2:chamber.y
            }


        ]
        lampStand.forEach(stand => {
            drawLine(stand.x1,stand.y1,stand.x2,stand.y2,2,"#000")
        })
    }
    changeLampColor(color,wavelength,intensity){
        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.fillStyle = color
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, 0, 2 * Math.PI);
        ctx.fill();
       
        ctx.save();
        ctx.beginPath();
        ctx.translate( this.x + 66,this.y + 37 );
        ctx.rotate(120*Math.PI/180);
        ctx.clearRect( 0, 0, 225,lamp.radiusY * 2);
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.translate( this.x + 66,this.y + 37 );
        ctx.rotate(120*Math.PI/180);
        ctx.rect( 0, 0, 225,lamp.radiusY * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }
}

class Electron{
    constructor(x,y,radius,velocity){
        this.velocity = velocity
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.minX = cathode.x+cathode.width;
        this.minY = cathode.y;
        this.maxX = anode.x;
        this.maxY = anode.y + anode.width;
        this.negativeVelocity = 0;
        this.isAlreadyMove = false;
    }

    moveElectron(stopPotential){
        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.fillStyle = "red"
        ctx.arc(this.x + this.radius,this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke()


        ctx.moveTo(this.x,this.y)
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x + this.radius/2,this.y - (this.radius/6),this.radius,this.radius/3)
        ctx.fill()
        if(this.x >= cathode.x + 400 - ((-voltage) * 20)){
            this.negativeVelocity = 10;
            this.isAlreadyMove = true;
        }
        if((this.negativeVelocity > 0) && voltage <= stopPotential){
            this.x -= this.negativeVelocity
        }
        else{
            this.x+=(this.velocity * 0.1) + 1;
        }
    }
}

function  clearElectron(x,y,radius) {
    ctx.save();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
};


// equipment
const chamber = new Chamber(100,(simulation.height/2 )- 150,500,150)
const cathode = new Electrode(chamber.x + 10,chamber.y+10,10,chamber.height-20);
const anode = new Electrode((chamber.x + chamber.width) - 20,chamber.y+10,10,chamber.height-20);
const ammeter = new Ammeter(chamber.x + chamber.width/2 + 50,anode.y + (anode.height/2) + 250 + 8,100,100);
const battery = new Battery(chamber.x + 100,anode.y + (anode.height/2) + 250 + 8,150,100);
const lamp = new Lamp(200,100,10,75,Math.PI / -3)



// wire
const wires = [
    {
        x1: cathode.x,
        y1: cathode.y + (cathode.height/2),
        x2: cathode.x-70,
        y2: cathode.y + (cathode.height/2)
    },
    {
        x1: cathode.x-70,
        y1: cathode.y + (cathode.height/2),
        x2: cathode.x-70,
        y2: cathode.y + (cathode.height/2) + 250
    },
    {
        x1: anode.x,
        y1: anode.y + (anode.height/2),
        x2: anode.x+70,
        y2: anode.y + (anode.height/2)
    },
    {
        x1: anode.x+70,
        y1: anode.y + (anode.height/2),
        x2: anode.x+70,
        y2: anode.y + (anode.height/2) + 250
    },
    
    
    {
        x1: anode.x+70,
        y1: anode.y + (anode.height/2) + 250,
        x2: ammeter.terminal.positive.x + ammeter.terminal.positive.height,
        y2: cathode.y + (cathode.height/2) + 250,
    },

    {
        x1: battery.terminal.positive.x + battery.terminal.positive.width,
        y1: battery.terminal.positive.y + battery.terminal.positive.height / 2,
        x2: ammeter.terminal.negative.x,
        y2: battery.terminal.positive.y + battery.terminal.positive.height / 2,
    },
    {
        x1: cathode.x-70,
        y1: battery.terminal.negative.y + battery.terminal.negative.height / 2,
        x2: battery.terminal.negative.x,
        y2: battery.terminal.negative.y + battery.terminal.negative.height / 2
    },
]

let intensity = 0;
let lampColor = wavelengthToRgba(380,intensity);

function drawCircuit(newWavelength,voltage,current){
    lamp.changeLampColor(lampColor,newWavelength,0)
    lamp.drawLamp()
    chamber.drawChamber()
    cathode.drawElectrode()
    anode.drawElectrode()
    ammeter.drawAmmeter(current)
    battery.drawBattery(voltage)

    wires.forEach((wire) => {
        drawLine(wire.x1,wire.y1,wire.x2,wire.y2,2,"#000")
    })


   
}


drawCircuit(380,voltage,current)

// is stopping potetial applied
let isStoppingPotentialApplied = false;
let stopPotential = stoppingPotetial.value;

// electron animation
function updateAnimation(){
    clearElectron(simulation.width/2, simulation.height/2, simulation.width);
    drawCircuit(newWavelength,voltage,current);
    if(electrons.length === 0){
    anode.updateElectrode("#000")
    return;
    }

    electrons.forEach((electron,i) => {
        electron.moveElectron(isStoppingPotentialApplied);
        if((electron.x + electron.radius >= electron.maxX) || ((electron.x  <= electron.minX) && (electron.isAlreadyMove)) ){
            const electronPosition = i;
            electrons.splice(electronPosition,1);
            anode.updateElectrode("red")

            return;
        }
    })  
}





// check KE
function checkKE(ke){
    if(ke < 0){
        kineticEnergy.value = "KE not gained"
        isElectronMove = false;
    }
    else{
        kineticEnergy.value = ke
        isElectronMove = true;
    }
}


// check velocity
function checkVelocity(v){
    if(v >= 0 && !isNaN(v)){
        electronVelocity.value = v;
        electronGainedVelocity = v;
    }
    else{
        electronVelocity.value = "Velocity not gained"
        electronGainedVelocity = false;
    }
}

let frameLimit = 20;



function animate(){
    // clear canvas for clear animation
    ctx.clearRect(0,0,simulation.width,simulation.height)
    

    // intensity slider
    intensitySlider.addEventListener("change",(e) => {
        intensity = ((e.target.value)/100);
        intensity = intensity === 0.80 ? 0 : intensity;
        lampIntensity = intensity === 0 ? 0 : intensity - 0.7
        lampColor = wavelengthToRgba(parseInt(slider.value),lampIntensity)
        electronIntensity = (101 - parseFloat(e.target.value))/2;
        noOfElectrons = Math.abs(100- e.target.value - 20) * 5;
       // photocurrent
       if(voltage <= stoppingPotetial.value){
        photoCurrent.value = "0.00e+0";
        current = "0.00e+0";
       }
       else{
        const newCurrent = (noOfElectrons * electronCharge)/1;
        photoCurrent.value = newCurrent.toExponential(2);
        current = newCurrent.toExponential(2);
       }
    })

    metalsDiv.addEventListener("change",(e) => {
        targetMetal = parseFloat(e.target.value)
        energySupplied = wavelengthToenergySupplied(wavelength,h,electronCharge);
        checkKE(calculateKE(energySupplied,targetMetal))
        checkVelocity(calculateVelocity(parseFloat(kineticEnergy.value),electronCharge,electronMass))
   })

    // wavelength slider
    slider.addEventListener("change",(e) => {
        lampColor = wavelengthToRgba(parseInt(slider.value),lampIntensity)
        energySupplied = wavelengthToenergySupplied(wavelength,h,electronCharge);
        const ke = calculateKE(energySupplied,targetMetal);
        checkKE(ke)
        checkVelocity(calculateVelocity(parseFloat(kineticEnergy.value),electronCharge,electronMass))
        stoppingPotetial.value = calculateStoppingPotential(ke,electronCharge)
        newWavelength = e.target.value;
    })

    // voltage slider
    voltageSlider.addEventListener("change",(e) => {
        voltageDiv.innerHTML = `${e.target.value} V`
        const potential = parseFloat(e.target.value);
        voltage = potential
        isStoppingPotentialApplied = false;

        if(potential <= stoppingPotetial.value){
            isStoppingPotentialApplied = true;
            photoCurrent.value = "0.00e+0";
            current = "0.00e+0";
        }
        else{
            // photocurrent
            const newCurrent = (noOfElectrons * electronCharge)/1;
            photoCurrent.value = newCurrent.toExponential(2);
            current = newCurrent.toExponential(2);
        }
    })


    
    // changeLampColor
    lamp.changeLampColor(lampColor,newWavelength,intensity)
    frame++;

    // frame
    if(frame === 400){
         frame = 0;
    }

    // frame
    // if(frame % frameLimit === 0 && intensity !== 0){
      if(isElectronMove){
        let electronNewVelocity = (velocity >= 0 && !isNaN(velocity)) ? Math.floor((velocity/(10 ** 5))) + 1 : 0;
        if(newWavelength <= 400 && newWavelength >= 380){
            electronNewVelocity = electronNewVelocity * 25;
        }
        if(newWavelength <= 500 && newWavelength >= 401){
            electronNewVelocity = electronNewVelocity * 15;
        }

        if(newWavelength <= 550 && newWavelength >= 501){
            electronNewVelocity = electronNewVelocity * 10;
        }

        if(newWavelength <= 600 && newWavelength >= 551){
            electronNewVelocity = electronNewVelocity * 7.5;
        }

        if(newWavelength <= 650 && newWavelength >= 601){
            electronNewVelocity = electronNewVelocity * 5;
        }

        if(newWavelength <= 700 && newWavelength >= 651){
            electronNewVelocity = electronNewVelocity * 4;
        }

        if(newWavelength <= 780 && newWavelength >= 701){
            electronNewVelocity = electronNewVelocity * 2;
        }

    if(frame % electronIntensity === 0 && intensity !== 0){
            const positionY = cathode.y + (Math.floor(Math.random() * cathode.height))
            electrons.push(new Electron(cathode.x+cathode.width,positionY,7,Math.floor(electronNewVelocity)))  
    }

    
    }

    updateAnimation()
    requestAnimationFrame(animate)
}
animate();


