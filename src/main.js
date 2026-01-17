document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Essential Element Getters ---
    const mobileMenuButton = document.getElementById('mobile-menu-btn'); // Fixed ID
    const mobileMenu = document.getElementById('mobile-menu');
    const translateButton = document.getElementById('mobile-translate-button');
    const translateMenu = document.getElementById('translate-menu');
    const mobileDropdownButtons = document.querySelectorAll('.mobile-dropdown-toggle'); // Fixed Class

    // Top Bar Translate Elements
    const topbarTranslateIcon = document.getElementById('topbar-translate-icon');
    const topbarTranslateMenu = document.getElementById('topbar-translate-menu');
    const yearSpan = document.getElementById('yearSpan'); // Added declaration



    // Function to close all Click-based menus (mobile menus and translate menus)
    function closeAllClickMenus() {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            // Reset Hamburger Icon when closing mobile menu
            if (mobileMenuButton) {
                const [hamburgerIcon, closeIcon] = mobileMenuButton.querySelectorAll('svg');
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.remove('hidden');
                    closeIcon.classList.add('hidden');
                }
            }
        }
        if (translateMenu) { translateMenu.classList.add('hidden'); }
        if (topbarTranslateMenu) { topbarTranslateMenu.classList.add('hidden'); }
    }

    // --- 2. Mobile Menu Logic ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            // Toggle icons if they exist in the button
            const icons = mobileMenuButton.querySelectorAll('svg');
            if (icons.length >= 2) {
                icons[0].classList.toggle('hidden');
                icons[1].classList.toggle('hidden');
            }

            // Close other click-based menus
            if (translateMenu) { translateMenu.classList.add('hidden'); }
            if (topbarTranslateMenu) { topbarTranslateMenu.classList.add('hidden'); }
        });
    }

    // --- 3. Mobile Sub-Dropdown Toggle Logic ---
    mobileDropdownButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            const dropdownIcon = button.querySelector('span'); // The + icon
            if (dropdownContent) {
                dropdownContent.classList.toggle('hidden');
                if (dropdownIcon) {
                    dropdownIcon.textContent = dropdownContent.classList.contains('hidden') ? '+' : '-';
                }
            }
        });
    });

    // --- 4. Main Nav Mobile Translate Dropdown Logic (🌐) ---
    if (translateButton && translateMenu) {
        translateButton.addEventListener('click', () => {
            closeAllClickMenus(); // Close all other menus first
            translateMenu.classList.toggle('hidden'); // Then toggle the current one
        });
    }

    // --- 5. Top Bar Translate Dropdown Logic ---
    if (topbarTranslateIcon && topbarTranslateMenu) {
        topbarTranslateIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeAllClickMenus(); // Close all other menus first
            topbarTranslateMenu.classList.toggle('hidden'); // Then toggle the current one
        });
    }

    // --- 6. Close Click-based Menus Automatically After Clicking a Link ---
    const allMenuLinks = document.querySelectorAll(
        '#mobile-menu a, .group a, #translate-menu a, #topbar-translate-menu a'
    );

    allMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeAllClickMenus();
        });
    });

    // --- 7. Close Click-based Menus when clicking outside ---
    document.addEventListener('click', (e) => {
        if (topbarTranslateMenu && !topbarTranslateMenu.contains(e.target) && e.target !== topbarTranslateIcon) {
            topbarTranslateMenu.classList.add('hidden');
        }

        if (translateMenu && !translateMenu.contains(e.target) && e.target !== translateButton) {
            translateMenu.classList.add('hidden');
        }
    });

    // --- 8. Footer Copyright Year Update Logic ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});










document.addEventListener('DOMContentLoaded', () => {
    // Other JS code (like navbar toggle) goes here

    // --- Carousel Logic Start ---

    // Carousel variables
    const carousel = document.getElementById('image-carousel');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const dotIndicators = document.getElementById('dot-indicators');
    const slides = document.querySelectorAll('.carousel-slide');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideDuration = 5000; // Time in ms before auto-slide

    // Function to change the slide
    function goToSlide(index) {
        if (index < 0) {
            currentIndex = totalSlides - 1; // Loop back to the last slide
        } else if (index >= totalSlides) {
            currentIndex = 0; // Loop back to the first slide
        } else {
            currentIndex = index;
        }

        // Use CSS transform to move the slides
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateIndicators();
    }

    // Function to create dot indicators and highlight the current slide
    function updateIndicators() {
        dotIndicators.innerHTML = ''; // Clear existing dots
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('h-3', 'w-3', 'rounded-full', 'transition-colors', 'duration-300');

            if (index === currentIndex) {
                dot.classList.add('bg-white'); // Current slide dot color
            } else {
                dot.classList.add('bg-gray-400', 'hover:bg-gray-200'); // Other dot color
            }

            // Add click event to change slide when a dot is clicked
            dot.addEventListener('click', () => goToSlide(index));
            dotIndicators.appendChild(dot);
        });
    }

    // Function to start the automatic slide change
    function startAutoSlide() {
        return setInterval(() => {
            goToSlide(currentIndex + 1);
        }, slideDuration);
    }

    // Event listener for the Previous button
    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Stop auto-slide on manual change
        goToSlide(currentIndex - 1);
        autoSlideInterval = startAutoSlide(); // Restart auto-slide
    });

    // Event listener for the Next button
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval); // Stop auto-slide on manual change
        goToSlide(currentIndex + 1);
        autoSlideInterval = startAutoSlide(); // Restart auto-slide
    });

    // Initialization: Show the first slide and start auto-slide
    updateIndicators();
    let autoSlideInterval = startAutoSlide();

    // --- Carousel Logic End ---
});