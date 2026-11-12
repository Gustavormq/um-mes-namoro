const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const tapHint = document.getElementById('tap-hint');
const mainCard = document.getElementById('main-card');
const celebrationCard = document.getElementById('celebration-card');
const heartsBg = document.getElementById('hearts-bg');

let yesTapCount = 0;
const REQUIRED_TAPS = 5;

const playfulMessages = [
  '',
  'Opa! Fugiu! Aperta de novo 😜 (1/5)',
  'Quase lá! Mostra que você quer mesmo 💕 (2/5)',
  'Tá ficando rápida hein! 😂 (3/5)',
  'Só mais uma vez para confirmar! 🥰 (4/5)'
];

// Posiciona o botão "Sim" em um lugar aleatório seguro da tela do celular
function moveYesButtonRandomly() {
  // Move o botão para o body na primeira vez para que `position: fixed`
  // use a janela inteira (evitando o filtro/transform do card pai)
  if (btnYes.parentElement !== document.body) {
    const rect = btnYes.getBoundingClientRect();
    document.body.appendChild(btnYes);
    btnYes.classList.add('fleeing');
    btnYes.style.left = `${rect.left}px`;
    btnYes.style.top = `${rect.top}px`;
  }

  const padding = 20;
  const btnWidth = btnYes.offsetWidth || 110;
  const btnHeight = btnYes.offsetHeight || 48;

  const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
  const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);

  // Evita cair muito perto da posição atual ou em cima do botão "Não"
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
      newX + btnWidth > noRect.left - 12 &&
      newX < noRect.right + 12 &&
      newY + btnHeight > noRect.top - 12 &&
      newY < noRect.bottom + 12;

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
    tapHint.textContent = playfulMessages[yesTapCount] || '';
    moveYesButtonRandomly();
  } else {
    // 5º toque: Aceitou!
    btnYes.remove();
    mainCard.classList.add('hidden');
    celebrationCard.classList.remove('hidden');
    burstHearts();
  }
}

// Funciona perfeitamente no toque do celular e no clique do computador
btnYes.addEventListener('click', handleYesTap);

// Botão "Não" redireciona para a página da carinha triste
btnNo.addEventListener('click', () => {
  window.location.href = 'nao.html';
});

// Cria corações flutuantes no fundo
function createFloatingHeart() {
  if (!heartsBg) return;
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  const emojis = ['❤️', '💖', '💕', '💘', '✨'];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  heart.style.left = `${Math.random() * 94}%`;
  const duration = 5 + Math.random() * 4;
  heart.style.animationDuration = `${duration}s`;
  heartsBg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(createFloatingHeart, 700);

function burstHearts() {
  for (let i = 0; i < 28; i++) {
    setTimeout(createFloatingHeart, i * 90);
  }
}
