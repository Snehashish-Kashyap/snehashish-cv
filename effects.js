// === Typing Animation (Loop with Blinking Cursor) ===
const roleElement = document.querySelector(".role");
if (roleElement) {
  const texts = [
    "Aspiring Software Engineer",
    "Full Stack Developer",
    "AI & IoT Enthusiast",
    "Problem Solver",
  ];
  let index = 0;
  let charIndex = 0;
  let isDeleting = false;

  // Add blinking cursor
  const cursor = document.createElement("span");
  cursor.textContent = "|";
  cursor.style.marginLeft = "4px";
  cursor.style.animation = "blink 0.7s infinite";
  roleElement.after(cursor);

  function type() {
    const current = texts[index];
    if (!isDeleting) {
      roleElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(type, 1500); // pause before deleting
        return;
      }
    } else {
      roleElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
      }
    }
    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();
}

// === Mouse Parallax Tilt for Cards ===
document.querySelectorAll(".card, .about-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) translateZ(0)";
  });
});

// === Light/Dark Mode Toggle ===
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

// === Neon Hover Trail (on skill tags) ===
const skills = document.querySelectorAll(".skill-tags span");
skills.forEach(skill => {
  skill.addEventListener("mousemove", e => {
    const { left, top } = skill.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    skill.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(184,132,243,0.5), rgba(126,87,194,0.25))`;
  });
  skill.addEventListener("mouseleave", () => {
    skill.style.background = "linear-gradient(145deg, rgba(184,132,243,0.2), rgba(126,87,194,0.25))";
  });
});

// === Cursor Blink Animation (CSS via JS) ===
const style = document.createElement("style");
style.textContent = `
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`;
document.head.appendChild(style);
