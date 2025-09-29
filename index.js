// Carrusel manual para trabajos
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const images = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function getImagesPerView() {
        if (window.innerWidth < 700) return 1;
        if (window.innerWidth < 1000) return 2;
        return 3;
    }

    function updateCarousel() {
        const imagesPerView = getImagesPerView();
        // Limitar el índice para que nunca se corte la última imagen
        if (currentIndex > images.length - imagesPerView) {
            currentIndex = images.length - imagesPerView;
        }
        if (currentIndex < 0) currentIndex = 0;
        // Si solo hay una imagen por vista, centrar la última imagen
        const imgWidth = images[0].getBoundingClientRect().width + 20; // 20px gap
        let offset = currentIndex * imgWidth;
        if (imagesPerView === 1 && currentIndex === images.length - 1) {
            // Centrar la última imagen
            const containerWidth = track.parentElement.offsetWidth;
            const lastImgWidth = images[images.length - 1].getBoundingClientRect().width;
            offset = (imgWidth * (images.length - 1)) - ((containerWidth - lastImgWidth) / 2);
        }
        track.style.transform = `translateX(-${offset}px)`;
    }

    function showPrev() {
        currentIndex--;
        updateCarousel();
    }
    function showNext() {
        currentIndex++;
        updateCarousel();
    }
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);

    window.addEventListener('resize', () => {
        updateCarousel();
    });
    updateCarousel();
});


// Modal para imágenes del carrusel
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-img');
    const modalImg = document.getElementById('img-modal-content');
    const closeBtn = document.querySelector('.modal-close');
    document.querySelectorAll('.carousel-track img').forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            modal.style.display = 'flex';
            modalImg.src = this.src;
            modalImg.alt = this.alt;
        });
    });
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        modalImg.src = '';
    };
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            modalImg.src = '';
        }
    };
});