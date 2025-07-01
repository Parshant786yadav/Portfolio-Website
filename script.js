// script.js

// Scroll-triggered fade-in animation
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// Smooth scroll for anchor links
const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const textArray = [
  "Problem Solver",
  "Practical Coder", 
  "AI Explorer", 
  "Web Developer",
  "DSA Enthusiast",
];
let index = 0;
let charIndex = 0;
const speed = 80;
const pause = 500;
const element = document.getElementById("changing-text");

function typeEffect() {
  if (charIndex < textArray[index].length) {
    element.textContent += textArray[index].charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, speed);
  } else {
    setTimeout(eraseEffect, pause);
  }
}

function eraseEffect() {
  if (charIndex > 0) {
    element.textContent = textArray[index].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseEffect, speed / 2);
  } else {
    index = (index + 1) % textArray.length;
    setTimeout(typeEffect, speed);
  }
}









document.addEventListener("DOMContentLoaded", () => {
  // Typing effect starter
  setTimeout(typeEffect, speed);

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
    });
  }
});









// Scroll-triggered navbar background
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initStars();  // reinitialize on resize
});

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() < 0.05 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.5; // few bigger stars
    this.opacity = Math.random();
    this.fade = Math.random() * 0.02 + 0.01;
  }

  update() {
    this.opacity += this.fade;
    if (this.opacity <= 0 || this.opacity >= 1) this.fade *= -1;
  }

  draw() {
    ctx.beginPath();
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius * 2);
    gradient.addColorStop(0, `rgba(100,150,255,${this.opacity})`);
    gradient.addColorStop(0.5, `rgba(100,150,255,${this.opacity * 0.5})`);
    gradient.addColorStop(1, `rgba(0,0,0,0)`);
    ctx.fillStyle = gradient;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

let stars = [];

function initStars() {
  stars = [];
  for (let i = 0; i < 250; i++) {
    stars.push(new Star());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.update();
    star.draw();
  });
  requestAnimationFrame(animate);
}

initStars();
animate();




// certificate



// CERTIFICATE SLIDER
let slides = document.querySelectorAll('.certificate-slide');
let currentSlide = 0;
let interval;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

function startSlider() {
  interval = setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 2000);
}

function stopSlider() {
  clearInterval(interval);
}

document.querySelector('.certificate-slider').addEventListener('mouseenter', () => {
  stopSlider();
  document.querySelector('.certificate-slider').classList.add('hovered');
});

document.querySelector('.certificate-slider').addEventListener('mouseleave', () => {
  startSlider();
  document.querySelector('.certificate-slider').classList.remove('hovered');
});

showSlide(currentSlide);
startSlider();




//                     github                     


document.querySelectorAll('.github-card').forEach(card => {
  const desc = card.querySelector('.github-description');
  const originalText = desc.textContent;
  const hoverText = card.getAttribute('data-hovertext');

  card.addEventListener('mouseenter', () => {
    desc.textContent = hoverText;
  });

  card.addEventListener('mouseleave', () => {
    desc.textContent = originalText;
  });
});





//              get in touch


document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".contact-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.querySelector('input[placeholder="Your Name"]').value.trim();
    const email = form.querySelector('input[placeholder="Your Email"]').value.trim();
    const message = form.querySelector("textarea").value.trim();

    if (!name || !email || !message) {
      alert("⚠️ Please fill all the fields!");
      return;
    }

    alert(`✅ Thank you, ${name}! Your message has been submitted.`);
    form.reset();
  });

  document.querySelectorAll(".hover-glow").forEach(el => {
    el.addEventListener("mouseenter", () => {
      el.style.animation = "glow-blink 1.2s infinite";
    });
    el.addEventListener("mouseleave", () => {
      el.style.animation = "none";
    });
  });
});



//                           login/signin                            




const firebaseConfig = {
  apiKey: "AIzaSyCpNphBnKMbqRq8Z95z_60x1-mnbyaWGlA",
  authDomain: "myportfolioauth-41bbd.firebaseapp.com",
  projectId: "myportfolioauth-41bbd",
  storageBucket: "myportfolioauth-41bbd.appspot.com",
  messagingSenderId: "835152618447",
  appId: "1:835152618447:web:17d60e903b6a0ca6b7a8ba"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginButtons = document.querySelectorAll(".login-btn");
const modal = document.getElementById("authModal");
const modalTitle = document.getElementById("modalTitle");
const toggleMode = document.getElementById("toggleMode");
const submitBtn = document.getElementById("submitBtn");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const phoneField = document.getElementById("phoneField");
const signupPasswords = document.getElementById("signupPasswords");
const createPassword = document.getElementById("createPassword");
const confirmPassword = document.getElementById("confirmPassword");

let isLogin = true;

// ✅ Show modal on any login button
loginButtons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.classList.remove("hidden");
  });
});

