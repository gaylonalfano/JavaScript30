// ===== IIFE to remove/fix the TS 2451 Error
(function () {
    // ===== GET OUR UI ELEMENTS
    var player = document.querySelector(".player");
    var video = player.querySelector(".viewer");
    var progress = player.querySelector(".progress");
    var progressBar = player.querySelector(".progress__filled");
    var playToggleButton = player.querySelector(".toggle");
    var skipButtons = player.querySelectorAll("[data-skip]");
    var fullscreenButton = player.querySelector(".fullscreen");
    var rangeSliders = player.querySelectorAll(".player__slider");
    // ===== BUILD OUR FUNCTIONS
    // == Create togglePlay() function to .play() / .pause()
    function togglePlay() {
        // Method #1
        // if (video.paused) {
        //   video.play();
        // } else {
        //   video.pause();
        // }
        // Method #2
        var method = video.paused ? "play" : "pause";
        video[method]();
    }
    // == Create updatePlayButton() to show > or ||
    function updatePlayButton() {
        // console.log("Update the text on the playToggleButton");
        // NOTE Can use 'this' instead of video since 'this' is bound to video anyway
        // via the event listener.
        // const buttonText: string = video.paused ? ">" : "||";
        var buttonText = this.paused ? "►" : "❚ ❚";
        playToggleButton.textContent = buttonText;
    }
    // == Create skip() function to handle BOTH forward/backward based on [data-skip] value
    function skip(e) {
        // TODO By only using one fn() to handle forward and backward,
        // need to determine which button was clicked to determine direction
        // and amount to skip.
        console.groupCollapsed("Skipping!");
        console.log(this); // <button> All the same!
        console.log(e.target); // <button>
        console.log(e.currentTarget); // <button>
        console.log(this.dataset.skip); // string: "-10" or "25"
        console.groupEnd();
        var skipAmount = parseFloat(this.dataset.skip); // or Number()
        video.currentTime += skipAmount;
    }
    // Create toggleFullscreen() handler
    function toggleFullscreen(e) {
        console.group("Toggle Fullscreen!");
        console.log(this);
        console.log(e);
        console.log(document.fullscreenElement); // null (!fullscreen) || <div class="player"> (fullscreen)
        console.log(document.fullscreenEnabled); // true
        // console.log(player.fullscreenEnabled); // Div doesn't have fullscreenEnabled
        console.groupEnd();
        // TODO Make it go fullscreen!
        // FIXME If I make video fullscreen then default controls come in
        // I believe the trick is to take the container fullscreen instead!
        if (document.fullscreenElement === null) {
            player.requestFullscreen();
            // video.requestFullscreen(); // BROKE! Brings in default controls instead of custom
        }
        else {
            document.exitFullscreen();
        }
    }
    // == Create adjust() function to handle BOTH volume/playback speed sliders
    function adjustVolumePlayback(e) {
        console.groupCollapsed("Adjusting Volume/Playback!");
        console.log(e.type); // input
        console.log(this.name); // volume || playbackRate
        console.log(e.target.name); // volume || playbackRate
        console.log(this.value);
        console.groupEnd();
        // Time to update the slider value using video.volume and/or video.playbackRate
        // NOTE Below works but see refactored version: video[this.name] = this.value
        // if (this.name === "volume") {
        //   video.volume = this.value;
        // }
        // if (this.name === "playbackRate") {
        //   video.playbackRate = this.value;
        // }
        // FIXME Refactored version. You can actually access Object properties
        // using Obj[key] = value syntax. This allows us to update either property using:
        video[this.name] = this.value;
    }
    // == Create updateProgressBarFilled() to handle 'timeupdate' event of video
    function updateProgressBarFilled(e) {
        console.groupCollapsed("Updating Progress Filled!");
        console.log(e); // Event {...}
        console.log(e.type); // timeupdate
        console.log(e.timeStamp); // number 8304.32500000461 (ms?) DON'T USE!
        console.log(e.target); // <video>
        console.log(e.currentTarget); // <video>
        console.log(this); // <video>
        console.log(this.target); // undefined
        console.log(this.duration); // number 596.5 (s)
        console.log(this.timeStamp); // undefined ('this' is <video>, not Event object!)
        console.log(this.currentTime); // number (works and in seconds)!
        console.log(progressBar.style.flexBasis);
        console.groupEnd();
        // TODO Okay, I think I know how to compute the progress now
        // using currentTime, duration and timeStamp
        // FIXME let or const? I can use either because this code ONLY runs
        // when this 'timeupdate' event triggers.
        // FIXME DON'T USE E.TIMESTAMP! It's the document's lifetime!
        var duration = this.duration;
        var currentTime = this.currentTime;
        var currentProgressPercentage = Math.round((currentTime / duration) * 100 * 10) / 10; // WORKS! rounds to tenths
        var currentProgressPercentageString = currentProgressPercentage.toString() + "%";
        // FIXME Wes's refactored version:
        // const percent = (video.currentTime / video.duration) * 100;
        // progressBar.style.flexBasis = `${percent}%`;
        // Time to update the <div class="progress__filled"> look
        // TODO Check out el.style.flexBasis to update fill
        // NOTE JS can't do dashes like CSS classes so it does camelCase (flex-basis => flexBasis)
        // this.style.flexBasis = currentProgressPercentageString; // WRONG! This is <video>, need <div>!
        progressBar.style.flexBasis = currentProgressPercentageString;
    }
    // == Create adjustProgress() handler for clicking, mousedown, mouseup on parent progress <div>
    // TODO May need event delegation to target child progressBar since it seems the user
    // will only click the parent progress <div>
    function adjustProgress(e) {
        console.groupCollapsed("Adjusting Progress!");
        console.log(e); // MouseEvent
        console.log(e.type); // click
        console.log(e.timeStamp); // 1268...
        console.log(e.target); // <div class="progress">
        console.log(e.currentTarget); // <div class="progress">
        console.log(this); // <div class="progress">
        console.log(progressBar.style.flexBasis); // 0.8%
        console.log("x: " + e.offsetX + ", y: " + e.offsetY);
        console.log(this.parentElement); // <div class="player__controls">
        console.log(this.offsetWidth); // number: same as clientWidth. 'undefined' while mousedown + mousemove!
        console.log(progress.offsetWidth); // number: ALWAYS available!
        console.groupEnd();
        // Okay, looks like offsetX along with offsetWidth can help compute
        // where to update video.currentTime value
        var clickX = e.offsetX;
        // const maxX = this.offsetWidth; // 'undefined' while isMousedown + mousemove so TypeError!
        var maxX = progress.offsetWidth; // progress.offsetWidth also undefined? YES! But no TypeError! Weird...
        // Update video.currentTime value based on the above
        // TODO ? Need to access video.duration, etc.? Or, just get percentage
        // from (clickX / maxX) * 100 ?
        // UPDATE Need to access video.duration
        var newProgressFraction = Math.round((clickX / maxX) * 1000) / 1000; // thousandths
        var duration = video.duration; // number: 595.6
        var newCurrentTime = newProgressFraction * duration;
        // console.log(newCurrentTime); // seconds
        // Update the video.currentTime to newCurrentTime
        // FIXME currentTime is a double non-finite (NaN) if using this.offsetWidth!
        // Need to use progress.offsetWidth instead.
        video.currentTime = newCurrentTime; // seconds
        // FIXME Refactored version:
        // const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
        // video.currentTime = scrubTime;
        // Update child progressBar <div> for filled
        // TODO ? May not have to do this since this is listening for 'timeupdate' event
        // on the <video> so may happen automatically?
        // UPDATE Nope! This seems to be dispatching a 'timeupdate' event, which is
        // handled by my updateProgressBarFilled() function. Nice!
    }
    // ===== HOOK UP THE EVENT LISTENERS
    // == Add event listener to video and playToggleButton
    video.addEventListener("click", togglePlay);
    playToggleButton.addEventListener("click", togglePlay);
    // == Add 'play' & 'paused' event listener to video and playToggleButton
    video.addEventListener("play", updatePlayButton);
    video.addEventListener("pause", updatePlayButton);
    playToggleButton.addEventListener("play", updatePlayButton);
    playToggleButton.addEventListener("pause", updatePlayButton);
    // == Add 'click' listener to skip buttons
    skipButtons.forEach(function (btn) {
        btn.addEventListener("click", skip);
    });
    // == Add 'click' listener to fullscreen button
    fullscreenButton.addEventListener("click", toggleFullscreen);
    // == Add 'input' listener to volume slider
    // NOTE Wes used 'change' event. He also mentioned we could
    // add 'mousedown' to rangeSliders and add a boolean flag like in Canvas draw
    rangeSliders.forEach(function (slider) {
        slider.addEventListener("input", adjustVolumePlayback);
    });
    // == Add 'timeupdate' (NOT 'change'!) listener to progress for change in video.duration
    // TODO ? How to listen for playing/progress on the video?
    // video.addEventListener("durationchange", updateProgressBarFilled); // Only at load
    // video.addEventListener("TimeEvent", updateProgressBarFilled); // Nothing...
    video.addEventListener("timeupdate", updateProgressBarFilled);
    // == Add 'click', 'mousedown', 'mouseup' listeners to progress <div> (parent)
    // TODO May need event delegation to target child progressBar since it seems the user
    // will only click the parent progress <div>
    // TODO Need a global flag for isMousedown: boolean
    var isMousedown = false;
    progress.addEventListener("click", adjustProgress);
    progress.addEventListener("mousedown", function () { return (isMousedown = true); });
    progress.addEventListener("mouseup", function () { return (isMousedown = false); });
    // mousemove #1:
    // progress.addEventListener("mousemove", (e: MouseEvent) => {
    //   // Works all the time! Need to first check for isMousedown
    //   if (isMousedown) {
    //     adjustProgress(e);
    //   }
    // });
    // mousemove #2 -- Shorthand checks first value (isMousedown) only then does second
    // Similar to terminal | pipe operation.
    progress.addEventListener("mousemove", function (e) { return isMousedown && adjustProgress(e); });
    progress.addEventListener("mouseout", function () { return (isMousedown = false); });
})();
