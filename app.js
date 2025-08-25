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
// Animate skills when scrolled into view
document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let percent = entry.target.getAttribute("data-percent");
        let circle = entry.target.querySelector(".circle span");
        let progress = 0;

        let interval = setInterval(() => {
          if (progress >= percent) {
            clearInterval(interval);
          } else {
            progress++;
            circle.textContent = progress + "%";
            entry.target.querySelector(".circle::before");
          }
        }, 15);
      }
    });
  }, { threshold: 0.5 });

  skills.forEach(skill => observer.observe(skill));
});
