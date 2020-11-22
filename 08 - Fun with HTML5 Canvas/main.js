// === Let's grab our UI elements
// const canvas = document.getElementById("draw");
var canvas = document.querySelector("#draw");
// === Grab context (2D or 3D) are available
// NOTE You don't draw on canvas but instead on the context
var ctx = canvas.getContext("2d");
// === Resize canvas to be size of our window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// === Configure our line look and color on our CanvasRenderingContext2D
ctx.strokeStyle = "#BADASS"; // color
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 25;
// === Enable Context.globalCompositeOperation to blend/overlap colors
// NOTE Several types: overlay, darken, color-dodge, luminosity, multiply, etc.
// ctx.globalCompositeOperation = "luminosity";
// === Create variable that flag whether we're drawing or not
var isDrawing = false; // click 'down' = true (ie click and hold)
// console.log(isDrawing);
// === Create variables for end of drawn line x, y coordinates storage
// NOTE To draw a line you need starting (x, y) and ending (x, y) coords
var lastX = 0;
var lastY = 0;
// === Create variables for HSL(hue, saturation, lightness)
var hue = 0;
// === Create direction variable that determines whether ctx.lineWidth increases/descreases
var lineWidthDirection = true;
// === Create a draw() function to handle the 'mousedown' (click and hold)
// NOTE We'll call draw() when we 'mousemove' over the canvas
function draw(e) {
    var _a;
    // = Stop function if not 'mousedown'
    if (!isDrawing)
        return; // Stop func from executing
    // console.log(e);
    // TODO ? What's the difference between pageX/Y, clientX/Y, layerX/Y, offsetX/Y, screenX/Y?
    // = Time to implement actual drawing on canvas.
    // = Change the color of our stroke using ctx.strokeStyle and hsl(hue, saturation%, lightness%)
    // NOTE This goes from 0 - 360 and then loops for rainbow effect
    ctx.strokeStyle = "hsl(" + hue + ", 100%, 50%)";
    // = Change the ctx.lineWidth to use hue value to increment or decrement
    // NOTE This just increments and then resets and increments again.
    // Better is to use a 'direction' variable instead
    // ctx.lineWidth = hue;
    // = Start a path for Context (ctx)
    ctx.beginPath();
    // Start from:
    ctx.moveTo(lastX, lastY);
    // Go to:
    ctx.lineTo(e.offsetX, e.offsetY);
    // Draw the actual stroke/line:
    ctx.stroke();
    // Update lastX/Y values using e.offsetX/Y
    _a = [e.offsetX, e.offsetY], lastX = _a[0], lastY = _a[1];
    // console.log({ lastX });
    // console.log({ lastY });
    // = Increment HSL hue value to loop from 0 - 360
    hue++;
    // NOTE Don't have to do this but you can
    if (hue >= 360) {
        // Reset hue back to 0 (again, not needed)
        hue = 0;
    }
    // = Set the range of lineWidth we want to allow
    if (ctx.lineWidth >= 25 || ctx.lineWidth <= 1) {
        // Limits have been reached so time to change the lineWidthDirection
        lineWidthDirection = !lineWidthDirection;
    }
    // = Increment or Decrement ctx.lineWidth using lineWidthDirection variable
    if (lineWidthDirection) {
        // Increase the width
        ctx.lineWidth++;
    }
    else {
        // Descrease the width
        ctx.lineWidth--;
    }
}
// === Let's load all our listeners
// NOTE screenX/Y= WHOLE screen of monitor (not just browser window)
// NOTE clientX/Y= ONLY visible window of browser
function loadListeners() {
    // Add 'mousedown' event listener to start drawing
    canvas.addEventListener("mousedown", function (e) {
        var _a;
        // Set isDrawing to true
        isDrawing = true;
        // Update the positions of lastX/Y using e.offsetX/Y
        // This is needed so that draw() ctx.moveTo() uses updated values
        _a = [e.offsetX, e.offsetY], lastX = _a[0], lastY = _a[1];
    });
    // Add 'mousemove' event listener to our canvas element
    canvas.addEventListener("mousemove", draw);
    // Add 'mouseup' for when no longer holding down mouse click
    canvas.addEventListener("mouseup", function () { return (isDrawing = false); });
    // Add 'mouseout' for when cursor leaves the window/canvas
    canvas.addEventListener("mouseout", function () { return (isDrawing = false); });
    // Add 'dblclick' for clearing the canvas to start over
    canvas.addEventListener("dblclick", function () {
        // Reset/clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
}
loadListeners();
