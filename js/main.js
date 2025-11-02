/* ========================================
   HAPPYCONE - JAVASCRIPT PRINCIPAL
   Interactions et animations dynamiques
======================================== */

// ===================================
// BULLES FLOTTANTES EN ARRIÈRE-PLAN
// ===================================

function createBulles() {
  const bullesContainer = document.getElementById("bulles-container");
  const numberOfBulles = 20;

  for (let i = 0; i < numberOfBulles; i++) {
    const bulle = document.createElement("div");
    bulle.className = `bulle bulle-${(i % 5) + 1}`;

    // Taille aléatoire
    const size = Math.random() * 100 + 50;
    bulle.style.width = `${size}px`;
    bulle.style.height = `${size}px`;

    // Position horizontale aléatoire
    bulle.style.left = `${Math.random() * 100}%`;

    // Durée d'animation aléatoire
    bulle.style.animationDuration = `${Math.random() * 10 + 10}s`;

    // Délai d'animation aléatoire
    bulle.style.animationDelay = `${Math.random() * 5}s`;

    bullesContainer.appendChild(bulle);
  }
}

// ===================================
// CONFETTIS ANIMÉS
// ===================================

function createConfetti() {
  const confettiContainer = document.getElementById("confetti");
  if (!confettiContainer) return;

  const numberOfConfetti = 30;
  const colors = ["#ffb3d9", "#a8daff", "#fff9c4"]; // Rose fraise, Bleu myrtille, Jaune citron

  for (let i = 0; i < numberOfConfetti; i++) {
    const confetto = document.createElement("div");
    confetto.className = "confetti";

    // Couleur aléatoire
    confetto.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    // Position horizontale aléatoire
    confetto.style.left = `${Math.random() * 100}%`;

    // Durée d'animation aléatoire
    confetto.style.animationDuration = `${Math.random() * 3 + 4}s`;

    // Délai d'animation aléatoire
    confetto.style.animationDelay = `${Math.random() * 3}s`;

    confettiContainer.appendChild(confetto);
  }
}

// ===================================
// PARFUM ALÉATOIRE
// ===================================

function setupRandomParfum() {
  const btnRandom = document.getElementById("btn-random");
  const parfumCards = document.querySelectorAll(".parfum-card");

  if (!btnRandom || parfumCards.length === 0) return;

  btnRandom.addEventListener("click", function () {
    // Retirer l'animation précédente
    parfumCards.forEach((card) => {
      card.classList.remove("explode", "zoom-in");
    });

    // Sélectionner un parfum aléatoire
    const randomIndex = Math.floor(Math.random() * parfumCards.length);
    const selectedCard = parfumCards[randomIndex];

    // Ajouter l'animation d'explosion
    selectedCard.classList.add("explode");

    // Scroll vers la carte
    selectedCard.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    // Animation du bouton
    btnRandom.classList.add("jello");
    setTimeout(() => {
      btnRandom.classList.remove("jello");
    }, 1000);

    // Créer des particules autour de la carte
    createParticles(selectedCard);

    // Retirer l'animation après
    setTimeout(() => {
      selectedCard.classList.remove("explode");
    }, 600);
  });
}

// ===================================
// PARTICULES EXPLOSIVES
// ===================================

function createParticles(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const numberOfParticles = 15;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Position au centre de l'élément
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;

    // Direction aléatoire
    const angle = (Math.PI * 2 * i) / numberOfParticles;
    const velocity = Math.random() * 100 + 50;
    const tx = Math.cos(angle) * velocity;
    const ty = Math.sin(angle) * velocity;

    particle.style.setProperty("--tx", `${tx}px`);
    particle.style.setProperty("--ty", `${ty}px`);

    document.body.appendChild(particle);

    // Retirer après l'animation
    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}

// ===================================
// JOUR ACTUEL DANS LA TIMELINE
// ===================================

function highlightCurrentDay() {
  const today = new Date().getDay(); // 0 = Dimanche, 1 = Lundi, etc.
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    const dayData = parseInt(item.getAttribute("data-jour"));

    if (dayData === today) {
      item.classList.add("active");

      // Scroll vers le jour actuel (desktop)
      if (window.innerWidth > 768) {
        setTimeout(() => {
          item.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }, 500);
      }
    }
  });
}

