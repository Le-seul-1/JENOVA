/* ================================================================
   SCRIPT MOBILE FIRST - OPTIMISÉ
   Fonctionnalités essentielles pour mobile et amélioration progressive
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ============================================================
    // 1. GESTION DU MENU HAMBURGER (Mobile First)
    // ============================================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navList) {
        // Ouvrir/Fermer le menu
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navList.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Prévenir le scroll quand le menu est ouvert (Mobile)
            if (navList.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Fermer le menu quand on clique sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Fermer le menu si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ============================================================
    // 2. ANIMATIONS AU DÉFILEMENT (Intersection Observer)
    // Mobile-first: optimisé pour performances
    // ============================================================
    const observerOptions = {
        root: null,
        threshold: 0.1, /* Déclenche à 10% de visibilité (plus efficace mobile) */
        rootMargin: "0px 0px -50px 0px" /* Déclenche un peu avant que l'élément entre */
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ajouter un délai pour un effet progressif
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, 100);
                
                // Arrêter d'observer après affichage (économise ressources)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer tous les éléments avec la classe 'hidden'
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => {
        observer.observe(el);
    });

    // ============================================================
    // 3. EFFET HEADER STICKY (Optimisé pour mobile)
    // ============================================================
    const header = document.querySelector('.header');
    let lastScrollY = 0;
    let scrollTimeout;

    if (header) {
        window.addEventListener('scroll', () => {
            lastScrollY = window.scrollY;

            // Throttle: limiter la fréquence des appels (performances mobile)
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (lastScrollY > 50) {
                    header.style.background = 'rgba(18, 18, 18, 1)';
                    header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
                } else {
                    header.style.background = 'rgba(18, 18, 18, 0.95)';
                    header.style.boxShadow = 'none';
                }
            }, 10);
        }, { passive: true }); // passive: true pour meilleure performance mobile
    }

    // ============================================================
    // 4. GESTION DES TOUCHES (Mobile-specific)
    // ============================================================
    // Feedback tactile pour les boutons et liens
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    
    interactiveElements.forEach(element => {
        // Ajouter du feedback au toucher
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        }, { passive: true });

        element.addEventListener('touchend', function() {
            this.style.opacity = '1';
        }, { passive: true });
    });

    // ============================================================
    // 5. DÉTECTION DE L'ORIENTATION (Mobile)
    // ============================================================
    function handleOrientationChange() {
        // Fermer le menu si l'orientation change
        if (navList && navList.classList.contains('active')) {
            navList.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    window.addEventListener('orientationchange', handleOrientationChange, false);

    // ============================================================
    // 6. SMOOTH SCROLL POUR LES ANCRES (Progressive Enhancement)
    // ============================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '#contact') {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    
                    // Calculer le décalage (height du header)
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    // Scroll progressif
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ============================================================
    // 7. OPTIMISATION POUR VIEWPORT (Responsive)
    // ============================================================
    function updateViewportOptimizations() {
        const width = window.innerWidth;
        
        // Ajustements pour très petits écrans
        if (width < 360) {
            document.documentElement.style.fontSize = '14px';
        } else if (width < 480) {
            document.documentElement.style.fontSize = '15px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
    }

    // Appeler au chargement et au redimensionnement
    updateViewportOptimizations();
    window.addEventListener('resize', updateViewportOptimizations);

    // ============================================================
    // 8. GESTION DE LA VISIBILITÉ DE PAGE (Performance)
    // ============================================================
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Pauser les animations si la page n'est pas visible
            document.body.style.animationPlayState = 'paused';
        } else {
            // Reprendre les animations
            document.body.style.animationPlayState = 'running';
        }
    });

    // ============================================================
    // 9. FIX POUR SAFE AREA (Notches sur téléphones)
    // ============================================================
    if (navigator.userAgent.match(/iphone|ipod|ipad/i)) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        window.addEventListener('resize', () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        });
    }

    // ============================================================
    // 10. LAZY LOADING POUR IMAGES (Future-proof)
    // ============================================================
    if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        // Les images avec data-src seront lazy-loadées
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================================
    // 11. GESTION DES CLICS DOUBLES (Mobile)
    // ============================================================
    let lastTap = 0;
    document.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;

        if (tapLength < 300 && tapLength > 0) {
            // Double tap détecté
            e.preventDefault();
        }
        lastTap = currentTime;
    }, false);

});

// ============================================================
// 12. LOGGING POUR DÉBUGGAGE (À retirer en production)
// ============================================================
console.log(`
╔════════════════════════════════════════════════════════════╗
║     JENOVA - Site Mobile First Responsive                  ║
║     ${new Date().toLocaleTimeString('fr-FR')}                           ║
║     Viewport: ${window.innerWidth}x${window.innerHeight}px                       ║
╚════════════════════════════════════════════════════════════╝
`);
