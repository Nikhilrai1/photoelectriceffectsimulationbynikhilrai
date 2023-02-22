const metalsDiv = document.getElementById("metals");
const frequencyDiv = document.getElementById("frequency");
const intensityDiv = document.getElementById("intensityDiv");
const thresholdWavelength = document.getElementById("thresholdWavelength");
const thresholdFrequency = document.getElementById("thresholdFrequency");
const slider = document.getElementById("slider");
const simulation = document.getElementById("simulation");
const intensitySlider = document.getElementById("intensitySlider");
const voltageSlider = document.getElementById("voltageSlider");
const voltageDiv = document.getElementById("voltageDiv");
const energyInput = document.getElementById("energy");
const electronVelocity = document.getElementById("electronVelocity");
const photoCurrent = document.getElementById("photoCurrent");
const kineticEnergy = document.getElementById("kineticEnergy");
const stoppingPotetial = document.getElementById("stoppingPotetial");


// (6.625 * Math.pow(10,-34) * 3 * Math.pow(10,8) * 1.67 * Math.pow(10,-19))/(380 * Math.pow(10,-9))

const bubble = document.getElementById("bubble");

// some physics constants
const h = 6.625 * (10**(-34)) // planck's constant
const c = 3 * (10**8); // speed of light
const electronMass = 9.1 * (10 ** (-31)) // kg
const electronCharge = 1.67 * (10 ** (-19)); // coloumb


const wavelengthCanvas = document.getElementById("wavelengthCanvas");
const wavelengthCtx = wavelengthCanvas.getContext("2d");
wavelengthCanvas.height = 50;
wavelengthCanvas.width = 400;