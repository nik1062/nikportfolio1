(function () {
    // Section Switching Logic
    const controls = document.querySelectorAll(".control");
    const sections = document.querySelectorAll(".container"); // Sections & Header have .container

    function transitions() {
        // Button click active class
        controls.forEach((btn) => {
            btn.addEventListener("click", function() {
                // Remove active-btn from all controls
                controls.forEach((c) => c.classList.remove("active-btn"));
                this.classList.add("active-btn");

                // Handle section switching specifically
                const id = this.dataset.id;
                if (id) {
                    // Remove active from any element that has it in the main content area
                    // We target only .container elements to avoid conflicting with filter buttons
                    sections.forEach((section) => {
                        section.classList.remove("active");
                    });

                    const targetSection = document.getElementById(id);
                    if (targetSection) {
                        targetSection.classList.add("active");
                    }
                }
            });
        });

        // Toggle Theme
        const themeBtn = document.querySelector(".theme-btn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                document.body.classList.toggle("light-mode");
            });
        }
    }

    transitions();
})();

// Initialize everything on DOM Load
document.addEventListener("DOMContentLoaded", () => {
    // 1. Typing Effect
    const typedTextSpan = document.querySelector('.typing-text');
    if (typedTextSpan) {
        const textArray = ['Full-Stack Developer', 'Mobile App Developer', 'DevOps Enthusiast', 'AI/ML Explorer'];
        const typingDelay = 100;
        const erasingDelay = 50;
        const newTextDelay = 2000;
        let textArrayIndex = 0;
        let charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!typedTextSpan.classList.contains('typing')) typedTextSpan.classList.add('typing');
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                typedTextSpan.classList.remove('typing');
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if(!typedTextSpan.classList.contains('typing')) typedTextSpan.classList.add('typing');
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                typedTextSpan.classList.remove('typing');
                textArrayIndex++;
                if(textArrayIndex >= textArray.length) textArrayIndex = 0;
                setTimeout(type, typingDelay + 1100);
            }
        }
        
        setTimeout(type, newTextDelay + 250);
    }

    // 2. Portfolio Filtering
    const filterBtns = document.querySelectorAll('.portfolio-filters .filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.portfolio-filters .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                    setTimeout(() => item.style.opacity = '1', 50);
                } else {
                    item.classList.add('hide');
                    item.style.opacity = '0';
                    setTimeout(() => item.style.display = 'none', 300);
                }
            });
        });
    });

    // 3. Skill Filtering
    const skillFilterBtns = document.querySelectorAll('.skill-filters .skill-filter-btn');
    const skillBars = document.querySelectorAll('.progress-bar');

    skillFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.skill-filters .skill-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-skill');
            skillBars.forEach(bar => {
                if (filterValue === 'all' || bar.classList.contains(filterValue) || bar.classList.contains('all')) {
                    bar.style.display = 'block';
                    setTimeout(() => bar.style.opacity = '1', 50);
                } else {
                    bar.style.opacity = '0';
                    setTimeout(() => bar.style.display = 'none', 300);
                }
            });
        });
    });

    // 4. GitHub Stats
    (async function fetchGitHubStats() {
        const username = 'nik1062';
        const repoElement = document.getElementById('github-repos');
        if (!repoElement) return;

        try {
            const response = await fetch(`https://api.github.com/users/${username}`);
            if (response.ok) {
                const data = await response.json();
                repoElement.textContent = `${data.public_repos}+`;
            }
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
        }
    })();

    // 5. Skill Bar Animation on Scroll
    const animateSkill = (skill) => {
        const textEl = skill.querySelector(".prog-text");
        const span = skill.querySelector(".progress span");
        if (!textEl || !span) return;

        let finalValue = parseInt(textEl.textContent) || 80;
        let current = 0;
        textEl.textContent = "0%";
        span.style.width = "0%";

        let interval = setInterval(() => {
            current++;
            textEl.textContent = current + "%";
            span.style.width = current + "%";
            if (current >= finalValue) clearInterval(interval);
        }, 15);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".progress-bar").forEach((skill) => observer.observe(skill));
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progress = document.getElementById("scroll-progress");
    if (progress) progress.style.width = scrolled + "%";
});
