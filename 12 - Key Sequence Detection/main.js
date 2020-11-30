// Create a global keysPressed Array to capture all the inputs
var keysPressed = [];
// Create a global secret code we want to make (eg "upupdowndownleftright")
var secretCode = "dog";
// Add 'keyup' listener to window object for keys entered
window.addEventListener("keyup", function (e) {
    // console.log(e.key);
    // Let's push/append all these keys into our keysPressed array
    keysPressed.push(e.key); // Makes keysPressed.length 1 more than secretCode.length
    // TODO Need to use splice() to only keep the last secretCode.length inputs
    // This allows user to make mistakes but finally enter correct sequence
    // NOTE This took me a while to sort out. Check out my notes for deep dive.
    keysPressed.splice(-secretCode.length - 1, // Sets start index = 0
    keysPressed.length - secretCode.length // Sets deleteCount = 1
    );
    console.log(keysPressed); // Updated array with latest secretCode.length entries
    // Let's see if we get a match between the two
    if (secretCode.length !== keysPressed.length) {
        return; // stop
    }
    else {
        compareSequenceAndSecret(keysPressed, secretCode);
    }
});
// Add a function that compares the keysPressed to secretCode.
// If they match then do something
function compareSequenceAndSecret(seq, secret) {
    // === My Attempt
    // const seqString = seq.join("");
    // if (seqString.toLowerCase() === secret.toLowerCase()) {
    //   console.log("It's a match!");
    //   console.log(`${seqString.toLowerCase()} === ${secret.toLowerCase()}`);
    // } else {
    //   console.log("Same length but not a match!");
    //   console.log(`${seqString.toLowerCase()} === ${secret.toLowerCase()}`);
    // }
    // === Alternative
    if (seq.join("").includes(secret)) {
        console.log("DING DING! " + seq.join("") + " === " + secret);
        // Add cornify display for fun
        // NOTE This literally adds <div> elements to the DOM in your index.html
        // NOTE I can still add this even though we import cornify inside index.html
        cornify_add();
    }
}
