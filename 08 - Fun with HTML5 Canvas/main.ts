// === Let's grab our UI elements
// const canvas = document.getElementById("draw");
const canvas = document.querySelector("#draw") as HTMLCanvasElement;

// === Grab context (2D or 3D) are available
// NOTE You don't draw on canvas but instead on the context
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

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
let isDrawing: boolean = false; // click 'down' = true (ie click and hold)
// console.log(isDrawing);

// === Create variables for end of drawn line x, y coordinates storage
// NOTE To draw a line you need starting (x, y) and ending (x, y) coords
let lastX: number = 0;
let lastY: number = 0;

// === Create variables for HSL(hue, saturation, lightness)
let hue: number = 0;

// === Create direction variable that determines whether ctx.lineWidth increases/descreases
let lineWidthDirection: boolean = true;

// === Create a draw() function to handle the 'mousedown' (click and hold)
// NOTE We'll call draw() when we 'mousemove' over the canvas
function draw(e: MouseEvent) {
  // = Stop function if not 'mousedown'
  if (!isDrawing) return; // Stop func from executing
  // console.log(e);
  // TODO ? What's the difference between pageX/Y, clientX/Y, layerX/Y, offsetX/Y, screenX/Y?

  // = Time to implement actual drawing on canvas.
  // = Change the color of our stroke using ctx.strokeStyle and hsl(hue, saturation%, lightness%)
  // NOTE This goes from 0 - 360 and then loops for rainbow effect
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

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
  [lastX, lastY] = [e.offsetX, e.offsetY];
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
  } else {
    // Descrease the width
    ctx.lineWidth--;
  }
}

// === Let's load all our listeners
// NOTE screenX/Y= WHOLE screen of monitor (not just browser window)
// NOTE clientX/Y= ONLY visible window of browser
function loadListeners() {
  // Add 'mousedown' event listener to start drawing
  canvas.addEventListener("mousedown", (e: MouseEvent): void => {
    // Set isDrawing to true
    isDrawing = true;

    // Update the positions of lastX/Y using e.offsetX/Y
    // This is needed so that draw() ctx.moveTo() uses updated values
    [lastX, lastY] = [e.offsetX, e.offsetY];
  });

  // Add 'mousemove' event listener to our canvas element
  canvas.addEventListener("mousemove", draw);

  // Add 'mouseup' for when no longer holding down mouse click
  canvas.addEventListener("mouseup", () => (isDrawing = false));

  // Add 'mouseout' for when cursor leaves the window/canvas
  canvas.addEventListener("mouseout", () => (isDrawing = false));

  // Add 'dblclick' for clearing the canvas to start over
  canvas.addEventListener("dblclick", () => {
    // Reset/clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });
}

loadListeners();
