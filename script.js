// Inicialização da cena 3D com Three.js
let scene, camera, renderer, cube, controls;
let is3DInitialized = false;

function init3DScene() {
    // Verificar se o Three.js está carregado
    if (typeof THREE === 'undefined') {
        console.error('Three.js não carregado');
        return;
    }
    
    // Criar cena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    
    // Criar câmera
    camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
    camera.position.z = 5;
    
    // Criar renderizador
    const container = document.getElementById('scene-container');
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Adicionar controles de órbita
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 3;
    controls.maxDistance = 10;
    
    // Adicionar luzes
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x6C63FF, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Criar geometria 3D - Cubo com elementos internos
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Materiais para cada face do cubo
    const materials = [
        new THREE.MeshStandardMaterial({ 
            color: 0x6C63FF, 
            metalness: 0.7, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xFF6584, 
            metalness: 0.7, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x6C63FF, 
            metalness: 0.7, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xFF6584, 
            metalness: 0.7, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0x6C63FF, 
            metalness: 0.7, 
            roughness: 0.2 
        }),
        new THREE.MeshStandardMaterial({ 
            color: 0xFF6584, 
            metalness: 0.7, 
            roughness: 0.2 
        })
    ];
    
    cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Adicionar partículas flutuantes ao redor do cubo
    const particleCount = 500;
    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 10;
        particlePositions[i + 1] = (Math.random() - 0.5) * 10;
        particlePositions[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0x6C63FF,
        size: 0.02,
        transparent: true
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    
    // Adicionar elementos flutuantes
    const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshStandardMaterial({ 
        color: 0xFF6584, 
        metalness: 0.7, 
        roughness: 0.2 
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = 3;
    scene.add(torus);
    
    const sphereGeometry = new THREE.SphereGeometry(0.8, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x6C63FF, 
        metalness: 0.7, 
        roughness: 0.2 
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = -3;
    scene.add(sphere);
    
    is3DInitialized = true;
    
    // Animação
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotacionar cubo
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        
        // Rotacionar outros elementos
        torus.rotation.x += 0.01;
        torus.rotation.y += 0.005;
        
        sphere.rotation.x += 0.005;
        sphere.rotation.y += 0.01;
        
        // Rotacionar partículas
        particleSystem.rotation.y += 0.001;
        
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Redimensionar a cena quando a janela for redimensionada
    window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
    if (!is3DInitialized) return;
    
    const container = document.getElementById('scene-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Menu mobile
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
    
    // Efeito de rolagem na navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulação de envio
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Enviando...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Obrigado pela sua mensagem! Entraremos em contato em breve.');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
    
    // Efeito de digitação no título
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerText = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerText += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar efeito de digitação após 1 segundo
        setTimeout(typeWriter, 1000);
    }
    
    // Inicializar cena 3D
    setTimeout(() => {
        if (typeof THREE !== 'undefined') {
            init3DScene();
        } else {
            console.warn('Three.js não carregou, tentando novamente...');
            // Tentar carregar novamente após um atraso
            setTimeout(init3DScene, 1000);
        }
    }, 500);
    
    // Adicionar efeito de parallax em elementos ao rolar
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sceneContainer = document.querySelector('.scene-container');
        
        if (sceneContainer) {
            sceneContainer.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
        
        // Efeito parallax nas seções
        const servicesSection = document.querySelector('.services');
        const portfolioSection = document.querySelector('.portfolio');
        
        if (servicesSection) {
            servicesSection.style.backgroundPositionY = `${scrolled * 0.02}px`;
        }
        
        if (portfolioSection) {
            portfolioSection.style.backgroundPositionY = `${scrolled * 0.03}px`;
        }
    });
    
    // Adicionar efeito de hover 3D nos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Efeito 3D nos cards de planos
function initPlanCards3D() {
    const planCards = document.querySelectorAll('.plan-card');
    
    planCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const cardRect = card.getBoundingClientRect();
            const x = e.clientX - cardRect.left;
            const y = e.clientY - cardRect.top;
            
            const centerX = cardRect.width / 2;
            const centerY = cardRect.height / 2;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = ((centerY - y) / centerY) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            
            // Efeito de brilho dinâmico
            const glow = document.createElement('div');
            glow.className = 'plan-glow';
            glow.style.position = 'absolute';
            glow.style.top = `${y}px`;
            glow.style.left = `${x}px`;
            glow.style.width = '100px';
            glow.style.height = '100px';
            glow.style.background = `radial-gradient(circle at center, rgba(108, 99, 255, 0.3) 0%, transparent 70%)`;
            glow.style.borderRadius = '50%';
            glow.style.pointerEvents = 'none';
            glow.style.transform = 'translate(-50%, -50%)';
            glow.style.zIndex = '0';
            
            // Remover brilhos antigos
            const oldGlow = card.querySelector('.plan-glow');
            if (oldGlow) oldGlow.remove();
            
            card.appendChild(glow);
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            
            // Remover brilho
            const glow = card.querySelector('.plan-glow');
            if (glow) {
                glow.style.opacity = '0';
                setTimeout(() => glow.remove(), 300);
            }
        });
    });
}

// Chamar a função após o carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...

    // Inicializar FAQ 3D
    initModernFAQ();
    
    // Adicionar efeito 3D nos cards de planos
    initPlanCards3D();
});

