
const teamMembers = [
    {
        name: "Kamohelo Phatsoane",
        role: "Lead Full-Stack Developer",
        bio: "Problem solver at heart, passionate about crafting seamless digital experiences. ",
        image: "assets/Team/Kamohelo.jpeg",
        fullBio: "Witht over 3 years of experience in crafting modern web experiences and moblie applications. Good in C#, Dart, HTML/CSS, JavaScript, Python, mobile app development using Flutter and 3D web animations. ",
        github: "https://github.com/Truce-hash",
        linkedin: "https://www.linkedin.com/in/kamohelo-phatsoane-2650883b6"
    },
    {
        name: "Sibusiso Lukhele",
        role: "Full-Stack Developer",
        bio: "Focused on building excellence and creating opportunities for future generations",
        image: "assets/Team/Sibusiso.jpeg",
        fullBio: "Sibusiso specializes in high-performance backend systems. Good in C#, Dart, HTML/CSS, JavaScript and mobile app development using flutter. Passionate about building scalable and efficient applications that solve real-world problems.",
        github: "https://github.com/blessingmikay19-cyber",
        linkedin: "https://www.linkedin.com/in/sibusiso-lukhele-a96494404/"
    },
    {
        name: "Asinikile Sodlulashe",
        role: "Frontend Developer",
        bio: "Passionate about building responsive and user-friendly web interfaces.",
        image: "assets/Team/Cruz.jpeg",
        fullBio: "Asinikile is a frontend developer focused on creating clean, interactive, and accessible web experiences using modern technologies like HTML, CSS, and JavaScript. Enjoys turning ideas into visually appealing and functional designs.",
        github: "https://github.com/sodlulasheasinikile-debug",
        linkedin: "https://www.linkedin.com/in/asinikile-sodlulashe-9b1a8b3b0/"
    },
    {
        name: "Siphosethu Mbasa",
        role: "Frontend Developer",
        bio: "Passionate about creating reliable backend systems and managing data-driven applications.",
        image: "assets/Team/mbasa.jpeg",
        fullBio: "Specializes in backend logic, database integration, and application architecture. Experienced in working with C#, Python, and RESTful APIs. Focuses on building scalable systems, optimizing performance, and ensuring smooth communication between the server and front-end components.",
        github: "https://github.com/224107046",
        linkedin: "https://www.linkedin.com/in/siphosethu-mbasa-837959404"
    },
    {
        name: "Roman Tshabalala",
        role: "Backend Developer",
        bio: "Focused on building secure, efficient systems that power applications behind the scenes.",
        image: "assets/Team/mshini.jpeg",
        fullBio: "Experienced in designing and maintaining server-side applications with strong problem-solving skills. Proficient in C# and database management using SQL and SQLite. Skilled in API development, data handling, and ensuring system performance and security in modern web applications.",
        github: "https://github.com/RomanTshabalala",
        linkedin: "https://www.linkedin.com/in/moeketsi-tshabalala-740b44404"
    },
    {
        name: "Musa Bonga",
        role: "Backend Developer",
        bio: "Third Year IT Diploma Student | Skilled in C#, JavaScript, HTML/CSS, and Flutter",
        image: "assets/Team/image.jpeg",
        fullBio: "Musa thrives on building seamless digital experiences across web and mobile. Always exploring new backend patterns and cross platform frameworks, he blends C#, JavaScript, HTML/CSS, and Flutter to craft solutions that are both functional and elegant.",
        github: "https://github.com/musabonga253-blip",
        linkedin: "https://www.linkedin.com/in/musa-bonga-55abb7330"



    }
];

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const scene = document.querySelector('.scene');
    
    const numSlides = teamMembers.length;
    const angleStep = 360 / numSlides;
    const radius = 395;

    // Color assignments for each team member
    const profileColors = ['color-cyan', 'color-purple', 'color-pink', 'color-green', 'color-red', 'color-orange'];

    let currentAngle = 0;
    let autoRotateInterval = null;
    let isPaused = false;
    let currentSlideIndex = 0;

    // Create slides
    teamMembers.forEach((member, index) => {
        const slide = document.createElement('div');
        slide.className = `slide ${profileColors[index]}`;
        slide.dataset.index = index;
        
        const rotation = index * angleStep;
        slide.style.transform = `rotateY(${rotation}deg) translateZ(${radius}px)`;
        
        slide.innerHTML = `
            <img src="${member.image}" alt="${member.name}">
            <div class="profile-overlay">
                <div class="profile-info">
                    <h3 class="name">${member.name}</h3>
                    <p class="role">${member.role}</p>
                </div>
                <div class="profile-bio">${member.bio}</div>
                <button class="view-profile-btn">View Full Profile</button>
            </div>
        `;
        
        // Click anywhere on slide to bring to front
        slide.addEventListener('click', (e) => {
            if (e.target.classList.contains('view-profile-btn')) return;
            
            currentSlideIndex = index;
            rotateToSlide(index);
        });
        
        carousel.appendChild(slide);
    });

    const rotateToSlide = (index) => {
        isPaused = true;
        if (autoRotateInterval) {
            clearInterval(autoRotateInterval);
            autoRotateInterval = null;
        }
        
        currentAngle = -index * angleStep;
        carousel.style.transition = 'transform 1.1s cubic-bezier(0.23, 1, 0.32, 1)';
        carousel.style.transform = `rotateY(${currentAngle}deg)`;
        
        // Resume auto-rotate after a few seconds
        setTimeout(() => {
            if (!isPaused) startAutoRotate();
        }, 4500);
    };

    const startAutoRotate = () => {
        if (autoRotateInterval) clearInterval(autoRotateInterval);
        
        autoRotateInterval = setInterval(() => {
            if (!isPaused) {
                currentSlideIndex = (currentSlideIndex + 1) % numSlides;
                currentAngle = -currentSlideIndex * angleStep;
                carousel.style.transition = 'transform 0.9s cubic-bezier(0.25, 1, 0.35, 1)';
                carousel.style.transform = `rotateY(${currentAngle}deg)`;
            }
        }, 3400);
    };

    // Hover handling
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.addEventListener('mouseenter', () => {
            isPaused = true;
            if (autoRotateInterval) {
                clearInterval(autoRotateInterval);
                autoRotateInterval = null;
            }
        });

        slide.addEventListener('mouseleave', () => {
            isPaused = false;
            setTimeout(() => {
                if (!isPaused) startAutoRotate();
            }, 900);
        });
    });

    // Modal functionality
    function showProfileModal(index) {
        const member = teamMembers[index];
        const modalHTML = `
            <div class="modal-overlay" id="profile-modal">
                <div class="modal-content">
                    <button class="modal-close">×</button>
                    <img src="${member.image}" alt="${member.name}" class="modal-image">
                    <h2>${member.name}</h2>
                    <p class="modal-role">${member.role}</p>
                    <p class="modal-bio">${member.fullBio}</p>
                    
                    <div class="social-links">
                        <a href="${member.github}" target="_blank" class="social-btn">GitHub</a>
                        <a href="${member.linkedin}" target="_blank" class="social-btn">LinkedIn</a>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        const modal = document.getElementById('profile-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // Attach View Profile button listeners
    setTimeout(() => {
        document.querySelectorAll('.view-profile-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const slide = e.target.closest('.slide');
                const index = parseInt(slide.dataset.index);
                showProfileModal(index);
            });
        });
    }, 100);

    // Start everything
    startAutoRotate();

    
});