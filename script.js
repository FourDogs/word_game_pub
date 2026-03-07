document.addEventListener('DOMContentLoaded', () => {
    // Current year in footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Setup navbar styling on scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Carousel Logic
    const track = document.getElementById('track');
    if (track) {
        const slides = Array.from(track.children);
        const nextButton = document.getElementById('nextBtn');
        const prevButton = document.getElementById('prevBtn');
        const dotsNav = document.getElementById('carouselNav');
        const dots = Array.from(dotsNav.children);
        
        const moveToSlide = (currentSlide, targetSlide, targetIndex) => {
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            
            // Update dots
            const currentDot = dotsNav.querySelector('.current-indicator');
            const targetDot = dots[targetIndex];
            
            currentDot.classList.remove('current-indicator');
            targetDot.classList.add('current-indicator');
        };

        const getCurrentSlideIndex = () => {
            const currentSlide = track.querySelector('.current-slide');
            return slides.findIndex(slide => slide === currentSlide);
        };

        // When I click left, move slides
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const currentIndex = getCurrentSlideIndex();
            
            let prevIndex = currentIndex - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1; 
            
            const prevSlide = slides[prevIndex];
            moveToSlide(currentSlide, prevSlide, prevIndex);
        });

        // When I click right, move slides
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const currentIndex = getCurrentSlideIndex();
            
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0; 
            
            const nextSlide = slides[nextIndex];
            moveToSlide(currentSlide, nextSlide, nextIndex);
        });

        // When I click the nav indicators, move to that slide
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(currentSlide, targetSlide, targetIndex);
        });
        
        // Auto advance carousel every 4 seconds
        let carouselInterval = setInterval(() => {
            nextButton.click();
        }, 4000);
        
        // Pause on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(() => {
                nextButton.click();
            }, 4000);
        });
    }
});
