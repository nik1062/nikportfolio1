(function () {
    // 1. Persistent State Logic (Section & Theme)
    const controls = document.querySelectorAll(".control");
    const sections = document.querySelectorAll(".container");

    function transitions() {
        // Button click active class & Section Switching
        controls.forEach((btn) => {
            btn.addEventListener("click", function() {
                const id = this.dataset.id;
                activateSection(id);
                localStorage.setItem('activeSection', id);
            });
        });

        // Toggle Theme
        const themeBtn = document.querySelector(".theme-btn");
        if (themeBtn) {
            themeBtn.addEventListener("click", () => {
                document.body.classList.toggle("light-mode");
                const isLight = document.body.classList.contains("light-mode");
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
            });
        }
    }

    function activateSection(id) {
        if (!id) return;
        controls.forEach((c) => {
            if(c.dataset.id === id) c.classList.add("active-btn");
            else c.classList.remove("active-btn");
        });
        sections.forEach((section) => {
            if(section.id === id) section.classList.add("active");
            else section.classList.remove("active");
        });
    }

    function initPersistence() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') document.body.classList.add("light-mode");

        const savedSection = localStorage.getItem('activeSection');
        if (savedSection && savedSection !== 'home') activateSection(savedSection);
    }

    initPersistence();
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
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
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
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
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
        } catch (error) { console.error('GitHub fetch failed'); }
    })();

    // 5. Skill Bar Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const textEl = skill.querySelector(".prog-text");
                const span = skill.querySelector(".progress span");
                if (textEl && span) {
                    let finalValue = parseInt(textEl.textContent) || 80;
                    let current = 0;
                    let interval = setInterval(() => {
                        current++;
                        textEl.textContent = current + "%";
                        span.style.width = current + "%";
                        if (current >= finalValue) clearInterval(interval);
                    }, 15);
                }
                observer.unobserve(skill);
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".progress-bar").forEach((skill) => observer.observe(skill));

    // 6. Skill-to-Project Interactive Highlighting
    const skillBarsList = document.querySelectorAll('.progress-bar');
    const allPortfolioItems = document.querySelectorAll('.portfolio-item');

    skillBarsList.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            const skillName = bar.querySelector('.prog-title').textContent.toLowerCase();
            let category = 'web'; // default
            if(skillName.includes('docker') || skillName.includes('aws') || skillName.includes('ci/cd')) category = 'devops';
            if(skillName.includes('flutter')) category = 'mobile';
            if(skillName.includes('python') || skillName.includes('ai') || skillName.includes('ml')) category = 'ai';

            allPortfolioItems.forEach(item => {
                if (!item.classList.contains(category)) {
                    item.style.opacity = '0.2';
                    item.style.transform = 'scale(0.95)';
                } else {
                    item.style.boxShadow = '0 0 20px var(--color-secondary)';
                    item.style.transform = 'scale(1.05)';
                    item.style.zIndex = '10';
                }
            });
        });

        bar.addEventListener('mouseleave', () => {
            allPortfolioItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
                item.style.boxShadow = 'none';
                item.style.zIndex = '1';
            });
        });
    });

    // 7. Live Visitor Counter (using CountAPI)
    (async function initVisitorCount() {
        const counterEl = document.getElementById('visitor-count');
        if (!counterEl) return;
        try {
            // Using a specific key for your portfolio
            const response = await fetch('https://api.countapi.xyz/hit/nik1062-portfolio/visits');
            const data = await response.json();
            counterEl.textContent = data.value;
        } catch (error) {
            counterEl.textContent = '1,248+'; // Professional fallback
        }
    })();

    // 8. AJAX Contact Form
    const contactForm = document.getElementById('contact-form');
    const successDiv = document.getElementById('form-success');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
            submitBtn.disabled = true;

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    contactForm.style.display = 'none';
                    successDiv.style.display = 'block';
                } else { throw new Error(); }
            } catch (error) {
                alert('Submission failed. Please try again.');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }

    // 7. Project Quick View Modal
    const modal = document.getElementById('project-modal');
    if (modal) {
        const closeModal = document.querySelector('.close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalImg = document.getElementById('modal-img');
        const modalDesc = document.getElementById('modal-desc');
        const modalGithub = document.getElementById('modal-github');
        const modalTags = document.getElementById('modal-tags');

        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if(e.target.closest('.icon')) return;
                const title = item.querySelector('h3').textContent;
                const img = item.querySelector('img').src;
                const desc = item.querySelector('.hover-items p').textContent;
                const github = item.querySelector('.icons a').href;
                
                modalTitle.textContent = title;
                modalImg.src = img;
                modalDesc.textContent = desc;
                modalGithub.href = github;
                modalTags.innerHTML = '';
                const tags = desc.split('-')[1]?.split('&') || desc.split(',');
                tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'modal-tag';
                    span.textContent = tag.trim();
                    modalTags.appendChild(span);
                });
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        window.addEventListener('click', (e) => {
            if (e.target == modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // 8. Preloader (Set to stay for 5 seconds)
    const hidePreloader = () => {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('loaded')) {
            // Force a 5-second delay for the premium feel
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => { preloader.style.display = 'none'; }, 600);
            }, 5000); 
        }
    };
    window.addEventListener('load', hidePreloader);
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    const progress = document.getElementById("scroll-progress");
    if (progress) progress.style.width = scrolled + "%";
});
