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

// Basic form validation
function validateForm() {
  const email = document.getElementById('email').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  const name = document.getElementById('name').value;
  if (!name) {
    alert('Please enter your name.');
    return false;
  }

  return true;
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

// Add Comment Functionality
function addComment() {
  const name = document.getElementById('commentName').value;
  const comment = document.getElementById('commentText').value;

  if (name && comment) {
    const commentList = document.getElementById('commentsUl');
    const newComment = document.createElement('li');
    newComment.innerHTML = `<strong>${name}</strong>: ${comment}`;
    commentList.appendChild(newComment);

    document.getElementById('commentName').value = '';
    document.getElementById('commentText').value = '';
    return false; // Prevent form submission
  }

  alert('Please enter both your name and comment.');
  return false;
}

// Real-time form validation
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', function() {
    if (this.validity.valid) {
      this.classList.remove('invalid');
      this.classList.add('valid');
    } else {
      this.classList.remove('valid');
      this.classList.add('invalid');
    }
  });
});

// Infinite scroll for loading more content
window.addEventListener('scroll', debounce(function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loadMoreContent();
  }
}, 200));

function loadMoreContent() {
  // Placeholder for actual content loading logic
  console.log('Loading more content...');
}
