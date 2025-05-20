// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelectorAll('nav ul li a');
    const backToTopBtn = document.getElementById('backToTop');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.querySelector('ul').classList.toggle('active');
    });
    
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navbar.querySelector('ul').classList.remove('active');
        });
    });
    
    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
        
        // Back to top button visibility
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
        
        // Active menu based on scroll position
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Back to top button functionality
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Lightbox functionality
    function openLightbox(imgSrc) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Make these functions globally accessible
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;
    
    // Close lightbox when clicking outside the image
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Testimonial slider functionality
    const testimonialTrack = document.getElementById('testimonialTrack');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Next button click
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        updateSlider();
    });
    
    // Previous button click
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        updateSlider();
    });
    
    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Auto slide every 5 seconds
    setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        updateSlider();
    }, 5000);
    
    // Promo modal functionality
    function showPromo() {
        const promoModal = document.getElementById('promoModal');
        promoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closePromo() {
        const promoModal = document.getElementById('promoModal');
        promoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Make these functions globally accessible
    window.showPromo = showPromo;
    window.closePromo = closePromo;
    
    // Close modal when clicking outside the content
    document.getElementById('promoModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePromo();
        }
    });
    
    // Form validation
    const reservationForm = document.getElementById('reservationForm');
    
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        
        let isValid = true;
        
        // Validate name
        const name = document.getElementById('name');
        if (name.value.trim() === '') {
            document.getElementById('nameError').textContent = 'Nama tidak boleh kosong';
            isValid = false;
        }
        
        // Validate email
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailError').textContent = 'Email tidak valid';
            isValid = false;
        }
        
        // Validate phone
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9]{10,13}$/;
        if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
            document.getElementById('phoneError').textContent = 'Nomor telepon tidak valid';
            isValid = false;
        }
        
        // Validate location
        const location = document.getElementById('location');
        if (location.value === '') {
            document.getElementById('locationError').textContent = 'Silakan pilih lokasi';
            isValid = false;
        }
        
        // Validate date
        const date = document.getElementById('date');
        const today = new Date();
        const selectedDate = new Date(date.value);
        
        if (!date.value) {
            document.getElementById('dateError').textContent = 'Silakan pilih tanggal';
            isValid = false;
        } else if (selectedDate <= today) {
            document.getElementById('dateError').textContent = 'Tanggal harus minimal H+1';
            isValid = false;
        }
        
        // Validate adults
        const adults = document.getElementById('adults');
        if (adults.value < 1) {
            document.getElementById('adultsError').textContent = 'Minimal 1 orang dewasa';
            isValid = false;
        }
        
        // Validate terms
        const terms = document.getElementById('terms');
        if (!terms.checked) {
            document.getElementById('termsError').textContent = 'Anda harus menyetujui syarat dan ketentuan';
            isValid = false;
        }
        
        // If form is valid, show success modal
        if (isValid) {
            showSuccessModal();
            reservationForm.reset();
        }
    });
    
    // Success modal functionality
    function showSuccessModal() {
        const successModal = document.getElementById('successModal');
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSuccessModal() {
        const successModal = document.getElementById('successModal');
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Make these functions globally accessible
    window.showSuccessModal = showSuccessModal;
    window.closeSuccessModal = closeSuccessModal;
    
    // Close modal when clicking outside the content
    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });
});