// ===== Lessgooo AI — Interactive Script =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== Navbar Scroll Effect =====
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ===== Mobile Nav Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ===== Scroll Reveal Animations =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ===== Setting Chips Toggle =====
  document.querySelectorAll('.setting-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  // ===== Access Modal Logic =====
  const accessModal = document.getElementById('accessModal');
  const accessModalClose = document.getElementById('accessModalClose');

  function showAccessModal(e) {
    e.preventDefault();
    e.stopPropagation();
    if (accessModal) {
      accessModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function hideAccessModal() {
    if (accessModal) {
      accessModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Intercept all generator launch buttons
  document.querySelectorAll('.btn-launch').forEach(btn => {
    btn.addEventListener('click', showAccessModal);
  });

  const generateBtn = document.getElementById('generateBtn');
  if (generateBtn) {
    generateBtn.addEventListener('click', showAccessModal);
  }

  // Close modal
  if (accessModalClose) {
    accessModalClose.addEventListener('click', hideAccessModal);
  }

  if (accessModal) {
    accessModal.addEventListener('click', (e) => {
      if (e.target === accessModal) hideAccessModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hideAccessModal();
    });
  }

  // ===== Hero Progress Bar Animation =====
  const heroProgress = document.getElementById('heroProgress');
  if (heroProgress) {
    let progress = 35;
    let direction = 1;

    setInterval(() => {
      progress += direction * 0.5;
      if (progress >= 65) direction = -1;
      if (progress <= 25) direction = 1;
      heroProgress.style.width = progress + '%';
    }, 100);
  }

  // ===== Smooth Scroll for Anchor Links =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ===== Textarea Auto-resize =====
  const promptInput = document.getElementById('promptInput');
  if (promptInput) {
    promptInput.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.max(120, this.scrollHeight) + 'px';
    });
  }

  // ===== Ambient Floating Particles =====
  function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.bottom = '-10px';
      particle.style.background = Math.random() > 0.5
        ? 'rgba(79, 143, 255, 0.6)'
        : 'rgba(155, 92, 255, 0.6)';
      particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
      particle.style.animationDelay = (Math.random() * 8) + 's';
      hero.appendChild(particle);
    }
  }

  createParticles();

  // ===== Typing Effect for Prompt Placeholder =====
  const placeholderTexts = {
    fr: [
      'Une ville futuriste au coucher du soleil avec des voitures volantes...',
      'Un astronaute solitaire marchant sur Mars avec la Terre dans le ciel...',
      'Des vagues océaniques s\'écrasant au ralenti pendant l\'heure dorée...',
      'Une scène de rue cyberpunk avec des néons et de la pluie...',
      'Des aurores boréales dansant au-dessus de montagnes enneigées...'
    ],
    en: [
      'A futuristic city at sunset with flying cars...',
      'A lone astronaut walking on Mars with Earth in the sky...',
      'Ocean waves crashing in slow motion during golden hour...',
      'A cyberpunk street scene with neon signs and rain...',
      'Northern lights dancing over snow-covered mountains...'
    ]
  };

  let currentLang = localStorage.getItem('lessgooo-lang') || 'fr';
  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typePlaceholder() {
    if (!promptInput || document.activeElement === promptInput) {
      setTimeout(typePlaceholder, 1000);
      return;
    }

    const texts = placeholderTexts[currentLang] || placeholderTexts.fr;
    const currentText = texts[placeholderIndex % texts.length];

    if (!isDeleting) {
      promptInput.placeholder = currentText.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typePlaceholder, 2000);
        return;
      }
    } else {
      promptInput.placeholder = currentText.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        placeholderIndex = (placeholderIndex + 1) % texts.length;
      }
    }

    const speed = isDeleting ? 30 : 50;
    setTimeout(typePlaceholder, speed);
  }

  setTimeout(typePlaceholder, 2000);

  // ===== Language Toggle (EN/FR) =====
  const translations = {
    en: {
      topbar_home: 'Home',
      nav_home: 'Home',
      nav_generator: 'AI Generator',
      nav_masterclass: 'Masterclass',
      nav_pricing: 'Pricing',
      nav_cta: 'Get Access',
      hero_badge: 'Limited Lifetime Access Available',
      hero_title: 'Create <span class="gradient-text">Cinematic AI Videos</span> in Seconds',
      hero_subtitle: 'Turn simple text into stunning 8-second videos powered by advanced AI. No editing skills required.',
      hero_cta: 'Get Lifetime Access',
      hero_how: 'How it works',
      hero_subtext: 'Instant access after approval',
      stat_videos: 'Videos Generated',
      stat_creators: 'Active Creators',
      stat_time: 'Generation Time',
      steps_label: 'How It Works',
      steps_title: 'Get Access in 4 Simple Steps',
      steps_desc: 'From request to full access in minutes.',
      step1_title: 'Click "Get Lifetime Access"',
      step1_desc: 'Tap the button to start your access request instantly.',
      step2_title: 'Chat with Support on WhatsApp',
      step2_desc: "You'll be connected directly with our friendly support team.",
      step3_title: 'Complete Your Payment',
      step3_desc: 'Make a simple one-time payment — no subscriptions, no hidden fees.',
      step4_title: 'Get Approved Instantly',
      step4_desc: 'Send your email and receive access credentials right away.',
      gen_label: 'AI Video Generator',
      gen_title: 'Bring Your Vision to Life',
      gen_desc: 'Describe any scene. Our AI transforms your words into cinematic video.',
      gen_prompt_label: 'Describe your video',
      gen_placeholder: 'A futuristic city at sunset with flying cars...',
      chip_duration: 'Duration: 8s',
      chip_quality: 'Quality: Standard',
      chip_style: 'Style: Cinematic',
      gen_btn: '✦ Launch AI Generator',
      gen_helper: 'You will be redirected to the secure generation workspace.',
      gen_preview: 'Your generated video will appear here',
      feat_label: 'Features',
      feat_title: 'Everything You Need',
      feat_desc: 'Powerful AI tools wrapped in a simple, intuitive interface.',
      feat1_title: 'Text to Video',
      feat1_desc: 'Create videos from simple text prompts. Just describe your scene and let AI do the rest.',
      feat2_title: 'Fast Generation',
      feat2_desc: 'Videos ready in seconds, not minutes. Our optimized pipeline delivers results fast.',
      feat3_title: 'Share Anywhere',
      feat3_desc: 'Download your videos instantly. Share on social media, embed anywhere, or keep for yourself.',
      social_title: 'Used by creators, developers and marketers',
      social_caption: 'Join <strong>2,000+</strong> creators already using Lessgooo AI',
      trust_text: 'Secure manual approval keeps the platform fast and reliable.',
      price_label: 'Pricing',
      price_title: 'Simple, Transparent Pricing',
      price_desc: 'One plan. No surprises. Full access to the AI engine.',
      price_badge: 'Most Popular',
      price_plan: 'LIFETIME ACCESS',
      price_plan_desc: 'One-time payment for unlimited use with fair usage.',
      price_period: 'One-time payment — lifetime access',
      pf1: 'Generate AI videos anytime',
      pf2: '8-second cinematic videos',
      pf3: 'Fast generation queue',
      pf4: 'Fair usage policy',
      pf5: 'Future updates included',
      price_cta: 'Get Access on WhatsApp',
      price_footnote: 'Instant activation after purchase',
      footer_privacy: 'Privacy',
      footer_terms: 'Terms',
      footer_disclaimer: 'Lessgooo AI uses advanced AI technology. Generation speed and availability may vary based on fair usage.',
      footer_approval: 'Access is granted after manual approval.',
      footer_copy: '&copy; 2026 Lessgooo AI. All rights reserved.',
      modal_title: 'Access Restricted',
      modal_text: 'This AI Generator is available to approved members only.',
      modal_cta: 'Get Access or Enroll in Masterclass'
    },
    fr: {
      topbar_home: 'Accueil',
      nav_home: 'Accueil',
      nav_generator: 'Générateur IA',
      nav_masterclass: 'Masterclass',
      nav_pricing: 'Tarifs',
      nav_cta: "Obtenir l'Accès",
      hero_badge: 'Accès à Vie Limité Disponible',
      hero_title: 'Créez des <span class="gradient-text">Vidéos IA Cinématiques</span> en Secondes',
      hero_subtitle: "Transformez un simple texte en superbes vidéos de 8 secondes grâce à l'IA avancée. Aucune compétence en montage requise.",
      hero_cta: "Obtenir l'Accès à Vie",
      hero_how: 'Comment ça marche',
      hero_subtext: 'Accès instantané après approbation',
      stat_videos: 'Vidéos Générées',
      stat_creators: 'Créateurs Actifs',
      stat_time: 'Temps de Génération',
      steps_label: 'Comment ça marche',
      steps_title: "Obtenez l'Accès en 4 Étapes Simples",
      steps_desc: "De la demande à l'accès complet en quelques minutes.",
      step1_title: "Cliquez sur « Obtenir l'Accès à Vie »",
      step1_desc: "Appuyez sur le bouton pour lancer votre demande d'accès instantanément.",
      step2_title: 'Discutez avec le Support sur WhatsApp',
      step2_desc: 'Vous serez mis en contact direct avec notre équipe de support.',
      step3_title: 'Effectuez Votre Paiement',
      step3_desc: "Un simple paiement unique — pas d'abonnement, pas de frais cachés.",
      step4_title: 'Approbation Instantanée',
      step4_desc: "Envoyez votre email et recevez vos identifiants d'accès immédiatement.",
      gen_label: 'Générateur Vidéo IA',
      gen_title: 'Donnez Vie à Votre Vision',
      gen_desc: "Décrivez n'importe quelle scène. Notre IA transforme vos mots en vidéo cinématique.",
      gen_prompt_label: 'Décrivez votre vidéo',
      gen_placeholder: 'Une ville futuriste au coucher du soleil avec des voitures volantes...',
      chip_duration: 'Durée : 8s',
      chip_quality: 'Qualité : Standard',
      chip_style: 'Style : Cinématique',
      gen_btn: '✦ Lancer le Générateur IA',
      gen_helper: "Vous serez redirigé vers l'espace de génération sécurisé.",
      gen_preview: 'Votre vidéo générée apparaîtra ici',
      feat_label: 'Fonctionnalités',
      feat_title: 'Tout Ce Dont Vous Avez Besoin',
      feat_desc: 'Des outils IA puissants dans une interface simple et intuitive.',
      feat1_title: 'Texte en Vidéo',
      feat1_desc: "Créez des vidéos à partir de simples descriptions textuelles. Décrivez votre scène et laissez l'IA faire le reste.",
      feat2_title: 'Génération Rapide',
      feat2_desc: 'Vidéos prêtes en secondes, pas en minutes. Notre pipeline optimisé livre des résultats rapidement.',
      feat3_title: 'Partagez Partout',
      feat3_desc: "Téléchargez vos vidéos instantanément. Partagez sur les réseaux sociaux, intégrez n'importe où ou gardez-les pour vous.",
      social_title: 'Utilisé par des créateurs, développeurs et marketeurs',
      social_caption: 'Rejoignez <strong>2 000+</strong> créateurs qui utilisent déjà Lessgooo AI',
      trust_text: "L'approbation manuelle sécurisée garantit une plateforme rapide et fiable.",
      price_label: 'Tarifs',
      price_title: 'Tarification Simple et Transparente',
      price_desc: 'Un seul plan. Pas de surprises. Accès complet au moteur IA.',
      price_badge: 'Le Plus Populaire',
      price_plan: 'ACCÈS À VIE',
      price_plan_desc: 'Paiement unique pour une utilisation illimitée avec usage raisonnable.',
      price_period: 'Paiement unique — accès à vie',
      pf1: 'Générez des vidéos IA à tout moment',
      pf2: 'Vidéos cinématiques de 8 secondes',
      pf3: 'File de génération rapide',
      pf4: "Politique d'usage raisonnable",
      pf5: 'Mises à jour futures incluses',
      price_cta: "Obtenir l'Accès sur WhatsApp",
      price_footnote: 'Activation instantanée après achat',
      footer_privacy: 'Confidentialité',
      footer_terms: 'Conditions',
      footer_disclaimer: "Lessgooo AI utilise une technologie IA avancée. La vitesse de génération et la disponibilité peuvent varier selon l'utilisation.",
      footer_approval: "L'accès est accordé après approbation manuelle.",
      footer_copy: '&copy; 2026 Lessgooo AI. Tous droits réservés.',
      modal_title: 'Accès Restreint',
      modal_text: 'Ce générateur IA est réservé aux membres approuvés uniquement.',
      modal_cta: "Obtenir l'Accès ou S'inscrire à la Masterclass"
    }
  };

  const waMessages = {
    en: 'Hello 👋\n\nI would like to request lifetime access to LESSGOOO AI Video Generator.\n\nPlease send me the payment details so I can be approved.\n\nThank you.',
    fr: 'Bonjour 👋\n\nJe souhaite demander un accès à vie à LESSGOOO AI Video Generator.\n\nVeuillez m\'envoyer les détails de paiement afin que je puisse être approuvé.\n\nMerci.'
  };

  function applyTranslations(lang) {
    const dict = translations[lang];
    if (!dict) return;

    // Update text content
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

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });

    // Update WhatsApp links
    const waText = encodeURIComponent(waMessages[lang] || waMessages.fr);
    document.querySelectorAll('[data-i18n-wa]').forEach(el => {
      el.href = 'https://wa.me/237675627271?text=' + waText;
    });

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Reset typing effect
    charIndex = 0;
    isDeleting = false;
    placeholderIndex = 0;
  }

  // Language toggle button
  const langToggle = document.getElementById('langToggle');
  const langFlag = document.getElementById('langFlag');
  const langLabel = document.getElementById('langLabel');

  function updateToggleButton(lang) {
    // Show the OTHER language (the one to switch to)
    if (lang === 'fr') {
      langFlag.textContent = '🇬🇧';
      langLabel.textContent = 'EN';
    } else {
      langFlag.textContent = '🇫🇷';
      langLabel.textContent = 'FR';
    }
  }

  if (langToggle) {
    // Apply saved language on load
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
