// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent default anchor behavior
    const target = document.querySelector(this.getAttribute('href')); // Get the target element
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth' // Smooth scroll to the target element
      });
    } else {
      console.error('Target not found:', this.getAttribute('href')); // Log error if target not found
    }
  });
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll(".lazy"); // Select all lazy images
  if ('IntersectionObserver' in window) {
    // Use IntersectionObserver if available
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src; // Load the image
          lazyImage.classList.remove("lazy"); // Remove lazy class
          lazyImageObserver.unobserve(lazyImage); // Stop observing the image
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage); // Observe each lazy image
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    lazyImages.forEach(function(lazyImage) {
      lazyImage.src = lazyImage.dataset.src; // Load the image
      lazyImage.classList.remove("lazy"); // Remove lazy class
    });
  }
});

// Debounce function to limit scrollFunction calls
// This function returns a new function that will only execute the provided
// function `func` once every `wait` milliseconds, ignoring any additional
// calls within that timeframe.
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout); // Clear any existing timeout
      func(...args); // Call the original function with the provided arguments
    };
    clearTimeout(timeout); // Clear any existing timeout
    timeout = setTimeout(later, wait); // Set a new timeout
  };
}

// Throttle function to limit the number of times topFunction can be called
// This function ensures the provided function `func` is only called once every
// `limit` milliseconds, ignoring any additional calls within that timeframe.
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args); // Call the function immediately if it hasn't been called recently
      lastRan = Date.now(); // Record the last time the function was called
    } else {
      clearTimeout(lastFunc); // Clear any existing timeout
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args); // Call the function if enough time has passed
          lastRan = Date.now(); // Update the last time the function was called
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Back to top button functionality
const backToTopButton = document.getElementById("backToTop");

// Show or hide the back to top button based on scroll position
window.addEventListener('scroll', debounce(function() {
  requestAnimationFrame(scrollFunction); // Use requestAnimationFrame for optimized performance
}, 100));

// Function to show/hide back to top button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block"; // Show the button
  } else {
    backToTopButton.style.display = "none"; // Hide the button
  }
}

// Smooth scrolling to top
const topFunction = throttle(function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // Smooth scroll to the top of the page
  });
}, 1000);

backToTopButton.addEventListener('click', topFunction); // Add click event to the button

// Ensure keyboard accessibility
backToTopButton.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    topFunction(); // Call the topFunction when Enter or Space is pressed
  }
});

// Basic form validation
function validateForm() {
  const email = document.getElementById('email').value; // Get the email input value
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email pattern regex

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.'); // Show alert if email is invalid
    return false; // Prevent form submission
  }

  // Example of additional field validation
  const name = document.getElementById('name').value; // Get the name input value
  if (!name) {
    alert('Please enter your name.'); // Show alert if name is empty
    return false; // Prevent form submission
  }

  return true; // Allow form submission
}

// Lightbox initialization with error handling
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'fadeDuration': 200,
      'imageFadeDuration': 200
    });
  } else {
    console.error('Lightbox library is not loaded.');
  }
});
