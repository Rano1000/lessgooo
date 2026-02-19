// ===== LESSGOOO AI Masterclass — Interactive Script =====

document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('mcNavbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    // ===== Scroll Reveal =====
    const revealElements = document.querySelectorAll('.mc-reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ===== 30-Day Countdown Timer =====
    const STORAGE_KEY = 'lessgoo-mc-countdown-end';
    const COUNTDOWN_DAYS = 30;

    // Get or set the countdown end time
    let endTime = localStorage.getItem(STORAGE_KEY);
    if (!endTime) {
        endTime = Date.now() + COUNTDOWN_DAYS * 24 * 60 * 60 * 1000;
        localStorage.setItem(STORAGE_KEY, endTime);
    }
    endTime = parseInt(endTime);

    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');

    function padZero(n) {
        return n < 10 ? '0' + n : n;
    }

    function updateCountdown() {
        const now = Date.now();
        let diff = endTime - now;

        if (diff <= 0) {
            diff = 0;
            cdDays.textContent = '00';
            cdHours.textContent = '00';
            cdMinutes.textContent = '00';
            cdSeconds.textContent = '00';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        cdDays.textContent = padZero(days);
        cdHours.textContent = padZero(hours);
        cdMinutes.textContent = padZero(minutes);
        cdSeconds.textContent = padZero(seconds);
    }

    // Run immediately then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ===== Smooth Scroll =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - navHeight - 20,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Language Toggle (EN/FR) =====
    const translations = {
        en: {
            topbar_home: 'Home',
            nav_home_link: 'Home',
            nav_gen_link: 'AI Generator',
            nav_mc_link: 'Masterclass',
            nav_cta: 'Enroll Now',
            hero_badge: '<span class="mc-badge-pulse"></span> 🧠 AI Masterclass 2026',
            hero_title: 'Master <span class="mc-gradient-text">Artificial Intelligence</span> and Start Earning With It',
            hero_subtitle: 'Learn practical AI skills that help you automate work, create digital products, generate content and build new income opportunities.',
            hero_cta: 'Enroll Now',
            hero_subtext: '⚡ Limited time discount available',
            cd_label: '🔥 LIMITED OFFER ENDS IN:',
            cd_days: 'Days',
            cd_hours: 'Hours',
            cd_minutes: 'Minutes',
            cd_seconds: 'Seconds',
            cd_warning: 'When the timer reaches zero, the price returns to <strong>30,000 CFA</strong>.',
            why_label: 'Why This Masterclass',
            why_title: 'Why Learn AI Now?',
            why1_title: 'Most In-Demand Skills',
            why1_desc: 'AI skills are the most in-demand skills in 2026. Companies everywhere are looking for AI-ready talent.',
            why2_title: 'Businesses Pay for AI',
            why2_desc: 'Businesses are paying top dollar for AI services. Position yourself to capture this growing demand.',
            why3_title: 'Automate Hours of Work',
            why3_desc: 'AI can automate hours of repetitive work daily, freeing you to focus on what truly matters.',
            why4_title: 'Start a Side Hustle',
            why4_desc: 'You can start an AI side hustle quickly with minimal investment and start earning right away.',
            cur_label: 'Full Curriculum',
            cur_title: 'What You Will Learn',
            cur_desc: '6 comprehensive modules designed to take you from AI beginner to confident practitioner.',
            m1_title: 'AI Foundations',
            m1_l1: 'What is AI and how it works (simple explanation)',
            m1_l2: 'Overview of powerful AI tools',
            m1_l3: 'Understanding AI opportunities',
            m2_title: 'AI for Productivity',
            m2_l1: 'Writing emails, CVs and proposals with AI',
            m2_l2: 'Automating repetitive daily tasks',
            m2_l3: 'AI tools for students and professionals',
            m3_title: 'AI Content Creation',
            m3_l1: 'Creating AI videos step-by-step',
            m3_l2: 'AI image generation tools',
            m3_l3: 'Script and content writing with AI',
            m3_l4: 'Social media content automation',
            m4_title: 'AI for Business & Side Hustles',
            m4_l1: 'Starting an AI side hustle',
            m4_l2: 'Selling AI services to clients',
            m4_l3: 'AI marketing strategies',
            m4_l4: 'Building digital products with AI',
            m5_title: 'AI Automation',
            m5_l1: 'Connecting AI tools together',
            m5_l2: 'Creating simple workflows',
            m5_l3: 'Saving 10+ hours per week using AI',
            m6_title: 'Practical Projects',
            m6_l1: 'Create your first AI video',
            m6_l2: 'Launch your first AI-based offer',
            m6_l3: 'Real step-by-step demonstrations',
            aud_label: "Who It's For",
            aud_title: 'This Masterclass Is Perfect For',
            aud1_title: 'Students',
            aud1_desc: 'Get ahead of the curve and future-proof your career with AI skills before you even graduate.',
            aud2_title: 'Entrepreneurs',
            aud2_desc: 'Leverage AI to scale your business, cut costs, and create new revenue streams effortlessly.',
            aud3_title: 'Freelancers',
            aud3_desc: 'Offer high-value AI services to your clients and charge premium rates for in-demand work.',
            aud4_title: 'Curious Minds',
            aud4_desc: "No tech background needed. If you're curious about AI, this masterclass is your perfect starting point.",
            price_label: 'Pricing',
            price_title: 'Invest in Your Future',
            price_badge: '🔥 LIMITED OFFER',
            price_desc: 'Complete AI training — from basics to earning with AI.',
            price_save: 'You save 25,000 CFA (83% OFF)',
            price_note: 'One-time payment. Lifetime access to the masterclass.',
            pi1: '✦ 6 comprehensive modules',
            pi2: '✦ Practical projects & demos',
            pi3: '✦ Lifetime access',
            pi4: '✦ Future updates included',
            price_cta: 'Enroll via WhatsApp',
            price_footnote: 'Instant access after payment confirmation',
            final_title: "Don't Miss This Opportunity To Learn AI At A <span class=\"mc-gradient-text\">Discounted Price</span>",
            final_subtitle: 'Secure your spot before the countdown ends.',
            final_cta: 'Reserve My Spot Now',
            footer_disc: 'Access is granted after payment confirmation. Discount valid only during countdown period.',
            footer_copy: '&copy; 2026 Lessgooo AI. All rights reserved.'
        },
        fr: {
            topbar_home: 'Accueil',
            nav_home_link: 'Accueil',
            nav_gen_link: 'Générateur IA',
            nav_mc_link: 'Masterclass',
            nav_cta: "S'inscrire",
            hero_badge: '<span class="mc-badge-pulse"></span> 🧠 Masterclass IA 2026',
            hero_title: "Maîtrisez l'<span class=\"mc-gradient-text\">Intelligence Artificielle</span> et Commencez à En Gagner",
            hero_subtitle: "Apprenez des compétences IA pratiques pour automatiser votre travail, créer des produits numériques, générer du contenu et développer de nouvelles sources de revenus.",
            hero_cta: "S'inscrire Maintenant",
            hero_subtext: '⚡ Réduction limitée disponible',
            cd_label: "🔥 L'OFFRE SE TERMINE DANS :",
            cd_days: 'Jours',
            cd_hours: 'Heures',
            cd_minutes: 'Minutes',
            cd_seconds: 'Secondes',
            cd_warning: 'Quand le compteur atteint zéro, le prix revient à <strong>30 000 CFA</strong>.',
            why_label: 'Pourquoi Cette Masterclass',
            why_title: "Pourquoi Apprendre l'IA Maintenant ?",
            why1_title: 'Compétences Les Plus Demandées',
            why1_desc: "Les compétences IA sont les plus demandées en 2026. Les entreprises recherchent partout des talents prêts pour l'IA.",
            why2_title: "Les Entreprises Paient pour l'IA",
            why2_desc: "Les entreprises paient cher pour des services IA. Positionnez-vous pour capter cette demande croissante.",
            why3_title: 'Automatisez des Heures de Travail',
            why3_desc: "L'IA peut automatiser des heures de travail répétitif chaque jour, vous libérant pour ce qui compte vraiment.",
            why4_title: 'Lancez une Activité Secondaire',
            why4_desc: "Vous pouvez lancer une activité IA rapidement avec un investissement minimal et commencer à gagner tout de suite.",
            cur_label: 'Programme Complet',
            cur_title: 'Ce Que Vous Allez Apprendre',
            cur_desc: '6 modules complets conçus pour vous faire passer de débutant IA à praticien confiant.',
            m1_title: "Fondamentaux de l'IA",
            m1_l1: "Qu'est-ce que l'IA et comment ça fonctionne (explication simple)",
            m1_l2: "Vue d'ensemble des outils IA puissants",
            m1_l3: "Comprendre les opportunités de l'IA",
            m2_title: 'IA pour la Productivité',
            m2_l1: "Rédiger des emails, CV et propositions avec l'IA",
            m2_l2: 'Automatiser les tâches répétitives quotidiennes',
            m2_l3: 'Outils IA pour étudiants et professionnels',
            m3_title: 'Création de Contenu IA',
            m3_l1: 'Créer des vidéos IA étape par étape',
            m3_l2: "Outils de génération d'images IA",
            m3_l3: "Écriture de scripts et de contenu avec l'IA",
            m3_l4: 'Automatisation du contenu pour les réseaux sociaux',
            m4_title: 'IA pour Business & Activités Secondaires',
            m4_l1: 'Lancer une activité secondaire avec l\'IA',
            m4_l2: 'Vendre des services IA à des clients',
            m4_l3: 'Stratégies marketing IA',
            m4_l4: "Créer des produits numériques avec l'IA",
            m5_title: 'Automatisation IA',
            m5_l1: 'Connecter les outils IA entre eux',
            m5_l2: 'Créer des workflows simples',
            m5_l3: "Économiser plus de 10 heures par semaine grâce à l'IA",
            m6_title: 'Projets Pratiques',
            m6_l1: 'Créez votre première vidéo IA',
            m6_l2: 'Lancez votre première offre basée sur l\'IA',
            m6_l3: 'Démonstrations réelles étape par étape',
            aud_label: 'Pour Qui',
            aud_title: 'Cette Masterclass Est Faite Pour',
            aud1_title: 'Étudiants',
            aud1_desc: "Prenez de l'avance et préparez votre carrière avec des compétences IA avant même d'être diplômé.",
            aud2_title: 'Entrepreneurs',
            aud2_desc: "Utilisez l'IA pour développer votre entreprise, réduire les coûts et créer de nouvelles sources de revenus sans effort.",
            aud3_title: 'Freelancers',
            aud3_desc: "Offrez des services IA de grande valeur à vos clients et facturez des tarifs premium pour un travail très demandé.",
            aud4_title: 'Esprits Curieux',
            aud4_desc: "Aucune formation technique requise. Si l'IA vous intéresse, cette masterclass est votre point de départ idéal.",
            price_label: 'Tarifs',
            price_title: 'Investissez Dans Votre Avenir',
            price_badge: '🔥 OFFRE LIMITÉE',
            price_desc: "Formation IA complète — des bases à l'apprentissage de la monétisation avec l'IA.",
            price_save: 'Vous économisez 25 000 CFA (83% de réduction)',
            price_note: 'Paiement unique. Accès à vie à la masterclass.',
            pi1: '✦ 6 modules complets',
            pi2: '✦ Projets pratiques et démos',
            pi3: '✦ Accès à vie',
            pi4: '✦ Mises à jour futures incluses',
            price_cta: "S'inscrire via WhatsApp",
            price_footnote: 'Accès instantané après confirmation du paiement',
            final_title: "Ne Manquez Pas Cette Opportunité d'Apprendre l'IA à un <span class=\"mc-gradient-text\">Prix Réduit</span>",
            final_subtitle: 'Réservez votre place avant la fin du compte à rebours.',
            final_cta: 'Réserver Ma Place Maintenant',
            footer_disc: "L'accès est accordé après confirmation du paiement. Réduction valable uniquement pendant la période du compte à rebours.",
            footer_copy: '&copy; 2026 Lessgooo AI. Tous droits réservés.'
        }
    };

    const waMessages = {
        en: 'Hello 👋\n\nI would like to enroll in the LESSGOOO AI Masterclass.\n\nPlease send me the payment details.\n\nThank you.',
        fr: 'Bonjour 👋\n\nJe souhaite m\'inscrire à la Masterclass LESSGOOO AI.\n\nVeuillez m\'envoyer les détails de paiement.\n\nMerci.'
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
        const waText = encodeURIComponent(waMessages[lang] || waMessages.en);
        document.querySelectorAll('[data-i18n-wa]').forEach(el => {
            el.href = 'https://wa.me/237675627271?text=' + waText;
        });

        document.documentElement.lang = lang;
    }

    // Language toggle button
    const langToggle = document.getElementById('mcLangToggle');
    const langFlag = document.getElementById('mcLangFlag');
    const langLabel = document.getElementById('mcLangLabel');

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
