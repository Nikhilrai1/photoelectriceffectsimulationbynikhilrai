
// initialization
let targetMetal = 2.12; // threshold energy of target metal
let wavelength = 380 * (10**(-9)); // convert nanmomter wavelength to meter
let frequency = (c/wavelength);
let energySupplied;
let electronGainedVelocity;
let electronsNumber = 0;


// initialization
frequencyDiv.value = frequency; 
intensityDiv.innerHTML = "0%"; 
intensitySlider.value = 0;
voltageDiv.innerHTML = "0 V"; 
voltageSlider.value = 0;
photoCurrent.value = "0.00e+0"
energyInput.value = wavelengthToenergySupplied(wavelength,h,electronCharge); // supplied energy
kineticEnergy.value = calculateKE(energyInput.value ,targetMetal)
electronVelocity.value = calculateVelocity(parseFloat(kineticEnergy.value),electronCharge,electronMass)
slider.value = wavelength;
stoppingPotetial.value = calculateStoppingPotential(kineticEnergy.value,electronCharge)
thresholdFrequency.value = workFunctionToThresholdFrequency(parseFloat(2.12),h,electronCharge);
thresholdWavelength.value = workFunctionToThresholdWavelength(parseFloat(2.12),h,electronCharge,c);

metalsDiv.addEventListener("change",(e) => {
     if(isNaN(e.target.value)){
        alert("The value of workfunction should be Number")
        return;
    }

   const newThresholdFrequency = workFunctionToThresholdFrequency(parseFloat(e.target.value),h,electronCharge)
   const newThresholdWavelength = workFunctionToThresholdWavelength(parseFloat(e.target.value),h,electronCharge,c)
    thresholdFrequency.value = newThresholdFrequency;
    thresholdWavelength.value = newThresholdWavelength;
})




// wavelength slider
slider.addEventListener("change",(e) => {
    wavelength = slider.value * (10**(-9));
    energySupplied = wavelengthToenergySupplied(wavelength,h,electronCharge);
    bubble.innerHTML = `${slider.value}nm`
    energyInput.value = energySupplied;
    const newFrequency = calculateFrequency(wavelength);
    frequencyDiv.value = newFrequency;
})



frequencyDiv.addEventListener("change",(e) => {
    const frequencyValue = e.target.value;
    const maxFrequency = 789473684210526.2;
    const minFrequency = 384615384615384.56;
    if(isNaN(frequencyValue)){
        alert("The value of frequency should be Number")
        return;
    }

    if(frequencyValue > maxFrequency){
        alert(`The frequency should not exceed max frequency of ${maxFrequency}`)
        return;
    }

    if(frequencyValue < minFrequency){
        alert(`The frequency should not lower than min frequency of ${minFrequency}`)
        return;
    }
    const calWavelength = Math.round((c/frequencyValue) * (10 ** 9))
    slider.value = calWavelength;
    bubble.innerHTML = calWavelength + "nm";

    
})

intensitySlider.addEventListener("change",(e) => {
    const intensity = Math.abs(100- e.target.value - 20) * 5;
    intensityDiv.innerHTML = intensity + "%";
})


metals.forEach(metal => {
    metalsDiv.innerHTML += `
    <option value='${metal.thresholdEnergy}'>${metal.name} (${metal.thresholdEnergy}ev)</option>
    `
})


slider.addEventListener("change",(e) => {
    kineticEnergy.value = calculateKE(energySupplied,targetMetal)
    console.log(calculateVelocity(kineticEnergy.value,electronCharge,electronMass))
    console.log(kineticEnergy.value)
})