// Efeito de aparecimento ao rolar a página (Scroll Reveal) - VERSÃO CORRIGIDA
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Adiciona classe quando entra na tela, remove quando sai
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Adicionar delay para elementos filhos (se houver)
                const childElements = entry.target.querySelectorAll('[data-delay]');
                childElements.forEach((child, index) => {
                    const delay = child.getAttribute('data-delay') || index * 100;
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, delay);
                });
            } else {
                // Opcional: remover a classe quando sai da tela
                // Se quiser que fique visível sempre, comente as próximas 2 linhas
                entry.target.classList.remove('visible');
                entry.target.querySelectorAll('[data-delay]').forEach(child => {
                    child.classList.remove('visible');
                });
            }
        });
    }, observerOptions);
    
    // Observar todas as seções
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Observar elementos individuais com delays
    const elementsWithDelay = [
        '.service-card',
        '.portfolio-item', 
        '.plan-card',
        '.contact-card',
        '.stat',
        '.feature'
    ];
    
    elementsWithDelay.forEach(selector => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.style.setProperty('--delay', `${index * 100}ms`);
            observer.observe(element);
        });
    });
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // ... seu código existente ...
    
    // Adicionar scroll reveal
    initScrollReveal();
});

// Carrossel automático simples
function initAutoCarousel() {
    const carouselTrack = document.querySelector('.carousel-track.infinite');
    if (!carouselTrack) return;
    
    // A animação já está no CSS, então não precisa de JavaScript
    // Mas podemos adicionar um efeito de pausa no hover
    carouselTrack.addEventListener('mouseenter', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    carouselTrack.addEventListener('mouseleave', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
    
    // Ajusta a velocidade baseada no tamanho da tela
    function adjustAnimationSpeed() {
        if (window.innerWidth < 768) {
            carouselTrack.style.animationDuration = '40s'; // Mais lento no mobile
        } else {
            carouselTrack.style.animationDuration = '30s'; // Normal no desktop
        }
    }
    
    adjustAnimationSpeed();
    window.addEventListener('resize', adjustAnimationSpeed);
}

// Chame no DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initAutoCarousel();
});

// FAQ Moderno e Performático
function initModernFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    let activeItem = null;
    let isAnimating = false;
    
    if (!faqItems.length) return;
    
    // Prepara animações
    faqItems.forEach(item => {
        const answer = item.querySelector('.faq-answer');
        const content = item.querySelector('.faq-answer-content');
        
        // Cria conteúdo se não existir
        if (answer && !content) {
            const existingContent = answer.innerHTML;
            answer.innerHTML = '';
            const contentDiv = document.createElement('div');
            contentDiv.className = 'faq-answer-content';
            contentDiv.innerHTML = existingContent;
            answer.appendChild(contentDiv);
        }
        
        // Configura evento de clique
        item.addEventListener('click', function(e) {
            if (isAnimating) return;
            
            const clickedItem = this;
            const isCurrentlyActive = clickedItem.classList.contains('active');
            
            // Se já está ativo, apenas fecha
            if (isCurrentlyActive) {
                closeFAQ(clickedItem);
                return;
            }
            
            // Fecha item ativo anterior
            if (activeItem && activeItem !== clickedItem) {
                closeFAQ(activeItem);
            }
            
            // Abre novo item
            openFAQ(clickedItem);
        });
        
        // Efeito hover suave
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active') && !isAnimating) {
                this.style.transform = 'translateY(-3px) scale(1.01)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    function openFAQ(item) {
        isAnimating = true;
        const answer = item.querySelector('.faq-answer');
        const content = item.querySelector('.faq-answer-content');
        
        // Ativa visualmente
        item.classList.add('active');
        item.style.transform = 'translateY(-3px) scale(1.01)';
        activeItem = item;
        
        // Calcula altura
        content.style.display = 'block';
        const contentHeight = content.scrollHeight;
        content.style.display = '';
        
        // Anima abertura
        answer.style.maxHeight = contentHeight + 'px';
        
        // Anima conteúdo com delay
        setTimeout(() => {
            if (content) {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }
            
            // Efeito de "pop"
            item.style.transform = 'translateY(-3px) scale(1.01)';
            setTimeout(() => {
                item.style.transform = 'translateY(-3px) scale(1)';
                isAnimating = false;
            }, 150);
        }, 50);
    }
    
    function closeFAQ(item) {
        isAnimating = true;
        const answer = item.querySelector('.faq-answer');
        const content = item.querySelector('.faq-answer-content');
        
        // Desativa visualmente
        item.classList.remove('active');
        activeItem = null;
        
        // Anima fechamento
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
        }
        
        answer.style.maxHeight = '0';
        
        setTimeout(() => {
            item.style.transform = 'translateY(0) scale(1)';
            isAnimating = false;
        }, 300);
    }
    
    // Auto-abre o primeiro FAQ após 1 segundo
    setTimeout(() => {
        if (!activeItem) {
            faqItems[0].click();
        }
    }, 1000);
    
    // Fecha FAQ ao clicar fora (opcional)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.faq-item') && activeItem) {
            closeFAQ(activeItem);
        }
    });
}

// Animação dos números (adicionar no seu script.js)
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const suffix = stat.textContent.includes('%') ? '%' : '';
        let current = 0;
        const increment = target / 100;
        const duration = 2000; // 2 segundos
        const step = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, step);
    });
}

// Chamar quando a seção ficar visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

// Observar a seção de clientes
const clientsSection = document.getElementById('clients');
if (clientsSection) {
    observer.observe(clientsSection);
}