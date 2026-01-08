// gestao-redes.js - Scripts específicos para a página de gestão de redes

document.addEventListener('DOMContentLoaded', function() {
    // Menu hamburger
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Formulário de contato
    const contactForm = document.getElementById('form-gestao');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = {
                nome: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                whatsapp: this.querySelector('input[type="tel"]').value,
                segmento: this.querySelector('select').value,
                mensagem: this.querySelector('textarea').value
            };
            
            // Simulação de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const originalBg = submitBtn.style.background;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            submitBtn.style.background = '#128C7E';
            
            setTimeout(() => {
                // Aqui normalmente enviaria para um backend
                alert('✅ Consultoria agendada! Entraremos em contato em até 24 horas para confirmar o horário.');
                
                // Reset do formulário
                this.reset();
                
                // Restaurar botão
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = originalBg;
            }, 2000);
        });
    }
    
    // Efeito de contador nos stats
    function animateStats() {
        const stats = document.querySelectorAll('.stat h3');
        
        stats.forEach(stat => {
            const originalText = stat.textContent;
            if (originalText.includes('%') || originalText.includes('R$') || originalText.includes(':')) {
                return; // Não anima valores com símbolos
            }
            
            const target = parseInt(originalText.replace(/\D/g, ''));
            if (isNaN(target)) return;
            
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 50);
        });
    }
    
    // Animar stats quando entrarem na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-gestao');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // Smooth scroll para links internos
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
    
    // Efeito de hover nas plataformas
    const platforms = document.querySelectorAll('.platform');
    platforms.forEach(platform => {
        platform.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.transform = 'rotate(360deg)';
                icon.style.transition = 'transform 0.8s ease';
            }
        });
        
        platform.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.platform-icon');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Adicionar classe ativa ao navegar
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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
});

// Efeito de digitação no título
function typeWriterEffect() {
    const title = document.querySelector('.hero-title .title-line:last-child');
    if (!title) return;
    
    const text = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        }
    }
    
    setTimeout(type, 1000);
}

// Iniciar efeitos quando a página carregar
window.onload = function() {
    typeWriterEffect();
    
    // Efeito parallax suave
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const socialIcons = document.querySelector('.social-icons-animated');
        
        if (socialIcons) {
            socialIcons.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
};