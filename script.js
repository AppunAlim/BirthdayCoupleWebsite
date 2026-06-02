// Memastikan semua elemen HTML selesai dimuat terlebih dahulu
document.addEventListener('DOMContentLoaded', () => {

  // Custom cursor
  const cursor = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  
  if (cursor && cursorRing) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      setTimeout(() => {
        cursorRing.style.left = e.clientX + 'px';
        cursorRing.style.top = e.clientY + 'px';
      }, 80);
    });

    document.querySelectorAll('button, a, input, textarea').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)');
      el.addEventListener('mouseleave', () => cursorRing.style.transform = 'translate(-50%,-50%) scale(1)');
    });
  }

  // Petals
  const petalsContainer = document.getElementById('petalsBg');
  if (petalsContainer) {
    for (let i = 0; i < 18; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      petal.style.left = Math.random() * 100 + 'vw';
      petal.style.animationDuration = (6 + Math.random() * 8) + 's';
      petal.style.animationDelay = (Math.random() * 10) + 's';
      petal.style.width = (8 + Math.random() * 8) + 'px';
      petal.style.height = (10 + Math.random() * 8) + 'px';
      const hue = Math.random() > 0.5 ? '#FFD6DF' : '#FFB3C6';
      petal.style.background = hue;
      petalsContainer.appendChild(petal);
    }
  }

  // Floating hearts in hero
  const heartsContainer = document.getElementById('heroHearts');
  const heartEmojis = ['❤️', '🌹', '💕', '✨', '💫', '🌸'];
  if (heartsContainer) {
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('div');
      h.className = 'floating-heart';
      h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      h.style.left = (5 + Math.random() * 90) + 'vw';
      h.style.top = (5 + Math.random() * 90) + 'vh';
      h.style.fontSize = (14 + Math.random() * 16) + 'px';
      h.style.animationDelay = (Math.random() * 6) + 's';
      h.style.animationDuration = (6 + Math.random() * 4) + 's';
      heartsContainer.appendChild(h);
    }
  }

  // Set today as default input date
  const bdayInput = document.getElementById('bdayInput');
  if (bdayInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    bdayInput.value = yyyy + '-' + mm + '-' + dd;
    updateCountdown();
  }

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));

});

// Fungsi global untuk Countdown (bisa dipanggil dari HTML onclick)
function updateCountdown() {
  const inputEl = document.getElementById('bdayInput');
  if (!inputEl) return;
  const input = inputEl.value;
  if (!input) return;
  clearInterval(window._countdownInterval);
  window._countdownInterval = setInterval(() => tick(input), 1000);
  tick(input);
}

function tick(dateStr) {
  const now = new Date();
  let target = new Date(dateStr);
  target.setFullYear(now.getFullYear());
  if (target < now) target.setFullYear(now.getFullYear() + 1);

  const diff = target - now;
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const birthdayMsg = document.getElementById('birthdayMsg');

  if (diff <= 0 || diff < 86400000 * 0) {
    if (daysEl) daysEl.textContent = '0';
    if (hoursEl) hoursEl.textContent = '0';
    if (minutesEl) minutesEl.textContent = '0';
    if (secondsEl) secondsEl.textContent = '0';
    if (birthdayMsg) birthdayMsg.style.display = 'block';
    launchConfetti();
    return;
  }
  
  if (birthdayMsg) birthdayMsg.style.display = 'none';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  
  if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
  if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
  if (minutesEl) minutesEl.textContent = String(m).padStart(2, '0');
  if (secondsEl) secondsEl.textContent = String(s).padStart(2, '0');
}

// Fungsi global untuk Update Message
function updateMessage() {
  const msg = document.getElementById('customMsg').value.trim();
  const to = document.getElementById('toName').value.trim();
  const from = document.getElementById('fromName').value.trim();
  
  if (msg) document.getElementById('msgText').textContent = msg;
  const fromText = (from ? '— ' + from : '— Dengan cinta tulus') + ' ❤️';
  document.getElementById('msgFrom').textContent = fromText;
  if (to) document.getElementById('heroSubtitle').textContent = 'Selamat ulang tahun, ' + to + '! Hari ini adalah harimu yang paling istimewa 💕';
  
  const msgCard = document.getElementById('msgCard');
  if (msgCard) {
    msgCard.style.animation = 'none';
    msgCard.offsetHeight;
    msgCard.style.animation = '';
  }
  document.getElementById('message').scrollIntoView({ behavior: 'smooth' });
}

// Fungsi global untuk Confetti
function launchConfetti(btn) {
  if (btn) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
    ripple.style.left = '0px'; ripple.style.top = '0px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  }

  const colors = ['#E8506A','#FFB3C6','#D4A843','#FF8FA3','#FFC8D4','#C03050','#F4C2C2','#FFD700'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = (5 + Math.random() * 90) + 'vw';
      piece.style.top = '-10px';
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = (6 + Math.random() * 6) + 'px';
      piece.style.height = (8 + Math.random() * 8) + 'px';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      piece.style.animationDelay = '0s';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      document.body.appendChild(piece);
      setTimeout(() => piece.remove(), 4000);
    }, i * 30);
  }
}