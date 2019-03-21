/**
 * Copyright 2019 Mike Hamilton <mike@mikehamilton.ca>
 * License: MIT
 */

let links = Array.from(document.getElementsByTagName("a")); // An array of all links on the page
let fetched = []; // List of prefetched links so it's not done twice

let timer; // Globally scoped timer variable

// Loop through links array
links.forEach(link => {
  // Set url to the href of current link
  let url = link.getAttribute("href");

  // Add an event listener to all links
  link.addEventListener("mouseover", () => {
    timer = performance.now(); // Set timer to right now
    setTimeout(() => {
      if (timer) addToHead(url); // Call addToHead() function and pass the currently hovered over link
    }, 250); // 250ms delay before prefetching link
  });

  // Add event listener to all mouseouts
  link.addEventListener("mouseout", () => {
    // Null the timer when mouse stops hovering
    timer = null;
  });
});

function addToHead(url) {
  if (!fetched.find(x => url === x)) {
    // See if link has already been prefetched
    let linkElement = document.createElement("link"); // Create variable to store the link element
    linkElement.href = url; // Set the link elements href property to passed in link
    linkElement.rel = "prefetch"; // Tells the browser to prefetch the link
    linkElement.as = "document"; // Fetch as a document
    document.head.appendChild(linkElement); // Add link element to <head> of page}
    fetched.push(url); // Push the url into our already fetched array
  }
}
