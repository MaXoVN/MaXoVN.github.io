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
const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'songs/lastingmemories.mp3',
        displayName: 'Lasting Memories',
        cover: 'images/Rinne1.jpg',
        artist: 'Yukari Tamura',
    },
    {
        path: 'songs/travelerstale.mp3',
        displayName: 'Traveler\'s Tale',
        cover: 'images/Rinne2.jpg',
        artist: 'Riya',
    },
    {
        path: 'songs/present.mp3',
        displayName: 'Present',
        cover: 'images/Rinne3.jpg',
        artist: 'Chata',
    },
    {
        path: 'songs/kimigaita.mp3',
        displayName: 'Kimi ga Ita',
        cover: 'images/Rinne4.jpg',
        artist: 'Eufonius',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);