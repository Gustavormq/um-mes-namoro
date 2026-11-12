const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const tapHint = document.getElementById('tap-hint');
const mainCard = document.getElementById('main-card');
const celebrationCard = document.getElementById('celebration-card');
const floatingBg = document.getElementById('floating-bg');
const glitterLayer = document.getElementById('glitter-layer');
const polaroids = Array.from(document.querySelectorAll('#polaroid-stage .polaroid'));

let yesTapCount = 0;
const REQUIRED_TAPS = 5;
let activePhotoIndex = 1;

const messages = [
  '',
  'Fugiu... tenta de novo 🦋 (1/5)',
  'Quase lá 🐟 (2/5)',
  'Mais um pouco 🐠 (3/5)',
  'Última vez, prometo 🦋 (4/5)'
];

// Destaca uma das polaroids lado a lado
function highlightPolaroid(nextIndex) {
  if (!polaroids.length) return;
  activePhotoIndex =
    typeof nextIndex === 'number'
      ? nextIndex % polaroids.length
      : (activePhotoIndex + 1) % polaroids.length;

  polaroids.forEach((card, idx) => {
    card.classList.toggle('active', idx === activePhotoIndex);
  });
}

polaroids.forEach((card, idx) => {
  card.addEventListener('click', () => highlightPolaroid(idx));
});

// Cria pontos de glitter cintilantes espalhados pela tela
function createGlitterSparkles() {
  if (!glitterLayer) return;
  const count = 34;
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('span');
    sparkle.className = 'sparkle';
    sparkle.style.left = `${Math.random() * 98}%`;
    sparkle.style.top = `${Math.random() * 98}%`;
    const scale = 0.5 + Math.random() * 0.9;
    sparkle.style.transform = `scale(${scale})`;
    sparkle.style.animationDuration = `${1.6 + Math.random() * 2.4}s`;
    sparkle.style.animationDelay = `${Math.random() * 2.5}s`;
    glitterLayer.appendChild(sparkle);
  }
}

createGlitterSparkles();

function moveYesButtonRandomly() {
  if (btnYes.parentElement !== document.body) {
    const rect = btnYes.getBoundingClientRect();
    document.body.appendChild(btnYes);
    btnYes.classList.add('fleeing');
    btnYes.style.left = `${rect.left}px`;
    btnYes.style.top = `${rect.top}px`;
  }

  const padding = 20;
  const btnWidth = btnYes.offsetWidth || 100;
  const btnHeight = btnYes.offsetHeight || 46;

  const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);

  const currentX = parseFloat(btnYes.style.left) || 0;
  const currentY = parseFloat(btnYes.style.top) || 0;
  const noRect = btnNo.getBoundingClientRect();

  let newX = padding;
  let newY = padding;
  let attempts = 0;

  do {
    newX = Math.floor(padding + Math.random() * (maxX - padding));
    newY = Math.floor(padding + Math.random() * (maxY - padding));
    attempts++;

    const distFromCurrent = Math.hypot(newX - currentX, newY - currentY);
    const overlapsNo =
      newX + btnWidth > noRect.left - 14 &&
      newX < noRect.right + 14 &&
      newY + btnHeight > noRect.top - 14 &&
      newY < noRect.bottom + 14;

    if (distFromCurrent > 90 && !overlapsNo) {
      break;
    }
  } while (attempts < 25);

  btnYes.style.left = `${newX}px`;
  btnYes.style.top = `${newY}px`;
}

function handleYesTap(event) {
  event.preventDefault();
  yesTapCount++;

  if (yesTapCount < REQUIRED_TAPS) {
    tapHint.textContent = messages[yesTapCount] || '';
    highlightPolaroid();
    moveYesButtonRandomly();
  } else {
    btnYes.remove();
    mainCard.classList.add('hidden');
    celebrationCard.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    burstButterfliesAndFish();
  }
}

if (btnYes) {
  btnYes.addEventListener('click', handleYesTap);
}

if (btnNo) {
  btnNo.addEventListener('click', () => {
    window.location.href = 'nao.html';
  });
}

// Borboletas e peixinhos subindo suavemente ao fundo
function spawnFloatingEmoji() {
  if (!floatingBg) return;
  const item = document.createElement('span');
  item.className = 'floating-item';
  const symbols = ['🦋', '🐟', '🐠'];
  item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  item.style.left = `${4 + Math.random() * 90}%`;
  const duration = 6 + Math.random() * 4.5;
  item.style.animationDuration = `${duration}s`;
  floatingBg.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, duration * 1000);
}

setInterval(spawnFloatingEmoji, 850);
spawnFloatingEmoji();
setTimeout(spawnFloatingEmoji, 300);

function burstButterfliesAndFish() {
  for (let i = 0; i < 24; i++) {
    setTimeout(spawnFloatingEmoji, i * 100);
  }
}
