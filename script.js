// Add your photos here.
// Leave caption as an empty string ("") if you do not want a caption.
// alt is used by screen readers and should briefly describe the image.
const photos = [
  {
    src: "images/photo1.jpg",
    caption: "",
    alt: "Photo one"
  },
  {
    src: "images/photo2.jpg",
    caption: "",
    alt: "Photo two"
  },
  {
    src: "images/photo3.jpg",
    caption: "",
    alt: "Photo three"
  },
  {
    src: "images/photo4.jpg",
    caption: "",
    alt: "Photo four"
  },
  {
    src: "images/photo5.jpg",
    caption: "",
    alt: "Photo five"
  },
  {
    src: "images/photo6.jpg",
    caption: "",
    alt: "Photo six"
  },
  {
    src: "images/photo7.jpg",
    caption: "",
    alt: "Photo seven"
  },
  {
    src: "images/photo8.jpg",
    caption: "",
    alt: "Photo eight"
  },
  {
    src: "images/photo9.jpg",
    caption: "",
    alt: "Photo nine"
  },
  {
    src: "images/photo10.jpg",
    caption: "",
    alt: "Photo ten"
  },
  {
    src: "images/photo11.jpg",
    caption: "",
    alt: "Photo eleven"
  },
  {
    src: "images/photo12.jpg",
    caption: "",
    alt: "Photo twelve"
  },
  {
    src: "images/photo13.jpg",
    caption: "",
    alt: "Photo thirteen"
  },
  {
    src: "images/photo14.jpg",
    caption: "",
    alt: "Photo fourteen"
  }
];

const image = document.getElementById("carouselImage");
const caption = document.getElementById("caption");
const counter = document.getElementById("counter");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const imageStage = document.getElementById("imageStage");

let currentIndex = 0;
let touchStartX = null;
let touchStartY = null;
let transitionTimer = null;

function padNumber(number) {
  return String(number).padStart(2, "0");
}

function renderPhoto(index, animate = true) {
  if (!photos.length) {
    image.removeAttribute("src");
    image.alt = "";
    caption.textContent = "No photos added yet.";
    counter.textContent = "";
    prevButton.hidden = true;
    nextButton.hidden = true;
    return;
  }

  const photo = photos[index];

  if (animate) {
    image.classList.add("is-changing");
    clearTimeout(transitionTimer);
    transitionTimer = setTimeout(() => {
      updateContent(photo);
      requestAnimationFrame(() => image.classList.remove("is-changing"));
    }, 120);
  } else {
    updateContent(photo);
  }
}

function updateContent(photo) {
  image.src = photo.src;
  image.alt = photo.alt || "";
  caption.textContent = photo.caption || "";
  counter.textContent = `${padNumber(currentIndex + 1)} / ${padNumber(photos.length)}`;
}

function showNextPhoto() {
  currentIndex = (currentIndex + 1) % photos.length;
  renderPhoto(currentIndex);
}

function showPreviousPhoto() {
  currentIndex = (currentIndex - 1 + photos.length) % photos.length;
  renderPhoto(currentIndex);
}

prevButton.addEventListener("click", showPreviousPhoto);
nextButton.addEventListener("click", showNextPhoto);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") showNextPhoto();
  if (event.key === "ArrowLeft") showPreviousPhoto();
});

imageStage.addEventListener(
  "touchstart",
  (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  },
  { passive: true }
);

imageStage.addEventListener(
  "touchend",
  (event) => {
    if (touchStartX === null || touchStartY === null) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    touchStartX = null;
    touchStartY = null;

    // Ignore vertical gestures and very short horizontal gestures.
    if (Math.abs(deltaX) < 45 || Math.abs(deltaX) < Math.abs(deltaY)) return;

    if (deltaX < 0) {
      showNextPhoto();
    } else {
      showPreviousPhoto();
    }
  },
  { passive: true }
);

// Preload the next and previous images for smoother navigation.
function preloadImages() {
  photos.forEach((photo) => {
    const preload = new Image();
    preload.src = photo.src;
  });
}

renderPhoto(currentIndex, false);
preloadImages();
