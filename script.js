document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Gestion du Menu Hamburger ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Basculer l'affichage du menu
    mobileMenuBtn.addEventListener('click', () => {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // --- 2. Animations au Défilement (Intersection Observer) ---
    const observerOptions = {
        root: null, // viewport
        threshold: 0.15, // déclenche quand 15% de l'élément est visible
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optionnel : arrêter d'observer une fois affiché
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Sélectionner tous les éléments cachés
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- 3. Effet Header Sticky ---
    // Change l'opacité du header au scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(18, 18, 18, 1)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(18, 18, 18, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

});