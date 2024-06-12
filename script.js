// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      console.error('Target not found: ', this.getAttribute('href'));
    }
  });
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
  const lazyImages = document.querySelectorAll(".lazy");
  if ('IntersectionObserver' in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers that do not support IntersectionObserver
    console.log('IntersectionObserver not supported');
    lazyImages.forEach(function(lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove("lazy");
    });
  }
});

// Debounce function to limit scrollFunction calls
function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit the number of times topFunction can be called
function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Back to top button functionality
const backToTopButton = document.getElementById("backToTop");

window.addEventListener('scroll', debounce(function() {
  requestAnimationFrame(scrollFunction);
}, 100));

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Smooth scrolling to top
const topFunction = throttle(function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}, 1000);

backToTopButton.addEventListener('click', topFunction);

// Ensure keyboard accessibility
backToTopButton.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    topFunction();
  }
});

// Enhanced form validation
document.getElementById('signup-form').addEventListener('submit', function(e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === '') {
    alert('Please enter your name.');
    e.preventDefault();
    return false;
  }

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    e.preventDefault();
    return false;
  }

  return true;
});

// Lightbox initialization with enhanced options
document.addEventListener('DOMContentLoaded', function() {
  lightbox.option({
    'resizeDuration': 200,
    'wrapAround': true,
    'fadeDuration': 200,
    'imageFadeDuration': 200,
    'alwaysShowNavOnTouchDevices': true,
    'showImageNumberLabel': false
  });
});
