/* ========================================
   HAPPYCONE V2 - JAVASCRIPT
   Interactions 3D et Animations
======================================== */

// ===================================
// INITIALISATION AU CHARGEMENT
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🍦 HappyCone V2 - Site 3D chargé !");

  // Initialiser toutes les fonctionnalités
  createConfettiV2();
  initParfumRandom();
  initCurrentDay();
  initParallaxMouse();
  initScrollAnimations();
  initSmoothScroll();
  initCardInteractions();
  initFloatingShapes();
});

// ===================================
// CONFETTIS ANIMÉS HERO V2
// ===================================

function createConfettiV2() {
  const heroSection = document.querySelector(".sec-hero");
  if (!heroSection) return;

  // Créer un conteneur pour les confettis
  const confettiContainer = document.createElement("div");
  confettiContainer.id = "confetti-hero";
  confettiContainer.style.position = "absolute";
  confettiContainer.style.top = "0";
  confettiContainer.style.left = "0";
  confettiContainer.style.width = "100%";
  confettiContainer.style.height = "100%";
  confettiContainer.style.overflow = "hidden";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "1";
  heroSection.appendChild(confettiContainer);

  const numberOfConfetti = 50;
  const colors = ["#ffb3d9", "#a8daff", "#fff9c4"]; // Rose fraise, Bleu myrtille, Jaune citron

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetto = document.createElement("div");
    confetto.className = "confetti-v2";

    // Couleur aléatoire
    const color = colors[Math.floor(Math.random() * colors.length)];

    // Style du confetti en triangle
    confetto.style.position = "absolute";
    confetto.style.width = "0";
    confetto.style.height = "0";
    const size = Math.random() * 8 + 4;
    confetto.style.borderLeft = `${size}px solid transparent`;
    confetto.style.borderRight = `${size}px solid transparent`;
    confetto.style.borderBottom = `${size * 1.5}px solid ${color}`;
    confetto.style.opacity = "0.5";

    // Position horizontale aléatoire
    confetto.style.left = `${Math.random() * 100}%`;
    confetto.style.top = `-${Math.random() * 100}px`;

    // Animation CSS
    const duration = Math.random() * 5 + 8;
    const delay = Math.random() * 5;
    confetto.style.animation = `confetti-fall ${duration}s linear ${delay}s infinite`;

    confettiContainer.appendChild(confetto);
  }
}

// ===================================
// PARFUM ALÉATOIRE
// ===================================

function initParfumRandom() {
  const btnRandom = document.getElementById("btn-random");
  const parfumCards = document.querySelectorAll(".parfum-card-3d");

  if (!btnRandom || parfumCards.length === 0) return;

  btnRandom.addEventListener("click", function () {
    // Retirer les animations précédentes
    parfumCards.forEach((card) => {
      card.classList.remove("explode", "zoom-in-3d", "pop-3d");
    });

    // Sélectionner un parfum aléatoire
    const randomIndex = Math.floor(Math.random() * parfumCards.length);
    const selectedCard = parfumCards[randomIndex];

    // Ajouter l'animation
    selectedCard.classList.add("explode");

    // Créer des particules
    createParticleBurst(selectedCard);

    // Scroll vers la carte
    setTimeout(() => {
      selectedCard.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);

    // Animation du bouton
    btnRandom.classList.add("wobble-3d");
    setTimeout(() => {
      btnRandom.classList.remove("wobble-3d");
    }, 600);

    // Retirer l'animation de la carte
    setTimeout(() => {
      selectedCard.classList.remove("explode");
    }, 600);
  });
}

// ===================================
// JOUR ACTUEL
// ===================================

function initCurrentDay() {
  const today = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  const emplacementCards = document.querySelectorAll(".emplacement-card-3d");

  emplacementCards.forEach((card) => {
    const dayData = parseInt(card.getAttribute("data-jour"));

    if (dayData === today) {
      card.classList.add("active");

      // Scroll vers le jour actuel (desktop)
      if (window.innerWidth > 768) {
        setTimeout(() => {
          card.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }, 800);
      }
    }
  });
}

// ===================================
// PARALLAXE SOURIS 3D
// ===================================

function initParallaxMouse() {
  const hero = document.querySelector(".sec-hero");
  if (!hero) return;

  hero.addEventListener("mousemove", (e) => {
    const cards = hero.querySelectorAll(".stat-card");
    const shapes = document.querySelectorAll(".shape-3d");

    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    // Animer les stat cards
    cards.forEach((card, index) => {
      const speed = (index + 1) * 10;
      const x = mouseX * speed;
      const y = mouseY * speed;

      card.style.transform = `translate(${x}px, ${y}px) perspective(1000px)`;
    });

    // Animer les formes flottantes
    shapes.forEach((shape, index) => {
      const speed = (index + 1) * 15;
      const x = mouseX * speed;
      const y = mouseY * speed;

      shape.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Reset au départ de la souris
  hero.addEventListener("mouseleave", () => {
    const cards = hero.querySelectorAll(".stat-card");

    cards.forEach((card) => {
      card.style.transform = "";
    });
  });
}

// ===================================
// ANIMATIONS AU SCROLL
// ===================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Ajouter animation en fonction de l'élément
        if (entry.target.classList.contains("parfum-card-3d")) {
          entry.target.classList.add("pop-3d");
        } else if (entry.target.classList.contains("emplacement-card-3d")) {
          entry.target.classList.add("slide-in-3d");
        } else if (entry.target.classList.contains("value-card-3d")) {
          entry.target.classList.add("zoom-in-3d");
        } else {
          entry.target.classList.add("fade-in");
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les éléments
  const elementsToAnimate = document.querySelectorAll(
    ".parfum-card-3d, .emplacement-card-3d, .value-card-3d, .apropos-content, .team-image-zone"
  );

  elementsToAnimate.forEach((element, index) => {
    // Ajouter un délai progressif
    element.style.animationDelay = `${index * 0.1}s`;
    observer.observe(element);
  });
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (href === "#" || href === "") return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// ===================================
// INTERACTIONS CARTES
// ===================================

function initCardInteractions() {
  // Cartes de parfums
  const parfumCards = document.querySelectorAll(".parfum-card-3d");

  parfumCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      // Animation de clic
      this.classList.add("explode");

      // Créer des particules
      createParticleBurst(this);

      // Retirer l'animation
      setTimeout(() => {
        this.classList.remove("explode");
      }, 600);
    });

    // Effet 3D au survol
    card.addEventListener("mousemove", function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Cartes d'emplacements
  const emplacementCards = document.querySelectorAll(".emplacement-card-3d");

  emplacementCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Retirer active des autres
      emplacementCards.forEach((c) => c.classList.remove("active"));

      // Activer celle-ci
      this.classList.add("active");

      // Animation
      this.classList.add("pulse-3d");
      setTimeout(() => {
        this.classList.remove("pulse-3d");
      }, 600);
    });
  });
}

// ===================================
// PARTICULES EXPLOSIVES
// ===================================

function createParticleBurst(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const numberOfParticles = 20;
  const colors = ["#FF1493", "#00D9A3", "#FFA500", "#B57EDC", "#FF6B6B"];

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Style
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.position = "fixed";
    particle.style.zIndex = "9999";

    // Direction aléatoire
    const angle = (Math.PI * 2 * i) / numberOfParticles;
    const velocity = Math.random() * 150 + 100;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(particle);

    // Retirer après l'animation
    setTimeout(() => {
      particle.remove();
    }, 1000);
  }
}

