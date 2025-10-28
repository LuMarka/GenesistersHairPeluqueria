document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. HERO CAROUSEL ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentSlide = 0;
        
        function showNextSlide() {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
        
        setInterval(showNextSlide, 4000);
    }

    // --- 2. TRABAJOS CAROUSEL (MANUAL + AUTOPLAY) ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const images = Array.from(track.children);
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        const carouselContainer = document.querySelector('.carousel-container');
        let currentIndex = 0;
        let autoScrollInterval;

        function getImagesPerView() {
            if (window.innerWidth < 700) return 1;
            if (window.innerWidth < 1000) return 2;
            return 3;
        }

        function updateCarousel() {
            const imagesPerView = getImagesPerView();
            if (currentIndex > images.length - imagesPerView) {
                currentIndex = images.length - imagesPerView;
            }
            if (currentIndex < 0) currentIndex = 0;
            
            const imgWidth = images[0].getBoundingClientRect().width + 20;
            let offset = currentIndex * imgWidth;
            
            if (imagesPerView === 1 && currentIndex === images.length - 1) {
                const containerWidth = track.parentElement.offsetWidth;
                const lastImgWidth = images[images.length - 1].getBoundingClientRect().width;
                offset = (imgWidth * (images.length - 1)) - ((containerWidth - lastImgWidth) / 2);
            }
            track.style.transform = `translateX(-${offset}px)`;
        }

        function showNext() {
            currentIndex++;
            if (currentIndex >= images.length - getImagesPerView()) {
                currentIndex = 0; // Volver al inicio
            }
            updateCarousel();
        }

        function showPrev() {
            currentIndex--;
            updateCarousel();
        }

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollInterval = setInterval(showNext, 3000);
        }

        function stopAutoScroll() {
            clearInterval(autoScrollInterval);
        }

        // Event listeners
        nextBtn.addEventListener('click', () => {
            showNext();
            startAutoScroll(); // Reinicia el timer
        });

        prevBtn.addEventListener('click', () => {
            showPrev();
            startAutoScroll(); // Reinicia el timer
        });

        carouselContainer.addEventListener('mouseenter', stopAutoScroll);
        carouselContainer.addEventListener('mouseleave', startAutoScroll);

        window.addEventListener('resize', updateCarousel);
        
        // Iniciar
        updateCarousel();
        startAutoScroll();
    }

    // --- 3. MODAL DE IMAGEN ---
    setTimeout(() => {
        const modal = document.getElementById('modal-img');
        const modalImg = document.getElementById('img-modal-content');
        const closeBtn = document.querySelector('.modal-close');

        if (modal && modalImg) {
            const allImages = document.querySelectorAll('.carousel-track img, .inline-img, .side-img');
            
            allImages.forEach((img, index) => {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function(e) {
                    e.preventDefault();
                    modal.style.display = 'flex';
                    modalImg.src = this.src;
                    modalImg.alt = this.alt || 'Imagen ampliada';
                });
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    modal.style.display = 'none';
                    modalImg.src = '';
                });
            }

            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    modalImg.src = '';
                }
            });

            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    modalImg.src = '';
                }
            });
        }
    }, 500);

    // --- 4. ANIMACIONES AL HACER SCROLL ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
});