// Hide modal when clicking outside
modal?.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});


// Toggle Mode
toggleMode.addEventListener("click", () => {
  isLogin = !isLogin;
  modalTitle.textContent = isLogin ? "Login" : "Sign Up";
  submitBtn.textContent = isLogin ? "Login" : "Sign Up";
  toggleMode.textContent = isLogin ? "Sign Up" : "Login";

  // Show/Hide fields
  phoneField.classList.toggle("hidden", isLogin);
  signupPasswords.classList.toggle("hidden", isLogin);
  passwordInput.style.display = isLogin ? "block" : "none";
});

// Submit Form
submitBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();

  if (isLogin) {
    const password = passwordInput.value.trim();
    if (!email || !password) {
      alert("❗ Please enter email and password.");
      return;
    }

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        window.location.href = "welcome.html";
      })
      .catch((error) => {
        alert("❌ Login failed: " + error.message);
      });

  } else {
    const phone = document.getElementById("phoneInput").value.trim();
    const password = createPassword.value.trim();
    const confirm = confirmPassword.value.trim();

    if (!email || !phone || !password || !confirm) {
      alert("❗ Please fill all fields.");
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      alert("📱 Please enter a valid 10-digit phone number.");
      return;
    }

    if (password !== confirm) {
      alert("❗ Passwords do not match.");
      return;
    }

    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        return db.collection("users").doc(uid).set({
          email: email,
          phone: phone
        });
      })
      .then(() => {
        alert("✅ Account created! You can now log in.");
        toggleMode.click();
      })
      .catch((error) => {
        alert("❌ Signup failed: " + error.message);
      });
  }
});

// Auth State Change
auth.onAuthStateChanged((user) => {
  const defaultNav = document.getElementById("defaultNav");
  const loggedInNav = document.getElementById("loggedInFeatures");
  const loginBtn = document.querySelector(".login-btn");
  const logoutButtons = document.querySelectorAll(".logout-btn");

  if (user) {
    defaultNav?.classList.add("hidden");
    loggedInNav?.classList.remove("hidden");
    loginBtn?.classList.add("hidden");

    logoutButtons.forEach((btn) => {
      if (!btn.hasAttribute("listener")) {
        btn.setAttribute("listener", "true");
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          // ✅ Show confirmation before logout
          const confirmLogout = window.confirm("⚠️ Do you really want to logout?");
          if (confirmLogout) {
            auth.signOut().then(() => {
              alert("👋 Logged out successfully.");
              window.location.href = "index.html";
            });
          }
        });
      }
    });

  } else {
    defaultNav?.classList.remove("hidden");
    loggedInNav?.classList.add("hidden");
    loginBtn?.classList.remove("hidden");

    logoutButtons.forEach((btn) => {
      btn.removeAttribute("listener");
    });
  }
});





// Save contact messages to Firestore
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("contactName").value.trim();
    const email = document.getElementById("contactEmail").value.trim();
    const message = document.getElementById("contactMessage").value.trim();

    if (!name || !email || !message) {
      alert("❗ Please fill out all fields.");
      return;
    }

    // Save to Firestore
    firebase.firestore().collection("messages").add({
      name: name,
      email: email,
      message: message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      alert("✅ Message sent successfully!");
      contactForm.reset();
    }).catch((error) => {
      alert("❌ Failed to send message: " + error.message);
    });
  });
}



if (logoutBtn && !logoutBtn.hasAttribute("listener")) {
  logoutBtn.setAttribute("listener", "true");
  logoutBtn.addEventListener("click", () => {
    const confirmLogout = confirm("❓ Do you want to logout?");
    if (confirmLogout) {
      auth.signOut().then(() => {
        window.location.href = "index.html";
      });
    }
  });
}



  const textEl = document.getElementById('resumeText');
  const messages = ["Download Resume", " 94+ ATS Score 😎 "];
  let i = 0;

  setInterval(() => {
    // Step 1: fade out
    textEl.classList.remove("fade-in");
    textEl.classList.add("fade-out");

    setTimeout(() => {
      // Step 2: change text
      i = (i + 1) % messages.length;
      textEl.textContent = messages[i];

      // Step 3: fade in
      textEl.classList.remove("fade-out");
      textEl.classList.add("fade-in");
    }, 200); // match transition time
  }, 1500); // total time per message cycle



  











  