// ===== LESSGOOO AI — Home Page Script =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('hmNavbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ===== Scroll Reveal with Stagger =====
    const revealElements = document.querySelectorAll('.hm-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Floating Particles =====
    const canvas = document.getElementById('hmParticles');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const PARTICLE_COUNT = 50;

        function resizeCanvas() {
            const hero = canvas.parentElement;
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2.5 + 0.5,
                speedX: (Math.random() - 0.5) * 0.4,
                speedY: (Math.random() - 0.5) * 0.3 - 0.15,
                opacity: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.5 ? 220 : 270, // blue or purple
                pulse: Math.random() * Math.PI * 2
            };
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;
                p.pulse += 0.02;

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                const pulseOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
                const pulseSize = p.size * (0.8 + 0.2 * Math.sin(p.pulse));

                // Glow
                ctx.beginPath();
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 4);
                gradient.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${pulseOpacity * 0.4})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
                ctx.fillStyle = gradient;
                ctx.arc(p.x, p.y, pulseSize * 4, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.fillStyle = `hsla(${p.hue}, 80%, 80%, ${pulseOpacity})`;
                ctx.arc(p.x, p.y, pulseSize, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connection lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        const lineOpacity = (1 - dist / 150) * 0.08;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(79, 143, 255, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(drawParticles);
        }

        resizeCanvas();
        initParticles();
        drawParticles();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // ===== Card Tilt Effect =====
    document.querySelectorAll('.hm-product-card, .hm-why-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -3;
            const rotateY = (x - centerX) / centerX * 3;

            card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ===== Smooth Counter Animation for Stats ===== 
    function animateValue(el, start, end, duration) {
        let startTime = null;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.floor(eased * (end - start) + start).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }

    // ===== Language Toggle (FR/EN) =====
    const translations = {
        fr: {
            nav_home: 'Accueil',
            nav_generator: 'Générateur IA',
            nav_masterclass: 'Masterclass',
            nav_contact: 'Contactez-nous',
            hero_badge: '<span class="hm-badge-pulse"></span> ⚡ Le Futur de l\'IA Est Ici',
            hero_title: 'Votre Plateforme <span class="hm-gradient-text">IA Tout-en-Un</span>',
            hero_subtitle: 'Créez des vidéos IA cinématiques instantanément ou maîtrisez les compétences IA pour commencer à gagner. LESSGOOO AI vous donne les outils et les connaissances.',
            hero_btn1: '🎬 Générateur Vidéo IA',
            hero_btn2: '🧠 Masterclass IA',
            prod_label: 'Nos Produits',
            prod_title: 'Deux Moyens Puissants de Progresser',
            prod1_badge: 'Outil',
            prod1_title: 'Générateur Vidéo IA',
            prod1_desc: "Transformez de simples textes en superbes vidéos cinématiques de 8 secondes grâce à l'IA avancée. Aucune compétence en montage requise.",
            prod1_f1: '✦ Texte en vidéo en secondes',
            prod1_f2: '✦ Qualité cinématique',
            prod1_f3: '✦ Paiement unique, accès à vie',
            prod1_period: 'Paiement unique',
            prod1_cta: 'Explorer le Générateur IA →',
            prod2_badge: '🔥 Populaire',
            prod2_title: 'Masterclass IA',
            prod2_desc: "Apprenez des compétences IA pratiques — de l'automatisation à la création de contenu en passant par la construction d'une activité secondaire rentable.",
            prod2_f1: '✦ 6 modules complets',
            prod2_f2: '✦ Projets pratiques et démos',
            prod2_f3: '✦ Accès à vie + mises à jour incluses',
            prod2_period: '83% de réduction',
            prod2_cta: 'Explorer la Masterclass →',
            why_label: 'Pourquoi LESSGOOO AI',
            why_title: 'Conçu pour la Génération IA',
            why1_title: 'Résultats Instantanés',
            why1_desc: "Générez des vidéos IA en secondes. Pas d'attente, pas de complexité. Décrivez et créez.",
            why2_title: 'Apprenez & Gagnez',
            why2_desc: 'Notre Masterclass vous apprend à transformer vos compétences IA en véritables opportunités de revenus.',
            why3_title: 'Accès Abordable',
            why3_desc: "Pas d'abonnements. Des paiements uniques pour un accès à vie à tous les outils et contenus.",
            why4_title: "Fait pour l'Afrique",
            why4_desc: 'Conçu et tarifé pour les créateurs, entrepreneurs et étudiants africains.',
            cta_title: 'Prêt à Commencer Votre <span class="hm-gradient-text">Aventure IA</span> ?',
            cta_subtitle: "Choisissez votre chemin et faites le premier pas aujourd'hui.",
            cta_btn1: '🎬 Essayer le Générateur IA',
            cta_btn2: '🧠 Rejoindre la Masterclass',
            foot_home: 'Accueil',
            foot_gen: 'Générateur IA',
            foot_mc: 'Masterclass',
            foot_copy: '&copy; 2026 Lessgooo AI. Tous droits réservés.'
        },
        en: {
            nav_home: 'Home',
            nav_generator: 'AI Generator',
            nav_masterclass: 'Masterclass',
            nav_contact: 'Contact Us',
            hero_badge: '<span class="hm-badge-pulse"></span> ⚡ The Future of AI Is Here',
            hero_title: 'Your All-in-One <span class="hm-gradient-text">AI Platform</span>',
            hero_subtitle: 'Create cinematic AI videos instantly or master AI skills to start earning. LESSGOOO AI gives you the tools and the knowledge.',
            hero_btn1: '🎬 AI Video Generator',
            hero_btn2: '🧠 AI Masterclass',
            prod_label: 'Our Products',
            prod_title: 'Two Powerful Ways to Level Up',
            prod1_badge: 'Tool',
            prod1_title: 'AI Video Generator',
            prod1_desc: 'Transform simple text prompts into stunning 8-second cinematic videos with advanced AI. No editing skills needed.',
            prod1_f1: '✦ Text-to-video in seconds',
            prod1_f2: '✦ Cinematic quality output',
            prod1_f3: '✦ One-time payment, lifetime access',
            prod1_period: 'One-time',
            prod1_cta: 'Explore AI Generator →',
            prod2_badge: '🔥 Popular',
            prod2_title: 'AI Masterclass',
            prod2_desc: 'Learn practical AI skills — from automation to content creation to building a profitable AI side hustle.',
            prod2_f1: '✦ 6 comprehensive modules',
            prod2_f2: '✦ Practical projects & demos',
            prod2_f3: '✦ Lifetime access + future updates',
            prod2_period: '83% OFF',
            prod2_cta: 'Explore Masterclass →',
            why_label: 'Why LESSGOOO AI',
            why_title: 'Built for the AI Generation',
            why1_title: 'Instant Results',
            why1_desc: 'Generate AI videos in seconds. No waiting, no complexity. Just describe and create.',
            why2_title: 'Learn & Earn',
            why2_desc: 'Our Masterclass teaches you how to turn AI skills into real income opportunities.',
            why3_title: 'Affordable Access',
            why3_desc: 'No subscriptions. One-time payments give you lifetime access to all tools and content.',
            why4_title: 'Made for Africa',
            why4_desc: 'Designed and priced for African creators, entrepreneurs, and students.',
            cta_title: 'Ready to Start Your <span class="hm-gradient-text">AI Journey</span>?',
            cta_subtitle: 'Choose your path and take the first step today.',
            cta_btn1: '🎬 Try AI Generator',
            cta_btn2: '🧠 Join Masterclass',
            foot_home: 'Home',
            foot_gen: 'AI Generator',
            foot_mc: 'Masterclass',
            foot_copy: '&copy; 2026 Lessgooo AI. All rights reserved.'
        }
    };

    const waMessages = {
        fr: "Bonjour 👋\n\nJe suis intéressé par LESSGOOO AI.\n\nVeuillez m'envoyer plus de détails.\n\nMerci.",
        en: 'Hello 👋\n\nI am interested in LESSGOOO AI.\n\nPlease send me more details.\n\nThank you.'
    };

    let currentLang = localStorage.getItem('lessgooo-lang') || 'fr';

    function applyTranslations(lang) {
        const dict = translations[lang];
        if (!dict) return;

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dict[key]) {
                if (el.hasAttribute('data-i18n-html')) {
                    el.innerHTML = dict[key];
                } else {
                    el.textContent = dict[key];
                }
            }
        });

        // Update WhatsApp links
        const waText = encodeURIComponent(waMessages[lang] || waMessages.fr);
        document.querySelectorAll('[data-i18n-wa]').forEach(el => {
            el.href = 'https://wa.me/237675627271?text=' + waText;
        });

        document.documentElement.lang = lang;
    }

    // Toggle button
    const langToggle = document.getElementById('hmLangToggle');
    const langFlag = document.getElementById('hmLangFlag');
    const langLabel = document.getElementById('hmLangLabel');

    function updateToggleButton(lang) {
        if (lang === 'fr') {
            langFlag.textContent = '🇬🇧';
            langLabel.textContent = 'EN';
        } else {
            langFlag.textContent = '🇫🇷';
            langLabel.textContent = 'FR';
        }
    }

    if (langToggle) {
        if (currentLang !== 'fr') {
            applyTranslations(currentLang);
        }
        updateToggleButton(currentLang);

        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'fr' ? 'en' : 'fr';
            localStorage.setItem('lessgooo-lang', currentLang);
            applyTranslations(currentLang);
            updateToggleButton(currentLang);
        });
    }

});
