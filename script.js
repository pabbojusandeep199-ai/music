const songs = [
  {
    title: "SoundHelix Song 1",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
  },
  {
    title: "Kalimba",
    artist: "Sample Music",
    src: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81"
  },
  {
    title: "Horse",
    artist: "Sample Music",
    src: "https://www.learningcontainer.com/wp-content/uploads/2020/02/horse.mp3",
    cover: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2"
  },
  {
    title: "SoundHelix Song 2",
    artist: "SoundHelix",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const player = document.querySelector(".player");

let index = 0;
let isPlaying = false;

function loadSong(i) {
  const song = songs[i];

  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover + "?auto=format&fit=crop&w=500&q=80";

  updatePlaylist();
}

function playSong() {
  audio.play();
  isPlaying = true;
  player.classList.add("playing");
  playBtn.textContent = "⏸";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  player.classList.remove("playing");
  playBtn.textContent = "▶";
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function nextSong() {
  index = (index + 1) % songs.length;
  loadSong(index);
  playSong();
}

function prevSong() {
  index = (index - 1 + songs.length) % songs.length;
  loadSong(index);
  playSong();
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";

  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);

  if (sec < 10) sec = "0" + sec;

  return `${min}:${sec}`;
}

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }

  current.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

audio.addEventListener("ended", nextSong);

playBtn.addEventListener("click", togglePlay);
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

function createPlaylist() {
  playlist.innerHTML = "";

  songs.forEach((song, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${song.title}</strong><br>
      <small>${song.artist}</small>
    `;

    li.addEventListener("click", () => {
      index = i;
      loadSong(index);
      playSong();
    });

    playlist.appendChild(li);
  });
}

function updatePlaylist() {
  const items = playlist.querySelectorAll("li");

  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    e.preventDefault();
    togglePlay();
  }

  if (e.key === "ArrowRight") nextSong();
  if (e.key === "ArrowLeft") prevSong();
});

audio.volume = 0.8;
createPlaylist();
loadSong(index);
