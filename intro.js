let progress = 0;
const maxProgress = 120;

const gradient = document.querySelector('.gradient-bg');
const wing = document.querySelector('.wing-overlay');
const header = document.querySelector('.site-header');
const title = document.querySelector('.section-wrapper');

let shown = false;
let isScrolling = false;

function updateVisuals() {
  const percent = Math.min(progress / maxProgress, 1);

  // Espansione del gradiente
  const scale = 0.2 + percent * 1.7;
  gradient.style.transform = `scale(${scale})`;
  gradient.style.opacity = percent;

  // Fading dell'immagine dell'ala
  wing.style.opacity = percent;

  // Mostra il testo finale
  if (percent >= 1 && !shown) {
    shown = true;
    document.querySelectorAll('.hidden').forEach(el => {
      el.classList.remove('hidden');
      el.classList.add('visible');
    });
  }
}

function animateScroll() {
  if (!isScrolling) return;

  progress += 2.5;
  updateVisuals();

  if (progress < maxProgress) {
    requestAnimationFrame(animateScroll);
  } else {
    isScrolling = false;
  }
}

// Usa 'wheel' per l'effetto anche se la pagina non scrolla
document.addEventListener('wheel', () => {
  if (!isScrolling && progress < maxProgress) {
    isScrolling = true;
    requestAnimationFrame(animateScroll);
  }
});
