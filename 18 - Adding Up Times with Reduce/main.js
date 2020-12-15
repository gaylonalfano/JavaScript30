// // Let's get our <li> list of items
// // const videos = document.querySelectorAll("li") as NodeListOf<HTMLLIElement>;
// const videos: NodeListOf<HTMLLIElement> = document.querySelectorAll("li");
// // console.log(videos);
// // Create a helper function to convert "MM:SS" to number
// function convertMinutesSecondsTimeStringToSecondsNumber(
//   timeString: string
// ): number {
//   let [minutes, seconds] = timeString.split(":");
//   return +minutes * 60 + +seconds;
// }
// // Loop through and get all the video times via dataset.time
// const videoTimes: Array<number> = [];
// videos.forEach((video) => {
//   // console.log(video.dataset.time);
//   const videoLength: number = convertMinutesSecondsTimeStringToSecondsNumber(
//     video.dataset.time
//   );
//   videoTimes.push(videoLength);
// });
// // Total all the videoTimes using .reduce(callback(accumulator, currentValue), initialValue)
// const allVideosTotalHours =
//   videoTimes.reduce((total, current) => {
//     // FIXME It accumulates based off of what's returned!
//     // Can't convert to minutes via the return or messes up! Need to do that OUTSIDE of reduce()!
//     // let totalSeconds = total + current;
//     // let totalMinutes = totalSeconds / 60;
//     // console.log(totalSeconds);
//     // console.log(totalMinutes);
//     // return totalMinutes;
//     return total + current; // total seconds
//   }, 0) /
//   60 /
//   60; // Divide by 60 twice for Minutes then to Hours
// // console.log(videoTimes);
// // console.log(allVideosTotalHours); // 4.983 hours
// ============= WES'S APPROACH =================
// Convert to Array using Array.from()
var timeNodes = Array.from(document.querySelectorAll("[data-time]"));
var seconds = timeNodes
    .map(function (node) { return node.dataset.time; }) // string
    .map(function (timeCode) {
    // "5:43" => ["5", "43"] => [ 5, 43 ]
    var _a = timeCode.split(":").map(parseFloat), minutes = _a[0], seconds = _a[1];
    return minutes * 60 + seconds;
})
    .reduce(function (total, current) { return total + current; }, 0);
// === Now let's parse it into a HH:MM:SS number format
var secondsLeft = seconds;
var hours = Math.floor(secondsLeft / 3600);
// Update secondsLeft value. Must use let
secondsLeft = secondsLeft % 3600;
var mins = Math.floor(secondsLeft / 60);
secondsLeft = secondsLeft % 60;
console.log(seconds);
console.log(seconds / 60 / 60);
console.log(hours, mins, secondsLeft); // 4 58 58
