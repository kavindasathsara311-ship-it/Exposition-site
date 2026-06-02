const body = document.body;
const nav = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        nav.classList.remove("scroll-down");
        return;
    }

    if (currentScroll > lastScroll && !nav.classList.contains("scroll-down")) {
        nav.classList.add("scroll-down");
    } else if (currentScroll < lastScroll && nav.classList.contains("scroll-down")) {
        nav.classList.remove("scroll-down");
    }

    lastScroll = currentScroll;
});



// ==========================================
// 1. CAROUSEL 3D ENGINE & STATES
// ==========================================
let currentIndex = 0;
const totalCards = 8;
const degreesPerStep = 45;
const cylinder = document.getElementById('cylinder');
const dots = document.querySelectorAll('.carousel-nav-dots .dot');

// Drag support
let isDragging = false;
let dragStartX = 0;
let dragDeltaX = 0;
const dragThreshold = 40;
const carouselStage = document.querySelector('.carousel-stage');

function getPointerX(event) {
    if (event.type.startsWith('touch')) {
        return event.touches[0]?.clientX ?? event.changedTouches[0]?.clientX;
    }
    return event.clientX;
}

function handleCarouselDragStart(event) {
    isDragging = true;
    dragStartX = getPointerX(event);
    dragDeltaX = 0;
    stopAutoplay();
    if (carouselStage) carouselStage.classList.add('dragging');
}

function handleCarouselDragMove(event) {
    if (!isDragging) return;
    const pointerX = getPointerX(event);
    dragDeltaX = pointerX - dragStartX;
}

function handleCarouselDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    if (carouselStage) carouselStage.classList.remove('dragging');

    if (Math.abs(dragDeltaX) >= dragThreshold) {
        rotateCarousel(dragDeltaX > 0 ? -1 : 1, true);
    }

    dragDeltaX = 0;
    startAutoplay();
}

// Runtime Autoplay configuration parameters
let autoplayInterval = null;
let isAutoplayRunning = true;
const autoplaySpeed = 3500; // Time step interval matching rotations (3.5s)

