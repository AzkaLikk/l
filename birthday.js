// UBAH DATA TEMANMU DI BAGIAN INI
const CONFIG = {
  nickname: "YOUR NAME",
  profileTitle: "The person behind the story",
  profileText: "Di sini nanti tulis hal-hal yang kamu tahu tentang temanmu: nama panggilan, hal favorit, kebiasaan unik, sifat, dan kenangan kalian."
};

const byId = id => document.getElementById(id);
["opening-name", "book-name", "profile-button"].forEach(id => {
  const el = byId(id);
  if (el) el.textContent = CONFIG.nickname;
});
byId("profile-title").textContent = CONFIG.profileTitle;
byId("profile-text").textContent = CONFIG.profileText;

const opening = byId("opening");
const bookScene = byId("book-scene");
const book = byId("book");
const website = byId("website");
let transitioning = false;

function enterWebsite() {
  if (transitioning) return;
  transitioning = true;
  opening.classList.add("hide");
  bookScene.classList.add("show");
  window.setTimeout(() => book.classList.add("open"), 450);
  window.setTimeout(() => {
    bookScene.style.transition = "opacity .9s";
    bookScene.style.opacity = "0";
    website.classList.add("ready");
    window.setTimeout(() => {
      bookScene.classList.remove("show");
      bookScene.style.opacity = "";
      document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
    }, 950);
  }, 2400);
}
byId("begin").addEventListener("click", enterWebsite);

byId("profile-button").addEventListener("click", () => byId("profile-dialog").showModal());
document.querySelectorAll("[data-close]").forEach(button => {
  button.addEventListener("click", () => byId(button.dataset.close).close());
});

byId("gift-button").addEventListener("click", () => {
  const isOpen = byId("gift-box").classList.toggle("open");
  byId("gift-button").setAttribute("aria-expanded", String(isOpen));
  byId("birthday-card").classList.toggle("show", isOpen);
  byId("gift-hint").textContent = isOpen ? "A little wish, from me to you ✦" : "Tap the gift to open it ✦";
  if (isOpen) makeBalloons();
});

function makeBalloons() {
  const holder = byId("balloons");
  holder.innerHTML = "";
  const colors = ["#d8b66a", "#315f91", "#f3e4bb", "#8da9c8", "#b99452"];
  for (let i = 0; i < 12; i++) {
    const balloon = document.createElement("span");
    balloon.className = "balloon";
    balloon.style.left = (5 + Math.random() * 90) + "%";
    balloon.style.background = `linear-gradient(120deg,${colors[i % colors.length]},#fff8df)`;
    balloon.style.animationDelay = (Math.random() * .8) + "s";
    holder.appendChild(balloon);
  }
}

// Gallery photo zoom (all 15 photos)
document.querySelectorAll(".gallery-card").forEach(card => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    byId("large-photo").src = img.src;
    byId("large-photo").alt = img.alt;
    byId("photo-dialog").showModal();
  });
});
byId("photo-dialog").addEventListener("click", event => {
  if (event.target === byId("photo-dialog")) byId("photo-dialog").close();
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
}

// Show a neat fallback if a photo has not been added yet.
document.querySelectorAll("img").forEach(img => {
  img.addEventListener("error", () => {
    img.classList.add("missing-photo");
    img.alt = "Tambahkan foto sesuai nama file di folder images";
  });
});
