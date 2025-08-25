(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();
document.addEventListener("DOMContentLoaded", () => {
  const progressBars = document.querySelectorAll(".progress-bar");

  progressBars.forEach(bar => {
    let percentText = bar.querySelector(".prog-text").innerText; // e.g. "85%"
    let percent = parseInt(percentText.replace("%", "")); // only number
    let span = bar.querySelector(".progress span");

    let width = 0;
    let interval = setInterval(() => {
      if (width >= percent) {
        clearInterval(interval);
      } else {
        width++;
        span.style.width = width + "%";
        bar.querySelector(".prog-text").innerText = width + "%";
      }
    }, 20); // speed of animation
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const skillSections = document.querySelectorAll(".progress-bar");

  const animateSkill = (skill) => {
    const textEl = skill.querySelector(".prog-text");
    const span = skill.querySelector(".progress span");

    let finalValue = parseInt(textEl.textContent); // e.g. 90
    let current = 0;

    // reset first
    textEl.textContent = "0%";
    span.style.width = "0%";

    let interval = setInterval(() => {
      current++;
      textEl.textContent = current + "%";
      span.style.width = current + "%";

      if (current >= finalValue) {
        clearInterval(interval);
      }
    }, 20); // speed
  };

  // Intersection Observer (when visible in viewport)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateSkill(entry.target);
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.1 } // half visible
  );

  skillSections.forEach((skill) => {
    observer.observe(skill);
  });
});