// ===================================
// EFFET PARALLAXE LÉGER
// ===================================

function setupParallax() {
  const heroIllustration = document.querySelector(".hero-illustration");
  if (!heroIllustration) return;

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.3;
    heroIllustration.style.transform = `translateY(${
      scrolled * parallaxSpeed
    }px)`;
  });
}

// ===================================
// MOUVEMENT DE SOURIS (PARALLAXE)
// ===================================

function setupMouseParallax() {
  const emojiFloats = document.querySelectorAll(".emoji-float");

  if (emojiFloats.length === 0) return;

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    emojiFloats.forEach((emoji, index) => {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      emoji.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

// ===================================
// ANIMATION AU SCROLL (INTERSECTION OBSERVER)
// ===================================

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observer les éléments
  const elementsToAnimate = document.querySelectorAll(
    ".parfum-card, .timeline-item, .apropos-text, .apropos-visual, .footer-section"
  );

  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
}

// ===================================
// SMOOTH SCROLL POUR LES ANCRES
// ===================================

function setupSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      // Ignorer les liens vides
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
// ANIMATION DES CARTES DE PARFUMS AU CLIC
// ===================================

function setupParfumCardClick() {
  const parfumCards = document.querySelectorAll(".parfum-card");

  parfumCards.forEach((card) => {
    card.addEventListener("click", function () {
      // Ajouter l'animation
      this.classList.add("explode");

      // Créer des particules
      createParticles(this);

      // Retirer l'animation après
      setTimeout(() => {
        this.classList.remove("explode");
      }, 600);
    });
  });
}

// ===================================
// EMOJI QUI CLIGNE
// ===================================

function setupBlinkingEmoji() {
  const emojiElements = document.querySelectorAll(
    ".emoji-bounce, .emoji-clover"
  );

  emojiElements.forEach((emoji) => {
    setInterval(() => {
      emoji.style.transform = "scale(1.2)";
      setTimeout(() => {
        emoji.style.transform = "scale(1)";
      }, 200);
    }, 3000);
  });
}

// ===================================
// INITIALISATION AU CHARGEMENT
// ===================================

document.addEventListener("DOMContentLoaded", function () {
  console.log("🍦 HappyCone est chargé et prêt !");

  // Initialiser toutes les fonctionnalités
  createBulles();
  createConfetti();
  setupRandomParfum();
  highlightCurrentDay();
  setupParallax();
  setupMouseParallax();
  setupScrollAnimations();
  setupSmoothScroll();
  setupParfumCardClick();
  setupBlinkingEmoji();

  // Animation du slogan avec effet machine à écrire
  const slogan = document.getElementById("slogan");
  if (slogan) {
    const text = slogan.textContent;
    slogan.textContent = "";
    slogan.style.borderRight = "3px solid white";

    let index = 0;
    const typeWriter = () => {
      if (index < text.length) {
        slogan.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(() => {
          slogan.style.borderRight = "none";
        }, 500);
      }
    };

    setTimeout(typeWriter, 1000);
  }
});

// ===================================
// RESPONSIVE - ADAPTATIONS MOBILE
// ===================================

window.addEventListener("resize", function () {
  // Réinitialiser certaines animations sur mobile
  if (window.innerWidth < 768) {
    const slogan = document.getElementById("slogan");
    if (slogan) {
      slogan.style.whiteSpace = "normal";
      slogan.style.borderRight = "none";
    }
  }
});

// ===================================
// EASTER EGG - KONAMI CODE 🎮
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
    document.body.style.animation = "rainbow 2s linear infinite";

    // Créer une explosion de glaces
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const emoji = document.createElement("div");
        emoji.textContent = "🍦";
        emoji.style.position = "fixed";
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.top = "-50px";
        emoji.style.fontSize = "3rem";
        emoji.style.zIndex = "9999";
        emoji.style.animation = "confetti-fall 3s linear forwards";
        document.body.appendChild(emoji);

        setTimeout(() => emoji.remove(), 3000);
      }, i * 50);
    }

    // Réinitialiser après
    setTimeout(() => {
      document.body.style.animation = "";
    }, 2000);

    konamiCode = [];
  }
});

// Animation arc-en-ciel pour l'Easter egg
const style = document.createElement("style");
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

console.log("💡 Psst... Essayez le Konami Code ! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA");
