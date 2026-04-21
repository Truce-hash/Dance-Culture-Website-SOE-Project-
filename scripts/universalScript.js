window.addEventListener("load", () => {
    const nameEl = document.querySelector(".name");
    const introEl = document.querySelector(".intro-loader");

    if (!nameEl || !introEl) return;

    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");

    if (!hasSeenIntro) {
        // First time visitor
        sessionStorage.setItem("hasSeenIntro", "true");

        // Run your nice animation
        setTimeout(() => {
            nameEl.style.opacity = "1";
            nameEl.style.transform = "translateY(0)";
        }, 400);

        setTimeout(() => {
            introEl.style.top = "-100%";
        }, 2200);
    } else {
        // Skip animation instantly for internal navigation
        introEl.style.transition = "none";
        introEl.style.top = "-100%";

        // Optional: Reset transition for future use (in case of refresh)
        setTimeout(() => {
            introEl.style.transition = "top 0.8s cubic-bezier(0.77, 0, 0.18, 1)";
        }, 100);
    }
});

// This script above handles the introductory animation on the home page, displaying a welcome message and then sliding it up to reveal the main content. 

// Page transition - Horizontal fade in/out effect
document.addEventListener("DOMContentLoaded", () => {
    const mainElement = document.querySelector("main");
    const navLinks = document.querySelectorAll("a");

    if (!mainElement) return;

    // Add click event listener to all links
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            const href = link.getAttribute("href");

            // Only handle internal page navigation (not anchor links, dropdowns, or external links)
            if (href && href.endsWith(".html") && !href.startsWith("http")) {
                e.preventDefault();

                // Apply fade-out animation
                mainElement.classList.add("fade-out");

                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 500); // Match the duration of fadeOutLeft animation (0.5s)
            }
        });
    });
});

// Auto-sliding carousel functionality
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("autoSlider");
    const sliderDots = document.querySelectorAll(".slider-dot");
    
    if (!slider || sliderDots.length === 0) return;

    let currentSlide = 0;
    const totalSlides = sliderDots.length;
    const slideInterval = 3000; // 3 seconds per slide

    function updateSlider() {
        const scrollPosition = (currentSlide * 100);
        slider.scrollLeft = (slider.offsetWidth * currentSlide);

        // Update active dot
        sliderDots.forEach((dot, index) => {
            dot.classList.remove("active");
            if (index === currentSlide) {
                dot.classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    // Auto-advance slides
    setInterval(nextSlide, slideInterval);

    // Allow manual navigation via dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener("click", (e) => {
            e.preventDefault();
            currentSlide = index;
            updateSlider();
        });
    });

    // Initialize
    updateSlider();
});