function updateCarousel() {
    const currentRotation = currentIndex * -degreesPerStep;
    cylinder.style.transform = `rotateY(${currentRotation}deg)`;
        
    dots.forEach((dot, index) => {
        if (index === (currentIndex % totalCards + totalCards) % totalCards) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function jumpToCard(index) {
    const currentActiveIndex = (currentIndex % totalCards + totalCards) % totalCards;
    let difference = index - currentActiveIndex;
        
    if (difference > totalCards / 2) difference -= totalCards;
    if (difference < -totalCards / 2) difference += totalCards;
        
    currentIndex += difference;
    updateCarousel();

    // User interaction resets autoplay safety interval timer smoothly
    if (isAutoplayRunning) {
        startAutoplay();
    }
}

// ==========================================
// 2. AUTOPLAY & PLAYBACK TOGGLE ENGINE
// ==========================================
function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    isAutoplayRunning = true;
    
    autoplayInterval = setInterval(() => {
        rotateCarousel(1); 
    }, autoplaySpeed);
}

function stopAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    isAutoplayRunning = false;
}

function toggleCarouselPlayback() {
    const btn = document.getElementById('togglePlaybackBtn');
    const icon = document.getElementById('playbackIcon');
    const txt = document.getElementById('playbackText');
    
    if (isAutoplayRunning) {
        stopAutoplay();
        btn.classList.add('paused-state');
        if(icon) icon.innerText = "▶";
        if(txt) txt.innerText = "Play";
    } else {
        startAutoplay();
        btn.classList.remove('paused-state');
        if(icon) icon.innerText = "⏸";
        if(txt) txt.innerText = "Pause";
    }
}

// Fixed: Correctly updates index tracking steps and hooks into carousel transitions
function rotateCarousel(direction, fromDrag = false) {
    currentIndex += direction;
    updateCarousel();

    if (!fromDrag && isAutoplayRunning) {
        startAutoplay();
    }
}

// ==========================================
// 3. CENTRALIZED DATA LAYOUT PROFILES
// ==========================================
const interviewData = [
    {
        name: "Dhanika Perera",
        title: "Tech Innovator & Entrepreneur",
        issue: "Issue 7",
        image: "Resources/dhanika.jpg",
        isHighlighted: true,
        tags: ["Entrepreneurship", "Tech Innovation"],
        quote: "Disrupting ecosystems through digital engineering platforms.",
        company: "Bhasha"
    },{
        name: "Deepal Sooriyaarachchi",
        title: "Leading Corporate Leader",
        issue: "Issue 0",
        image: "Resources/deepal.jpg",
        isHighlighted: false,
        tags: ["Leadership", "Strategy"],
        quote: "Sustaining corporate governance in a volatile market.",
        company: "Strategic Perspectives"
    },{
        name: "Danik Perera",
        title: "Tech Innovator & Entrepreneur",
        issue: "Issue 17",
        image: "Resources/dhanika.jpg",
        isHighlighted: true,
        tags: ["Entrepreneurship", "Tech Innovation"],
        quote: "Disrupting ecosystems through digital engineering platforms.",
        company: "Bhasha"
    },{
        name: "Sushena Rananga",
        title: "Technology Leader & Innovation Specialist",
        issue: "Issue 15",
        image: "Resources/sushena.jpg",
        isHighlighted: true,
        tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
        quote: "Leading technological advancement and digital transformation initiatives across industries.",
        company: "Director/Co-founder at Creative Software"
    },{
        name: "Dhanik Perera",
        title: "Tech Innovator & Entrepreneur",
        issue: "Issue 78",
        image: "Resources/dhanika.jpg",
        isHighlighted: true,
        tags: ["Entrepreneurship", "Tech Innovation"],
        quote: "Disrupting ecosystems through digital engineering platforms.",
        company: "Bhasha"
    },{
        name: "Mr. Ksun Kalhara",
        title: "Musician",
        issue: "Issue 2",
        image: "Resources/kasun.jpg",
        isHighlighted: true,
        tags: ["Music", "Aesthetics"],
        quote: "Musician blending traditional and contemporary Sri Lankan sounds.",
        company: "Independent Artist"
    },{
        name: "Susena Ratunga",
        title: "Technology Leader & Innovation Specialist",
        issue: "Issue 15",
        image: "Resources/sushena.jpg",
        isHighlighted: true,
        tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
        quote: "Leading technological advancement and digital transformation initiatives across industries.",
        company: "Director/Co-founder at Creative Software"
    },{
        name: "Depal Soriyaarachchi",
        title: "Leading Corporate Leader",
        issue: "Issue 20",
        image: "Resources/deepal.jpg",
        isHighlighted: false,
        tags: ["Leadership", "Strategy"],
        quote: "Sustaining corporate governance in a volatile market.",
        company: "Strategic Perspectives"
    },{
        name: "S Ratunga",
        title: "Technology Leader & Innovation Specialist",
        issue: "Issue 15",
        image: "Resources/sushena.jpg",
        isHighlighted: true,
        tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
        quote: "Leading technological advancement and digital transformation initiatives across industries.",
        company: "Director/Co-founder at Creative Software"
    },{
        name: "Susena Ra",
        title: "Technology Leader & Innovation Specialist",
        issue: "Issue 15",
        image: "Resources/sushena.jpg",
        isHighlighted: true,
        tags: ["Technology Leadership", "Digital Innovation", "Industry 4.0"],
        quote: "Leading technological advancement and digital transformation initiatives across industries.",
        company: "Director/Co-founder at Creative Software"
    }
];

// 1. DYNAMICALLY CLEAN DATA (Removes duplicate entry blocks so loops match exactly)
const uniqueInterviewData = interviewData.filter((value, index, self) =>
    self.findIndex(item => item.name === value.name) === index
);

// Global tracking index for our active Spotlight leader rotation
let currentSpotlightIndex = 0;
let spotlightInterval = null;
// ==========================================
// 4. VIEW RENDER CONTROLLER
// ==========================================
// 4. VIEW RENDER CONTROLLER
// ==========================================
function renderUI() {
    const gridContainer = document.getElementById('leadersGridContainer');
    const rowContainer = document.getElementById('highlightsRowContainer');

    if (gridContainer) gridContainer.innerHTML = "";
    if (rowContainer) rowContainer.innerHTML = "";

    // BUILD VIEW 1 & 2: Static structures (Grid & Row Highlights)
    uniqueInterviewData.forEach(person => {
        if (gridContainer) {
            const gridCard = document.createElement('div');
            gridCard.className = "grid-card";
            gridCard.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="${person.image}" alt="${person.name}">
                    <span class="badge-tag">${person.issue}</span>
                </div>
                <div class="card-info">
                    <h3>${person.name}</h3>
                    <p>${person.title}</p>
                </div>
            `;
            gridContainer.appendChild(gridCard);
        }

        if (person.isHighlighted && rowContainer) {
            const rowCard = document.createElement('div');
            rowCard.className = "row-card";
            rowCard.innerHTML = `
                <img src="${person.image}" alt="${person.name}" class="row-card-img">
                <div class="row-card-content">
                    <span class="badge-tag">${person.issue}</span>
                    <h3>${person.name}</h3>
                    <span class="role-sub">${person.title}</span>
                    <p class="short-quote">"${person.quote}"</p>
                </div>
            `;
            rowContainer.appendChild(rowCard);
        }
    });

    // 1. Run the initial clean setup rendering engine pass
    updateSpotlight();
    
    // 2. Clear any active interval cycles safely
    if (spotlightInterval) clearInterval(spotlightInterval);
    
    // 3. Initiate the synchronized looping cycle clock
    startSpotlightAutoplay();
        // Start continuous scrolling for highlights row
        setupContinuousHighlights();
}

function moveHighlightCard(){
    const rowContainer = document.getElementById('highlightsRowContainer');
    if (rowContainer) {
        const cards = rowContainer.querySelectorAll('.row-card');
    cards.forEach((card, index) => {
            card.style.transform = `translateX(-${currentSpotlightIndex * 40}%)`;
            card.style.transition = 'transform 0.95s ease-in-out';
        });
    }
    
}
// Continuous scrolling implementation for highlights row
let highlightsAnimationId = null;
let highlightsPos = 0;
let highlightsSpeed = 60; // pixels per second (adjustable)

function setupContinuousHighlights() {
    const rowContainer = document.getElementById('highlightsRowContainer');
    if (!rowContainer) return;

    // Prevent double-initialization
    if (rowContainer.querySelector('.continuous-track')) return;

    // Clear any previous animation
    if (highlightsAnimationId) cancelAnimationFrame(highlightsAnimationId);

    // Create track wrapper
    const track = document.createElement('div');
    track.className = 'continuous-track';

    // Move current cards into track
    while (rowContainer.firstChild) {
        track.appendChild(rowContainer.firstChild);
    }

    // Duplicate cards multiple times for a seamless loop on ultra-wide screens
    const originalChildren = Array.from(track.children);
    // Clone 4 times to ensure enough trailing cards
    for (let i = 0; i < 4; i++) {
        originalChildren.forEach(child => {
            const clone = child.cloneNode(true);
            track.appendChild(clone);
        });
    }

    // Append track to container
    rowContainer.appendChild(track);

    // Measure original width
    const measureWidth = () => {
        const widths = originalChildren.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0);
        return widths + (parseFloat(getComputedStyle(track).gap || 0) * originalChildren.length);
    };

    let originalWidth = measureWidth();
    highlightsPos = 0;

    let lastTime = null;
    function step(time) {
        if (!lastTime) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        highlightsPos += highlightsSpeed * delta;
        if (highlightsPos >= originalWidth) {
            highlightsPos -= originalWidth;
        }

        track.style.transform = `translateX(-${highlightsPos}px)`;
        highlightsAnimationId = requestAnimationFrame(step);
    }

    // Restart animation
    highlightsAnimationId = requestAnimationFrame(step);

    // Recalculate on resize
    window.addEventListener('resize', () => {
        originalWidth = measureWidth();
    });
}
function startSpotlightAutoplay() {
    if (spotlightInterval) clearInterval(spotlightInterval);
    
    spotlightInterval = setInterval(() => {
        const track = document.querySelector('.ticker-track');
        
        // Update index and profile immediately to remove the delay
        currentSpotlightIndex = (currentSpotlightIndex + 1) % uniqueInterviewData.length;
        updateSpeakerProfileCardOnly();
        
        if (track) {
            // STEP A: Fire hardware animation properties instantly
            track.classList.add('is-shifting');
        }

        // STEP B: Complete the badge data swap after the transition frame
        setTimeout(() => {
            // STEP D: Process the badge string shifts instantly without rendering drops
            const totalItems = uniqueInterviewData.length;
            const prevIdx = (currentSpotlightIndex - 1 + totalItems) % totalItems;
            const nextIdx = (currentSpotlightIndex + 1) % totalItems;

            const pBadge = document.querySelector('.ticker-track .issue-prev');
            const cBadge = document.querySelector('.ticker-track .issue-current');
            const nBadge = document.querySelector('.ticker-track .issue-next');

            if (track && pBadge && cBadge && nBadge) {
                // Engage the transition bypass handler
                track.classList.add('no-transition');
                
                // Rewrite text strings directly onto active DOM elements
                pBadge.textContent = uniqueInterviewData[prevIdx].issue;
                cBadge.textContent = uniqueInterviewData[currentSpotlightIndex].issue;
                nBadge.textContent = uniqueInterviewData[nextIdx].issue;
                
                // Clear the active motion vector flags
                track.classList.remove('is-shifting');
                
                // Force layout reflow execution block window recalculation
                void track.offsetWidth; 
                
                // Disengage transition bypass
                track.classList.remove('no-transition');
            }
        }, 600); // 600ms match threshold
    }, 3500);
}

function rotateSpotlight(direction) {
    const totalItems = uniqueInterviewData.length;
    currentSpotlightIndex = (currentSpotlightIndex + direction + totalItems) % totalItems;
    updateSpotlight(); // immediately updates card and badges without animation
    startSpotlightAutoplay(); // Reset timer so it doesn't instantly jump again
}

// Function 1: Only renders the speaker structural profile fields
function updateSpeakerProfileCardOnly() {
    const spotlightContainer = document.getElementById('spotlightContainer');
    if (!spotlightContainer || uniqueInterviewData.length === 0) return;

    const spotlightLeader = uniqueInterviewData[currentSpotlightIndex];
    spotlightContainer.innerHTML = `
        <div class="spotlight-left">
            <img src="${spotlightLeader.image}" alt="${spotlightLeader.name}">
        </div>
        <div class="spotlight-right">
            <h1 class="spotlight-name">${spotlightLeader.name}</h1>
            <h2 class="spotlight-title">${spotlightLeader.title}</h2>
            <h3 class="spotlight-company">${spotlightLeader.company}</h3>
            <div class="quote-box">
                <p>${spotlightLeader.quote}</p>
            </div>
            <div class="tag-row">
                ${spotlightLeader.tags.map(tag => `<span class="pill-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
}

// Function 2: Sets up the initial structure on your first page load
function updateSpotlight() {
    const issueBadgeContainer = document.getElementById('keyContent');
    
    // First, draw the main layout card contents profile values
    updateSpeakerProfileCardOnly();

    if (uniqueInterviewData.length === 0) return;
    const spotlightLeader = uniqueInterviewData[currentSpotlightIndex];

    // Build the mathematical sequence bounds for the issue structures
    const totalItems = uniqueInterviewData.length;
    const prevIdx = (currentSpotlightIndex - 1 + totalItems) % totalItems;
    const nextIdx = (currentSpotlightIndex + 1) % totalItems;

    // Render the initial layout base wrapper skeleton once
    if (issueBadgeContainer) {
        issueBadgeContainer.innerHTML = `
            <div class="ticker-wrapper stacked-list-layout">
                <div class="ticker-track">
                    <span class="badge-tag issue-prev">${uniqueInterviewData[prevIdx].issue}</span>
                    <span class="badge-tag issue-current">${spotlightLeader.issue}</span>
                    <span class="badge-tag issue-next">${uniqueInterviewData[nextIdx].issue}</span>
                </div>
            </div>
        `;
    }
}
// Separate function dedicated exclusively to rendering the shifting spotlight
function updateSpotlight() {
    const spotlightContainer = document.getElementById('spotlightContainer');
    const issueBadgeContainer = document.getElementById('keyContent');

    if (!spotlightContainer || uniqueInterviewData.length === 0) return;

    const spotlightLeader = uniqueInterviewData[currentSpotlightIndex];

    // BUILD VIEW 3: Main Profile View
    spotlightContainer.innerHTML = `
        <div class="spotlight-left">
            <img src="${spotlightLeader.image}" alt="${spotlightLeader.name}">
        </div>
        <div class="spotlight-right">
            <h1 class="spotlight-name">${spotlightLeader.name}</h1>
            <h2 class="spotlight-title">${spotlightLeader.title}</h2>
            <h3 class="spotlight-company">${spotlightLeader.company}</h3>
            
            <div class="quote-box">
                <p>${spotlightLeader.quote}</p>
            </div>
            
            <div class="tag-row">
                ${spotlightLeader.tags.map(tag => `<span class="pill-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;

    // Calculate circular array loops for the issue tracks (Previous, Current, Next)
    const totalItems = uniqueInterviewData.length;
    const prevIdx = (currentSpotlightIndex - 1 + totalItems) % totalItems;
    const nextIdx = (currentSpotlightIndex + 1) % totalItems;

    const prevIssue = uniqueInterviewData[prevIdx].issue;
    const currentIssue = spotlightLeader.issue;
    const nextIssue = uniqueInterviewData[nextIdx].issue;

    if (issueBadgeContainer) {
        issueBadgeContainer.innerHTML = `
            <div class="ticker-wrapper stacked-list-layout">
                <div class="ticker-track">
                    <span class="badge-tag issue-prev">${prevIssue}</span>
                    <span class="badge-tag issue-current">${currentIssue}</span>
                    <span class="badge-tag issue-next">${nextIssue}</span>
                </div>
            </div>
        `;
    }
}
// Initialize setup processes uniformly
document.addEventListener("DOMContentLoaded", () => {
    updateCarousel();
    startAutoplay();
    renderUI();

    if (carouselStage) {
        carouselStage.addEventListener('mousedown', handleCarouselDragStart);
        carouselStage.addEventListener('touchstart', handleCarouselDragStart, { passive: true });
        carouselStage.addEventListener('mousemove', handleCarouselDragMove);
        carouselStage.addEventListener('touchmove', handleCarouselDragMove, { passive: true });
        carouselStage.addEventListener('mouseup', handleCarouselDragEnd);
        carouselStage.addEventListener('mouseleave', handleCarouselDragEnd);
        carouselStage.addEventListener('touchend', handleCarouselDragEnd);
        carouselStage.addEventListener('touchcancel', handleCarouselDragEnd);
    }
});

// Function to toggle View All Speakers grid expansion
function viewAllSpeakers() {
    const gridContainer = document.getElementById('leadersGridContainer');
    const btn = document.querySelector('.view-all-btn');
    
    if (gridContainer && btn) {
        gridContainer.classList.toggle('expanded');
        
        if (gridContainer.classList.contains('expanded')) {
            btn.textContent = 'Show Less';
        } else {
            btn.textContent = 'View All Speakers';
            // Optional: scroll back to the section so user doesn't lose context
            const section = gridContainer.closest('.section-allKeynoteSpeaker');
            if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Comprehensive Dataset populated directly from your layout sources
    const voicesData = [
        {
            name: "Mr. Asela Waidyalankara",
            tagline: "Cyber Security & AI Policy Leader",
            subtext: "Educator & Global Speaker",
            quote: "Had an amazing time at the event organized by University of Kelaniya Management and Information Technology Students. As a panelist discussing 'Data Democracy: Empowering Individuals in the Digital Age,' our discussion highlighted crucial topics around data democratization and universal access. It was an important forum that effectively addressed the challenges and opportunities we face in navigating the digital age, demonstrating how empowering individuals with data can help organizations gain competitive advantage.",
            image: "images/asela.jpg"
        },
        {
            name: "Mr. Deepal Sooriyarachchi",
            tagline: "Former Managing Director of AVIVA N...",
            subtext: "Management Consultant & Author",
            quote: "For me being part of Exposition 20 was truly a privilege. The meticulous planning and flawless execution by the University of Kelaniya undergraduates of the exposition layout process left a professional impression on all attendees involved.",
            image: "images/deepal.jpg"
        },
        {
            name: "Prof. Roshan G. Ragel",
            tagline: "Senior Lecturer , University of Perade...",
            subtext: "CEO, LEARN",
            quote: "It was a pleasure to be part of the Exposition Issue 20 Industrial Forum. The session was well-curated, with an engaging moderator and insightful panel discussions tackling industrial milestones realistically.",
            image: "images/roshan.jpg"
        },
        {
            name: "Mr. Thusara Rathnaweera",
            tagline: "Deputy General Manager",
            subtext: "Head of MX Biz @ Samsumg Sri Lanka",
            quote: "The event was organized with professional standards, showcasing the exceptional commitment of University of Kelaniya students. As a guest speaker, I witnessed profound technical acumen and operational coordination.",
            image: "images/thusara.jpg"
        },
        {
            name: "Mr. Kosala Weerasena",
            tagline: "Former Deputy General Manager @ S...",
            subtext: "Charted Telecom Engineer",
            quote: "Impressed with the talents of undergraduates (belonging to Department of Industrial Management, Faculty of Science, University of Kelaniya) exhibited during the event execution pipelines and corporate technical tracks.",
            image: "images/kosala.jpg"
        },
        {
            name: "Mrs. Kanchana Priyakantha",
            tagline: "Co-Founder & CEO of KReader",
            subtext: "Director / Co-Founder of KBooks",
            quote: "The meticulous planning, festive atmosphere, and adept use of technology were truly commendable. From leadership to presentations, the organizing team managed delivery standards beautifully.",
            image: "images/kanchana.jpg"
        }
    ];

    let currentIndex = 0;
    let sliderInterval = null;
    const ROTATION_SPEED = 3500; // 3.5 seconds

    const featuredWrapper = document.getElementById("featuredVoiceWrapper");
    const dotsWrapper = document.getElementById("sliderDotsWrapper");
    const prevBtn = document.getElementById("prevSlideBtn");
    const nextBtn = document.getElementById("nextSlideBtn");
    const voicesGrid = document.getElementById("voicesGrid");

    // Fallback handler helper for broken paths
    const handleFallbackAvatar = (imgEl, name) => {
        const initials = name ? name.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('').substring(0, 2) : "UX";
        imgEl.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=192230&color=eaa11b&bold=true`;
    };

    // --- CAROUSEL DISPLAY RENDER ENGINE ---
    function updateFeaturedSlide(index) {
        if (!featuredWrapper) return;
        
        const activeSpeaker = voicesData[index];
        
        // Inject slide contents smoothly
        featuredWrapper.innerHTML = `
            <div class="quote-icon-container">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
            </div>
            <p class="testimonial-statement">"${activeSpeaker.quote}"</p>
            <div class="testimonial-author-profile">
                <div class="author-avatar-frame">
                    <img id="activeSlideImg" src="${activeSpeaker.image}" alt="">
                </div>
                <div class="author-details-meta">
                    <h3 class="author-name">${activeSpeaker.name}</h3>
                    <span class="author-role-primary">${activeSpeaker.tagline}</span>
                    <span class="author-role-secondary">${activeSpeaker.subtext}</span>
                </div>
            </div>
        `;

        // Instantly activate safe error handling fallback rules
        const activeImg = document.getElementById("activeSlideImg");
        activeImg.addEventListener("error", () => handleFallbackAvatar(activeImg, activeSpeaker.name));

        // Manage dot classes to keep active indicators synchronized
        const dots = dotsWrapper.querySelectorAll(".navigation-dot");
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add("active-pill");
            } else {
                dot.classList.remove("active-pill");
            }
        });
    }

    // --- TRACK INITIALIZATION ENGINE ---
    function initializeSliderControls() {
        if (!dotsWrapper) return;
        dotsWrapper.innerHTML = "";

        // Build UI indicators
        voicesData.forEach((_, idx) => {
            const dot = document.createElement("span");
            dot.classList.add("navigation-dot");
            if (idx === 0) dot.classList.add("active-pill");
            
            dot.addEventListener("click", () => {
                currentIndex = idx;
                updateFeaturedSlide(currentIndex);
                resetSliderTimer();
            });
            dotsWrapper.appendChild(dot);
        });

        // Next slide action trigger
        function loadNextSlide() {
            currentIndex = (currentIndex + 1) % voicesData.length;
            updateFeaturedSlide(currentIndex);
        }

        // Previous slide action trigger
        function loadPrevSlide() {
            currentIndex = (currentIndex - 1 + voicesData.length) % voicesData.length;
            updateFeaturedSlide(currentIndex);
        }

        // Hook up manual mouse/touch events
        if (nextBtn) nextBtn.addEventListener("click", () => { loadNextSlide(); resetSliderTimer(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { loadPrevSlide(); resetSliderTimer(); });

        // Start background automation ticking thread
        startSliderTimer(loadNextSlide);
    }

    function startSliderTimer(callbackAction) {
        sliderInterval = setInterval(callbackAction, ROTATION_SPEED);
    }

    function resetSliderTimer() {
        clearInterval(sliderInterval);
        // Restart ticking thread cleanly
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % voicesData.length;
            updateFeaturedSlide(currentIndex);
        }, ROTATION_SPEED);
    }

    // --- STATIC 6-CARD LOWER GRID INJECTION ---
    function renderStaticGrid() {
        if (!voicesGrid) return;
        voicesGrid.innerHTML = "";

        voicesData.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("voice-card");
            card.innerHTML = `
                <div class="card-profile-header">
                    <div class="profile-avatar">
                        <img id="gridImg-${index}" src="${item.image}" alt="">
                    </div>
                    <div class="profile-meta">
                        <h4 class="profile-name">${item.name}</h4>
                        <span class="profile-tagline-gold" title="${item.tagline}">${item.tagline}</span>
                        <span class="profile-subtext" title="${item.subtext}">${item.subtext}</span>
                    </div>
                </div>
                <p class="card-quote-text">${item.quote.substring(0, 140)}...</p>
            `;
            voicesGrid.appendChild(card);

            const gridImg = document.getElementById(`gridImg-${index}`);
            gridImg.addEventListener("error", () => handleFallbackAvatar(gridImg, item.name));
        });
    }

    // Execute engine pipelines sequentially
    renderStaticGrid();
    initializeSliderControls();
    updateFeaturedSlide(0);
});

document.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing infinite partners engine...");

    // Partner dataset containing branding criteria matching image files
    const partnersData = [
        {
            name: "Rexona",
            tier: "platinum", // Handles conditional logic mapping custom colors
            logo: "images/partners/rexona.png"
        },
        {
            name: "CIMA Sri Lanka",
            tier: "platinum",
            logo: "images/partners/cima.png"
        },
        {
            name: "EFL 3PL",
            tier: "gold",
            logo: "images/partners/efl.png"
        },
        {
            name: "GTN",
            tier: "gold",
            logo: "images/partners/gtn.png"
        },
        {
            name: "Celsius IT",
            tier: "silver",
            logo: "images/partners/celsius.png"
        }
    ];

    const marqueeTrack = document.getElementById("partnerMarqueeTrack");

    // Helper map to assign decorative unicode outline icons based on tiers
    const getTierIcon = (tier) => {
        switch(tier) {
            case 'platinum': return '💎';
            case 'gold': return '⭐';
            case 'silver': return '🛡️';
            default: return '🥉';
        }
    };

    // Helper builder mapping fields to standard DOM templates
    function createPartnerCardElement(partnerData) {
        const card = document.createElement("div");
        card.classList.add("partner-card");
        card.setAttribute("data-tier", partnerData.tier);

        card.innerHTML = `
            <div class="partner-card-header">
                <span class="partner-tier-badge">${partnerData.tier} Partner</span>
                <span class="partner-tier-icon">${getTierIcon(partnerData.tier)}</span>
            </div>
            <div class="partner-logo-frame">
                <img class="partner-logo-img" src="${partnerData.logo}" alt="${partnerData.name} Corporate Logo">
            </div>
            <h5 class="partner-brand-name">${partnerData.name}</h5>
        `;

        // Safety fallback just in case some partner logo file routes break early
        const logoImg = card.querySelector(".partner-logo-img");
        logoImg.addEventListener("error", () => {
            // Replaces image container safely with clean stylized typographic branding text instead of an ugly missing icon block
            logoImg.style.display = "none";
            const textFallback = document.createElement("span");
            textFallback.style.fontSize = "1.5rem";
            textFallback.style.fontWeight = "800";
            textFallback.style.color = "rgba(255,255,255,0.15)";
            textFallback.innerText = partnerData.name.substring(0, 3).toUpperCase();
            logoImg.parentNode.appendChild(textFallback);
        });

        return card;
    }

    // Render loop engine execution handling track populations
    if (marqueeTrack) {
        marqueeTrack.innerHTML = ""; // Clear template nodes

        // Step 1: Render the original list of partner blocks
        partnersData.forEach(partner => {
            const partnerCard = createPartnerCardElement(partner);
            marqueeTrack.appendChild(partnerCard);
        });

        // Step 2: DUPLICATE THE ENTIRE TRACK ARRAY
        // This is the mathematical secret that ensures seamless, non-breaking 360 loops
        partnersData.forEach(partner => {
            const duplicatedCloneCard = createPartnerCardElement(partner);
            // Adds clone copies directly behind the original rows safely
            marqueeTrack.appendChild(duplicatedCloneCard);
        });

        console.log("Seamless infinite marquee successfully initialized.");
    }
});