// ===================================
// FORMES FLOTTANTES ANIMÉES
// ===================================

function initFloatingShapes() {
  const shapes = document.querySelectorAll(".shape-3d");

  shapes.forEach((shape) => {
    // Animation aléatoire au clic
    shape.addEventListener("click", function () {
      this.classList.add("flip-3d");

      setTimeout(() => {
        this.classList.remove("flip-3d");
      }, 1000);
    });
  });
}

// ===================================
// EFFET 3D SUR LES BOUTONS
// ===================================

document.querySelectorAll(".btn-3d").forEach((btn) => {
  btn.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 5;
    const rotateY = (centerX - x) / 5;

    this.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(-4px, -4px)`;
  });

  btn.addEventListener("mouseleave", function () {
    this.style.transform = "";
  });
});

// ===================================
// EASTER EGG - KONAMI CODE
// ===================================

let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(",") === konamiSequence.join(",")) {
    // Easter egg déclenché !
    triggerEasterEgg();
    konamiCode = [];
  }
});

function triggerEasterEgg() {
  // Effet rainbow sur tout le body
  document.body.style.animation = "rainbow 2s linear infinite";

  // Explosion de glaces
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const emoji = document.createElement("div");
      emoji.textContent = ["🍦", "🍧", "🍨"][Math.floor(Math.random() * 3)];
      emoji.style.position = "fixed";
      emoji.style.left = `${Math.random() * 100}%`;
      emoji.style.top = "-50px";
      emoji.style.fontSize = "3rem";
      emoji.style.zIndex = "9999";
      emoji.style.animation = "particle-fly 3s linear forwards";
      emoji.style.setProperty("--ty", "100vh");
      document.body.appendChild(emoji);

      setTimeout(() => emoji.remove(), 3000);
    }, i * 50);
  }

  // Réinitialiser après
  setTimeout(() => {
    document.body.style.animation = "";
  }, 2000);
}

// Animation rainbow pour l'Easter egg
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log(
  "💡 Psst... Le Konami Code fonctionne aussi ici ! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA"
);

// ===================================
// RESPONSIVE ADAPTATIONS
// ===================================

window.addEventListener("resize", function () {
  // Désactiver certaines animations sur mobile
  if (window.innerWidth < 768) {
    document.querySelectorAll(".shape-3d").forEach((shape) => {
      shape.style.opacity = "0.2";
    });
  } else {
    document.querySelectorAll(".shape-3d").forEach((shape) => {
      shape.style.opacity = "1";
    });
  }
});
