// Idioma por defecto
let currentLanguage = 'es';

// Función para cambiar el idioma
function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Ocultar todos los elementos del idioma actual
    document.querySelectorAll(`[data-lang="${currentLanguage === 'es' ? 'en' : 'es'}"]`).forEach(element => {
        element.style.display = 'none';
    });
    
    // Mostrar todos los elementos del nuevo idioma
    document.querySelectorAll(`[data-lang="${currentLanguage}"]`).forEach(element => {
        element.style.display = '';
    });
    
    // Cambiar el atributo lang del HTML
    document.documentElement.lang = currentLanguage;
    
    // Actualizar el título de la página
    if (currentLanguage === 'es') {
        document.title = 'Julián Andrés Restrepo Castaño - Portafolio';
    } else {
        document.title = 'Julián Andrés Restrepo Castaño - Portfolio';
    }
    
    // Guardar preferencia en localStorage
    localStorage.setItem('preferredLanguage', currentLanguage);
    
    // Actualizar el texto del botón
    const langToggle = document.getElementById('langToggle');
    const toggleSpans = langToggle.querySelectorAll('span[data-lang]');
    toggleSpans.forEach(span => {
        if (span.getAttribute('data-lang') === currentLanguage) {
            span.style.display = 'none';
        } else {
            span.style.display = '';
        }
    });
}

// Función para inicializar el idioma desde localStorage
function initLanguage() {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
        currentLanguage = savedLanguage;
    }
    changeLanguage(currentLanguage);
}

// Event listener para el botón de cambio de idioma
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar idioma
    initLanguage();
    
    // Botón de cambio de idioma
    const langToggle = document.getElementById('langToggle');
    langToggle.addEventListener('click', function() {
        const newLang = currentLanguage === 'es' ? 'en' : 'es';
        changeLanguage(newLang);
    });
    
    // Menu toggle para móviles
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animar las líneas del menú hamburguesa
            const spans = menuToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    // Smooth scroll para los enlaces de navegación
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Efecto de scroll en el header
    let lastScroll = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Animación de aparición al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.skills-subsection, .project-card, .certification-card, .contact-item, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Prevenir selección de texto en elementos de navegación (opcional)
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('.nav-menu a, .lang-toggle');
    navItems.forEach(item => {
        item.addEventListener('selectstart', function(e) {
            e.preventDefault();
        });
    });
});

