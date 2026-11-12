const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
const tapHint = document.getElementById('tap-hint');
const mainCard = document.getElementById('main-card');
const celebrationCard = document.getElementById('celebration-card');

let yesTapCount = 0;
const REQUIRED_TAPS = 5;

const messages = [
  '',
  'Fugiu... tenta de novo 🦋 (1/5)',
  'Quase lá 🐟 (2/5)',
  'Mais um pouco 🐠 (3/5)',
  'Última vez, prometo 🦋 (4/5)'
];

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
    moveYesButtonRandomly();
  } else {
    btnYes.remove();
    mainCard.classList.add('hidden');
    celebrationCard.classList.remove('hidden');
  }
}

btnYes.addEventListener('click', handleYesTap);

btnNo.addEventListener('click', () => {
  window.location.href = 'nao.html';
});
