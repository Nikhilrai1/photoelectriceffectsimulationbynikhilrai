// Workfunction to Threshold Frequency
function workFunctionToThresholdFrequency(thresholdEnergy,h,e){
    const thresholdFrequency = (thresholdEnergy*e)/h;
    return thresholdFrequency.toExponential(4)
}

//Frequency to Energy supplied
function frequencyToenergySupplied(freq,h,e){
    const energy = h*freq*e;
    return energy.toExponential(4)
}

// Wavelength to Energy supplied
function wavelengthToenergySupplied(wavelength,h,e){
    const energy = (h*c)/(wavelength * e);
    return energy.toExponential(4)
}


// Workfunction to Threshold wavelength
function workFunctionToThresholdWavelength(thresholdEnergy,h,e,c){
    const thresholdWavelength = (h*c)/(thresholdEnergy*e)
    return thresholdWavelength.toExponential(4)
}

// Kinetic Energy
function calculateKE(energySupplied,thresholdEnergy){
    const KE = 1.67 * (10 ** (-19)) * (energySupplied - thresholdEnergy)
    return  KE.toExponential(4);
}

// Velocity of ejection of electron
function calculateVelocity(KE,e,m){
    const v = Math.sqrt((2*(KE))/m)
    return v.toExponential(4)
}

// Stopping Potential
function calculateStoppingPotential(KE,e){
    const vo = (KE/e);
    return vo.toExponential(4)
}



// set data in localstorage
function updateSimulationStorage(data){
     localStorage.setItem("simulation",JSON.stringify(data));
}

// get storage
function getSimulationStorage(){
   return JSON.parse(localStorage.getItem("simulation"))
}

// wavelength to frequency
function calculateFrequency(wavelength){
    const frequency = c/wavelength;
    return frequency.toExponential(4)
 }
// wavelength to rgb
function wavelengthToRgb(wavelength){
    var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
    if((wavelength >= 380) && (wavelength<440)){
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    }else if((wavelength >= 440) && (wavelength<490)){
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    }else if((wavelength >= 490) && (wavelength<510)){
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    }else if((wavelength >= 510) && (wavelength<580)){
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    }else if((wavelength >= 580) && (wavelength<645)){
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    }else if((wavelength >= 645) && (wavelength<781)){
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }else{
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };
    // Let the intensity fall off near the vision limits
    if((wavelength >= 380) && (wavelength<420)){
        factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
    }else if((wavelength >= 420) && (wavelength<701)){
        factor = 1.0;
    }else if((wavelength >= 701) && (wavelength<781)){
        factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };
    if (red !== 0){
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0){
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0){
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
    return `rgb(${red},${green},${blue})`;
}

// wavelength to rgb
function wavelengthToRgba(wavelength,opacity){
    var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
    if((wavelength >= 380) && (wavelength<440)){
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    }else if((wavelength >= 440) && (wavelength<490)){
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    }else if((wavelength >= 490) && (wavelength<510)){
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    }else if((wavelength >= 510) && (wavelength<580)){
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    }else if((wavelength >= 580) && (wavelength<645)){
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    }else if((wavelength >= 645) && (wavelength<781)){
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }else{
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };
    // Let the intensity fall off near the vision limits
    if((wavelength >= 380) && (wavelength<420)){
        factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
    }else if((wavelength >= 420) && (wavelength<701)){
        factor = 1.0;
    }else if((wavelength >= 701) && (wavelength<781)){
        factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };
    if (red !== 0){
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0){
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0){
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
    return `rgba(${red},${green},${blue},${opacity})`;
}

// wavelength to rgb
function wavelengthToFlash(wavelength,opacity){
    var Gamma = 0.80,
    IntensityMax = 255,
    factor, red, green, blue;
    if((wavelength >= 380) && (wavelength<440)){
        red = -(wavelength - 440) / (440 - 380);
        green = 0.0;
        blue = 1.0;
    }else if((wavelength >= 440) && (wavelength<490)){
        red = 0.0;
        green = (wavelength - 440) / (490 - 440);
        blue = 1.0;
    }else if((wavelength >= 490) && (wavelength<510)){
        red = 0.0;
        green = 1.0;
        blue = -(wavelength - 510) / (510 - 490);
    }else if((wavelength >= 510) && (wavelength<580)){
        red = (wavelength - 510) / (580 - 510);
        green = 1.0;
        blue = 0.0;
    }else if((wavelength >= 580) && (wavelength<645)){
        red = 1.0;
        green = -(wavelength - 645) / (645 - 580);
        blue = 0.0;
    }else if((wavelength >= 645) && (wavelength<781)){
        red = 1.0;
        green = 0.0;
        blue = 0.0;
    }else{
        red = 0.0;
        green = 0.0;
        blue = 0.0;
    };
    // Let the intensity fall off near the vision limits
    if((wavelength >= 380) && (wavelength<420)){
        factor = 0.3 + 0.7*(wavelength - 380) / (420 - 380);
    }else if((wavelength >= 420) && (wavelength<701)){
        factor = 1.0;
    }else if((wavelength >= 701) && (wavelength<781)){
        factor = 0.3 + 0.7*(780 - wavelength) / (780 - 700);
    }else{
        factor = 0.0;
    };
    if (red !== 0){
        red = Math.round(IntensityMax * Math.pow(red * factor, Gamma));
    }
    if (green !== 0){
        green = Math.round(IntensityMax * Math.pow(green * factor, Gamma));
    }
    if (blue !== 0){
        blue = Math.round(IntensityMax * Math.pow(blue * factor, Gamma));
    }
   return {red,green,blue};
}



// intensity fix function
function CalculateIntensity(intensity){
    return  Math.abs(100- Math.parseFloat(intensity) - 20) * 5;
}
