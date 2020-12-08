const bands: string[] = [
  "The Plot in You",
  "The Devil Wears Prada",
  "Pierce the Veil",
  "Norma Jean",
  "The Bled",
  "Say Anything",
  "The Midway State",
  "We Came as Romans",
  "Counterparts",
  "Oh, Sleeper",
  "A Skylit Drive",
  "Anywhere But Here",
  "An Old Dog",
];

const bandsList = document.getElementById("bands") as HTMLUListElement;

function stripArticles(bandName: string) {
  return bandName.replace(/^(a |the |an )/i, "").trim();
}

// Verbose version
// const sortedBands = bands.sort((a: string, b: string): 1 | -1 => {
//   // Now let's use this helper inside our comparison function
//   if (stripArticles(a) > stripArticles(b)) {
//     return 1;
//   } else {
//     return -1;
//   }
// });

// Refactored version w/ ternary
const sortedBands = bands.sort((a: string, b: string): 1 | -1 =>
  stripArticles(a) > stripArticles(b) ? 1 : -1
);

console.log(sortedBands);

// ==== Populate the UL
// Method 1: Populate list using .map()
bandsList.innerHTML = sortedBands
  .map((band: string) => {
    return `
  <li>${band}</li>

  `;
  })
  .join("");

// // Method 2: Populate list using forEach() and appendChild(li)
// bands.forEach((band: string) => {
//   // console.log(band);
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(band)); // <li>${band}</li>
//   bandsList.appendChild(li);
// });

// // ============ MY ATTEMPT/FAILURE ==============
// // ==== Create a helper function to check whether band includes article
// // Method: Function with parameters
// function containsArticleWithParams(
//   bandName: string,
//   articles: string[]
// ): boolean {
//   // Loop through all the articles
//   // BROKEN!
//   // articles.map((article) => {
//   //   if (bandName.split(" ")[0] === article) {
//   //     // Has article
//   //     console.log(`${bandName} has ${article}`);
//   //     return true;
//   //   } else {
//   //     return false
//   //   }
//   // });
//   // // No article
//   // console.log(`${bandName} does NOT have any articles: ${articles}`);
//   // return false;

//   // Use a for/of loop? (for/in good for retrieving k:v pairs)
//   // TODO Get this to work then see if I can pass this function into bands.some(containsArticle)
//   // FIXME some() takes an function reference as an argument, so containsArticle needs to parse through
//   // the bands array, not just a single band name string.
//   // FIXME ? Do I need to remove the params from this function signature?
//   for (let a of articles) {
//     if (bandName.split(" ")[0] === a) {
//       console.log(`${bandName} has ${a}`);
//       return true;
//     } else {
//       console.log(`${bandName} does NOT have any articles: ${articles}`);
//       return false;
//     }
//   }
// }

// // ==== Create a helper function to check whether band includes article
// // Method: for/of loops (instead of .map())
// function containsArticle(): boolean {
//   // Use a for/of loop? (for/in good for retrieving k:v pairs)
//   // TODO Get this to work then see if I can pass this function into bands.some(containsArticle)
//   // FIXME some() takes an function reference as an argument, so containsArticle needs to parse through
//   // the bands array, not just a single band name string.
//   // FIXME ? Do I need to remove the params from this function signature?
//   // NOTE If I keep params then can't use .some()... still broken...
//   for (let band of bands) {
//     for (let article of articles) {
//       if (band.split(" ")[0] === article) {
//         console.log(`${band} has ${article}`);
//         return true;
//       } else {
//         console.log(`${band} does NOT have any articles: ${articles}`);
//         return false;
//       }
//     }
//   }
// }

// // ==== Sort bands MY ATTEMPT (FAILURE) ========
// // === Method: Using an array of articles to exclude
// const articles: string[] = ["The", "A", "An"];
// const bandsWithArticles: string[] = [];
// const bandsWithoutArticles: string[] = [...bands];

// // console.log(bandsWithArticles);
// // === Method: What about string.startsWith()?
// // console.log(bands.map((band) => band.startsWith(articles[0])));
// bands.map((band, bIndex) => {
//   articles.map((article, aIndex) => {
//     // if (band.includes(article)) {
//     //   console.log(`${band} includes ${article}`)
//     // }
//     // Let's make sure "A" and "An" articles are treated only once
//     // if (article.length === 1) {
//     //   // console.log(band.startsWith(article));
//     //   // console.log(`${band} startsWith ${article}`);
//     // }

//     // TODO Need to use .split() or "A" article matches with "Anywhere", "An", "Awesome", etc.
//     // FIXME .includes(article) matches with "Any, An, etc." Need to use === article
//     // Ideally could check if ANY/SOME article but not sure how...
//     if (band.split(" ")[0] === article) {
//       console.log(`${bIndex}: ${band} includes ${aIndex}: ${article}`); // works!
//       bandsWithArticles.push(band.split(" ").slice(1).join(" "));
//       // Let's now remove this band from our copied bandsWithoutArticles Array
//       // TODO ? Use slice() or splice()?
//       // bandsWithoutArticles.splice(bIndex, 2); // Messes up the indexing since it's changing...
//     }
//   });
//   // FIXME Add all bands to bandsWithArticles but without duplicates
//   // bandsWithArticles.push(band);
// });

// // Now have bandsWithArticles populated. Time to concat/merge with original bands array

// // console.log(bandsWithArticles);
// // === Method: Split each band string into array and check 0 index for articles
// // === Method: Using RegExp pattern and match()

// // ==== Populate the UL
// // Method 1: Populate list using .map()
// bandsList.innerHTML = bands
//   .map((band: string) => {
//     return `
//   <li>${band}</li>

//   `;
//   })
//   .join("");

// // Method 2: Populate list using forEach() and appendChild(li)
// bands.forEach((band: string) => {
//   // console.log(band);
//   const li = document.createElement("li");
//   li.appendChild(document.createTextNode(band)); // <li>${band}</li>
//   bandsList.appendChild(li);
// });
