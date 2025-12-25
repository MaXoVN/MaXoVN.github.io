  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    // Keep preloader visible for 3 seconds
    setTimeout(() => {
      // Fade out preloader
      preloader.style.opacity = "0";
      preloader.style.transition = "opacity 0.5s ease";

      // After fade-out, hide preloader and show content
      setTimeout(() => {
        preloader.style.display = "none";
        mainContent.classList.add("rise-in");
      }, 500); // Wait for fade-out to finish
    }, 2000); // 3-second delay before fade-out starts
  });
  window.onload = function() {
  const canvas = document.getElementById('sparks-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const sparks = [];
  function createSpark(x, y) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 2 + 1;
    sparks.push({
      x: x,
      y: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 60 + Math.random() * 40
    });
  }

  function updateSparks() {
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.life--;
      if (s.life <= 0) sparks.splice(i, 1);
    }
  }

  function drawSparks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const s of sparks) {
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(249, 21, 234, ${s.life / 100})`;
      ctx.fill();
    }
  }

  function loop() {
    updateSparks();
    drawSparks();
    requestAnimationFrame(loop);
  }
  loop();

  // Add sparks at mouse position on left or right click
  document.addEventListener('mousedown', function(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    for (let i = 0; i < 30; i++) {
      createSpark(x, y);
    }
  });
}