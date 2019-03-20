/**
 * Copyright 2019 Mike Hamilton <mike@mikehamilton.ca>
 * License: MIT
 */

let links = Array.from(document.getElementsByTagName("a")); // An array of all links on the page
let fetched = []; // List of prefetched links so it's not done twice

let timer; // Globally scoped timer variable

// Loop through links array
links.forEach(x => {
  // Set href to the href of current link
  let href = x.getAttribute("href");

  // Add an event listener to all links
  x.addEventListener("mouseover", () => {
    timer = performance.now(); // Set timer to right now
    setTimeout(() => {
      if (timer) {
        addToHead(href); // Call addToHead() function and pass the currently hovered over link
      }
    }, 250); // 250ms delay before prefetching link
  });

  // Add event listener to all mouseouts
  x.addEventListener("mouseout", () => {
    // Null the timer when mouse stops hovering
    timer = null;
  });
});

function addToHead(href) {
  let prefetched = fetched.find(x => href === x); // See if link has been previously fetched
  if (!prefetched) {
    let link = document.createElement("link"); // Create variable to store the link element
    link.href = href; // Set the link elements href property to passed in link
    link.rel = "prefetch"; // Tells the browser to prefetch the link
    link.as = "document";
    document.head.appendChild(link); // Add link element to <head> of page}
    fetched.push(href);
  }
}
