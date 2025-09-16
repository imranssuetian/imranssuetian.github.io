// Reusable Image Lightbox functionality for all app detail pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if lightbox elements exist on the page
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        // Create lightbox HTML if it doesn't exist
        const lightboxHTML = `
            <div class="lightbox" id="lightbox">
                <div class="lightbox-content">
                    <button class="lightbox-close" id="lightbox-close">&times;</button>
                    <button class="lightbox-nav lightbox-prev" id="lightbox-prev">&#8249;</button>
                    <img class="lightbox-image" id="lightbox-image" src="" alt="">
                    <button class="lightbox-nav lightbox-next" id="lightbox-next">&#8250;</button>
                    <div class="lightbox-caption" id="lightbox-caption"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    // Initialize lightbox functionality
    const screenshots = document.querySelectorAll('.screenshot-item img');
    const lightboxEl = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    
    let currentImageIndex = 0;
    let imageData = [];

    // Collect all screenshot data
    screenshots.forEach((img, index) => {
        const caption = img.closest('.screenshot-item').querySelector('.screenshot-caption').textContent;
        imageData.push({
            src: img.src,
            alt: img.alt,
            caption: caption
        });
        
        // Add click event to open lightbox (on both img and phone mockup container)
        const phoneContainer = img.parentElement;
        phoneContainer.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    function openLightbox(index) {
        currentImageIndex = index;
        const data = imageData[currentImageIndex];
        
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxCaption.textContent = data.caption;
        
        lightboxEl.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightboxEl.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : imageData.length - 1;
        const data = imageData[currentImageIndex];
        
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxCaption.textContent = data.caption;
    }

    function showNextImage() {
        currentImageIndex = currentImageIndex < imageData.length - 1 ? currentImageIndex + 1 : 0;
        const data = imageData[currentImageIndex];
        
        lightboxImage.src = data.src;
        lightboxImage.alt = data.alt;
        lightboxCaption.textContent = data.caption;
    }

    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);

    // Close on background click
    if (lightboxEl) {
        lightboxEl.addEventListener('click', (e) => {
            if (e.target === lightboxEl) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxEl && lightboxEl.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
});