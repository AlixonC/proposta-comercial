document.addEventListener('DOMContentLoaded', async () => {
    AOS.init({ duration: 800, once: true, offset: 100 });

    const header = document.getElementById('main-header');
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('#nav-links a');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
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

    // Fetch data from JSON files
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) { 
                console.error(`Error fetching ${url}: ${response.statusText}`); 
                return null; 
            }
            return await response.json();
        } catch (e) { 
            console.error(`Fetch failed for ${url}:`, e); 
            return null; 
        }
    }

    const [content, portfolioData, carouselData] = await Promise.all([
        fetchData('./_data/site_content.json'),
        fetchData('./_data/portfolio.json'),
        fetchData('./_data/carousel.json')
    ]);

    if (!content) { 
        console.error("Failed to load main site content."); 
        return; 
    }

    // Helper functions to render content
    const render = (elId, data, template) => {
        const el = document.getElementById(elId);
        if (el && data) {
            el.innerHTML = Array.isArray(data) ? data.map(template).join('') : template(data);
        }
    };
    const setText = (elId, text) => { 
        const el = document.getElementById(elId);
        if (el && text) el.textContent = text; 
    };
    const setSrc = (elId, src) => { 
        const el = document.getElementById(elId);
        if (el && src) el.src = src; 
    };

    // --- RENDER SECTIONS ---

    // Header & Hero
    const logoContainer = document.getElementById('logo-container');
    if(content.header.logo_type === 'image' && content.header.logo_image) {
        logoContainer.innerHTML = `<img src="${content.header.logo_image}" alt="Logo" class="h-10">`;
    } else {
        logoContainer.textContent = content.header.logo_text;
    }

    setText('hero-title', content.hero.title);
    setText('hero-subtitle', content.hero.subtitle);
    setText('proposal-date', new Date().toLocaleDateString('pt-BR'));
    const client = new URLSearchParams(window.location.search).get('cliente');
    if (client) {
        setText('client-name', decodeURIComponent(client.replace(/\+/g, ' ')));
    }

    // Problema Section (Without Emojis)
    const problemIcons = {
        "💸": "ph-currency-dollar",
        "⏳": "ph-timer",
        "🤯": "ph-lightning"
    };
    render('problema-cards', content.problemas, (item, i) => `
        <div class="bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-500 interactive-card" data-aos="fade-up" data-aos-delay="${i*100}">
            <i class="${problemIcons[item.emoji] || 'ph-warning-circle'} text-5xl mb-5 text-red-500"></i>
            <h3 class="text-xl font-bold text-red-600">${item.title}</h3>
            <p class="mt-3 text-slate-600">${item.description}</p>
        </div>`);
    
    // About Section
    setText('about-title', content.sobre.title);
    setText('about-name', content.sobre.name);
    setText('about-bio', content.sobre.bio);
    setSrc('about-photo', content.sobre.photo);
    
    // Packages Section
    render('packages-container', content.packages, (pkg, i) => `
        <div class="relative bg-white p-8 rounded-lg shadow-lg border-2 ${pkg.recommended ? 'border-[var(--accent-gold)]' : 'border-transparent'} flex flex-col interactive-card" data-aos="fade-up" data-aos-delay="${i*100}">
            ${pkg.recommended ? '<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[var(--accent-gold)] text-white text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recomendado</div>' : ''}
            <div class="flex-grow">
                <h3 class="text-2xl font-bold package-name text-[var(--primary-dark)]">${pkg.name}</h3>
                <p class="mt-2 text-slate-500 h-12">${pkg.description}</p>
                <p class="text-4xl font-extrabold my-6 text-[var(--primary-dark)]">R$ ${pkg.price}</p>
                <ul class="space-y-3 text-slate-700 text-left">${(pkg.features || []).map(f => `<li class="flex items-start"><i class="ph-check-circle text-green-500 text-xl mr-2 mt-0.5"></i><span>${f}</span></li>`).join('')}</ul>
            </div>
            <button class="select-plan-btn w-full mt-8 py-3 px-6 rounded-full font-semibold transition-colors ${pkg.recommended ? 'bg-[var(--accent-gold)] text-white hover:brightness-110' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'} cursor-pointer flex items-center justify-center gap-2">
                <span>Selecionar Plano</span>
                <i class="ph-arrow-right text-xl"></i>
            </button>
        </div>`);

    // Guarantees Section
    const guaranteeIcons = {'✅': 'ph-shield-check', '⏰': 'ph-clock', '🛠️': 'ph-users-three'};
    render('garantia-cards', content.guarantees, (item, i) => `
        <div class="bg-white/10 p-8 rounded-lg interactive-card backdrop-blur-sm" data-aos="fade-up" data-aos-delay="${i*100}">
            <i class="${guaranteeIcons[item.icon] || 'ph-check-circle'} text-[var(--accent-gold)] text-5xl mb-5 inline-block"></i>
            <h3 class="font-bold text-xl text-white">${item.title}</h3>
            <p class="mt-3 text-slate-300">${item.description}</p>
        </div>`);

    // Testimonials Section
    render('depoimentos-grid', content.testimonials, (item, i) => `
        <div class="bg-white p-8 rounded-lg interactive-card" data-aos="fade-up" data-aos-delay="${i * 100}">
            <i class="ph-quotes-fill text-4xl text-[var(--light-gray)]"></i>
            <p class="text-slate-600 italic mt-4">"${item.text}"</p>
            <p class="font-bold text-slate-800 mt-6">${item.author}</p>
        </div>`);
    
    // Timeline Section
    render('timeline-content', content.timeline, (item, i) => `
        <div class="relative timeline-item" data-aos="${i % 2 === 0 ? 'fade-right' : 'fade-left'}">
            <div class="md:flex items-center ${i % 2 === 0 ? '' : 'flex-row-reverse'}">
                <div class="md:w-1/2 p-4">
                    <div class="bg-white p-6 rounded-lg shadow-lg border">
                        <h3 class="text-xl font-bold text-[var(--primary-dark)]">${item.title}</h3>
                        <p class="text-slate-600 mt-2">${item.description}</p>
                    </div>
                </div>
            </div>
        </div>`);
    
    // FAQ Section
    render('faq-container', content.faq, (item, i) => `
        <div class="faq-item bg-white rounded-lg shadow-sm overflow-hidden" data-aos="fade-up">
            <div class="faq-header p-5 flex justify-between items-center">
                <h4 class="font-semibold text-lg">${item.question}</h4>
                <i class="ph-plus faq-icon text-2xl font-light text-[var(--primary-dark)]"></i>
            </div>
            <div class="faq-content hidden p-5 pt-0 text-slate-600"><p>${item.answer}</p></div>
        </div>`);
    document.querySelectorAll('.faq-header').forEach(h => h.addEventListener('click', () => {
        const item = h.parentElement;
        item.classList.toggle('open');
        h.nextElementSibling.classList.toggle('hidden');
    }));
    
    // Solutions (Tabs) Section
    const tabsContainer = document.getElementById('tabs-container');
    const tabsContent = document.getElementById('tabs-content');
    if (tabsContainer && tabsContent && content.solutions) {
        const solutionIcons = { "🏠": "ph-house-line", "🏗️": "ph-buildings", "💧": "ph-drop", "⚡": "ph-plugs" };
        const solutions = Object.values(content.solutions);
        tabsContainer.innerHTML = solutions.map(s => `<button data-tab="${s.key}" class="tab-button flex items-center gap-2 font-medium py-2 px-4 rounded-lg border-2 border-transparent transition"><i class="${solutionIcons[s.emoji]} text-xl"></i> ${s.title}</button>`).join('');
        const renderTab = key => {
            const s = content.solutions[key];
            tabsContent.innerHTML = `<h3 class="text-2xl font-bold text-[var(--primary-dark)]">${s.title}</h3><p class="mt-4 text-slate-700 leading-relaxed">${s.description}</p><ul class="mt-6 space-y-3">${s.deliverables.map(d=>`<li class="flex items-start"><i class="ph-check-circle text-xl mr-3 mt-0.5 text-[var(--accent-gold)]"></i><span>${d}</span></li>`).join('')}</ul>`;
        };
        tabsContainer.addEventListener('click', e => {
            const btn = e.target.closest('.tab-button');
            if(btn) {
                tabsContainer.querySelector('.active')?.classList.remove('active');
                btn.classList.add('active');
                renderTab(btn.dataset.tab);
            }
        });
        tabsContainer.querySelector('.tab-button').click();
    }

    // Portfolio Section
    if (portfolioData?.items) {
        render('portfolio-grid', portfolioData.items, item => `
            <div class="group relative overflow-hidden rounded-lg shadow-lg interactive-card" data-aos="zoom-in-up">
                <img src="${item.image}" alt="${item.title}" class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6">
                    <h3 class="text-xl font-bold text-white">${item.title}</h3>
                    <p class="capitalize text-[var(--accent-gold)]">${item.category}</p>
                </div>
            </div>`);
    }
    
    // Carousel Section
    if (carouselData?.slides) {
        render('carousel-slides-container', carouselData.slides, slide => `
            <div class="swiper-slide p-2">
                <div class="bg-white rounded-lg p-4 shadow-lg flex flex-col items-center text-slate-800 w-full">
                    <img src="${slide.image}" alt="${slide.title}" class="rounded-lg h-96 w-auto object-contain mb-4" loading="lazy">
                    <h4 class="font-bold text-lg">${slide.title}</h4>
                    <p class="text-sm text-slate-600">${slide.category}</p>
                </div>
            </div>`);
        new Swiper('.entregaveis-swiper', { loop: true, grabCursor: true, pagination: { el: '.swiper-pagination', clickable: true }, navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }, autoplay: { delay: 5000, disableOnInteraction: false } });
    }

    // --- INTERACTIVITY ---

    // Mobile Menu
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    mobileMenu.innerHTML = document.getElementById('nav-links').innerHTML.replace(/space-x-8/g, 'flex flex-col gap-6 text-xl') + `<a href="#contato" class="cta-button font-medium py-3 px-8 mt-4">Contato</a>`;
    menuButton.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.className = isHidden ? 'ph-list text-3xl' : 'ph-x text-3xl';
    });
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'ph-list text-3xl';
    }));
    
    // Contact Modal
    const modal = document.getElementById('contact-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const selectedPackageNameEl = document.getElementById('selected-package-name');
    const whatsappLink = document.getElementById('whatsapp-link');
    const emailLink = document.getElementById('email-link');

    document.querySelectorAll('.select-plan-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.interactive-card');
            const packageName = card.querySelector('.package-name').textContent;
            
            selectedPackageNameEl.textContent = packageName;
            const whatsappMessage = `Olá, tenho interesse no ${packageName}. Gostaria de mais informações.`;
            const emailSubject = `Interesse no ${packageName}`;
            const emailBody = `Olá, gostaria de mais informações sobre o ${packageName}.`;

            whatsappLink.href = `https://wa.me/5575998014491?text=${encodeURIComponent(whatsappMessage)}`;
            emailLink.href = `mailto:alison.karvalho@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            
            modal.classList.add('visible');
        });
    });

    const closeModal = () => {
        modal.classList.remove('visible');
    };
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { 
        if (e.target === modal) closeModal(); 
    });
});
