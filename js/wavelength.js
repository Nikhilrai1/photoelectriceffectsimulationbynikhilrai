// fill wavelength color
let distanceX = 0;
for(let i=380; i<=780; i++){
    const rgb = wavelengthToRgb(i);
    wavelengthCtx.fillStyle = rgb;
    wavelengthCtx.fillRect(distanceX, 0, 1, wavelengthCanvas.height);
    distanceX++;
}




