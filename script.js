document.addEventListener('DOMContentLoaded', async () => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    const header = document.getElementById('main-header');
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('main section');

    // --- HEADER SCROLL & ACTIVE LINK LOGIC ---
    const updateHeaderAndLinks = () => {
        // Header style on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', updateHeaderAndLinks);
    updateHeaderAndLinks(); // Initial check on load

    // --- DATA FETCHING ---
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

    const [content, portfolioData] = await Promise.all([
        fetchData('./_data/site_content.json'),
        fetchData('./_data/portfolio.json')
    ]);

    if (!content) {
        console.error("Failed to load main site content.");
        return;
    }

    // --- HELPER FUNCTIONS ---
    const render = (elId, data, template) => {
        const el = document.getElementById(elId);
        if (el && data) el.innerHTML = Array.isArray(data) ? data.map(template).join('') : template(data);
    };
    const setText = (elId, text) => { document.getElementById(elId) && text ? document.getElementById(elId).textContent = text : null; };
    const setSrc = (elId, src) => { document.getElementById(elId) && src ? document.getElementById(elId).src = src : null; };
    const setBg = (elId, url) => { document.getElementById(elId) && url ? document.getElementById(elId).style.backgroundImage = `url(${url})` : null; };

    // --- RENDER DYNAMIC CONTENT ---

    // Header & Hero
    const logoContainer = document.getElementById('logo-container');
    if (content.header.logo_type === 'image' && content.header.logo_image) {
        logoContainer.innerHTML = `<img src="${content.header.logo_image}" alt="Logo" class="h-10">`;
    } else {
        logoContainer.textContent = content.header.logo_text;
    }
    setText('hero-title', content.hero.title);
    setText('hero-subtitle', content.hero.subtitle);
    setBg('hero-bg', content.hero.background_image);

    // Problema Section
    render('problema-cards', content.problemas, (item, i) => `
        <div class="bg-white p-8 rounded-xl shadow-lg border border-slate-100 interactive-card text-center" data-aos="fade-up" data-aos-delay="${i * 100}">
            <i class="ph-${item.icon} text-5xl mb-5 text-[var(--accent-terracotta)]"></i>
            <h3 class="text-xl font-bold text-[var(--primary-blue)]">${item.title}</h3>
            <p class="mt-3 text-slate-600">${item.description}</p>
        </div>`);
    
    // About Section
    setText('about-title', content.sobre.title);
    setText('about-name', content.sobre.name);
    setText('about-bio', content.sobre.bio);
    setSrc('about-photo', content.sobre.photo);
    
    // Solutions (Tabs) Section
    const tabsContainer = document.getElementById('tabs-container');
    const tabsContent = document.getElementById('tabs-content');
    if (tabsContainer && tabsContent && content.solutions) {
        const solutions = Object.values(content.solutions);
        tabsContainer.innerHTML = solutions.map(s => `<button data-tab="${s.key}" class="tab-button flex items-center gap-3"><i class="ph-${s.icon} text-xl"></i> ${s.title}</button>`).join('');
        
        const renderTab = key => {
            const s = content.solutions[key];
            tabsContent.innerHTML = `<h3 class="text-2xl font-bold text-[var(--primary-blue)]">${s.title}</h3><p class="mt-4 text-slate-700 leading-relaxed">${s.description}</p><ul class="mt-6 space-y-3">${s.deliverables.map(d => `<li class="flex items-start"><i class="ph-check-circle text-xl mr-3 mt-0.5 text-[var(--accent-terracotta)]"></i><span>${d}</span></li>`).join('')}</ul>`;
        };

        tabsContainer.addEventListener('click', e => {
            const btn = e.target.closest('.tab-button');
            if (btn) {
                tabsContainer.querySelector('.active')?.classList.remove('active');
                btn.classList.add('active');
                renderTab(btn.dataset.tab);
            }
        });
        tabsContainer.querySelector('.tab-button').click(); // Activate first tab
    }
    
    // Portfolio Section
    if (portfolioData?.items) {
        render('portfolio-grid', portfolioData.items, item => `
            <div class="group relative overflow-hidden rounded-lg shadow-lg interactive-card" data-aos="zoom-in-up">
                <img src="${item.image}" alt="${item.title}" class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6">
                    <span class="text-sm font-semibold uppercase tracking-wider rounded-full bg-[var(--accent-terracotta)]/90 px-3 py-1 text-white">${item.category}</span>
                    <h3 class="text-xl font-bold text-white mt-2">${item.title}</h3>
                </div>
            </div>`);
    }

    // Timeline Section
    render('timeline-content', content.timeline, (item, i) => `
        <div class="relative pl-12 pb-8" data-aos="fade-up">
            <div class="timeline-item"></div>
            <div class="bg-white p-6 rounded-lg shadow-md border border-slate-100">
                <h3 class="text-xl font-bold text-[var(--primary-blue)]">${item.title}</h3>
                <p class="text-slate-600 mt-2">${item.description}</p>
            </div>
        </div>`);

    // Guarantees Section
    render('garantia-cards', content.guarantees, (item, i) => `
        <div class="bg-white/10 p-8 rounded-lg interactive-card backdrop-blur-sm border border-white/20" data-aos="fade-up" data-aos-delay="${i*100}">
            <i class="ph-${item.icon} text-[var(--accent-terracotta)] text-5xl mb-5 inline-block"></i>
            <h3 class="font-bold text-xl text-white">${item.title}</h3>
            <p class="mt-3 text-slate-300">${item.description}</p>
        </div>`);

    // Packages Section
    render('packages-container', content.packages, (pkg, i) => `
        <div class="relative bg-white p-8 rounded-xl shadow-lg border-2 ${pkg.recommended ? 'border-[var(--accent-terracotta)]' : 'border-slate-100'} flex flex-col interactive-card" data-aos="fade-up" data-aos-delay="${i*100}">
            ${pkg.recommended ? '<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[var(--accent-terracotta)] text-white text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recomendado</div>' : ''}
            <div class="flex-grow">
                <h3 class="text-2xl font-bold package-name text-[var(--primary-blue)]">${pkg.name}</h3>
                <p class="mt-2 text-slate-500 h-12">${pkg.description}</p>
                <p class="text-4xl font-extrabold my-6 text-[var(--primary-blue)]">R$ ${pkg.price}</p>
                <ul class="space-y-3 text-slate-700 text-left">${(pkg.features || []).map(f => `<li class="flex items-start"><i class="ph-check-circle text-green-500 text-xl mr-2 mt-0.5"></i><span>${f}</span></li>`).join('')}</ul>
            </div>
            <button class="select-plan-btn w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors ${pkg.recommended ? 'bg-[var(--accent-terracotta)] text-white hover:brightness-110' : 'bg-slate-200 text-slate-800 hover:bg-slate-300'} cursor-pointer flex items-center justify-center gap-2">
                <span>Selecionar Plano</span>
                <i class="ph-arrow-right text-xl"></i>
            </button>
        </div>`);

    // FAQ Section
    render('faq-container', content.faq, (item) => `
        <div class="faq-item bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
            <div class="faq-header p-5 flex justify-between items-center cursor-pointer">
                <h4 class="font-semibold text-lg text-[var(--primary-blue)]">${item.question}</h4>
                <i class="ph-plus faq-icon text-2xl font-light text-[var(--accent-terracotta)]"></i>
            </div>
            <div class="faq-content px-5"><p class="pb-5 text-slate-600">${item.answer}</p></div>
        </div>`);

    document.querySelectorAll('.faq-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasOpen = item.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach(openItem => {
                openItem.classList.remove('open');
            });

            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });

    // --- INTERACTIVITY ---

    // Mobile Menu
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    mobileMenu.innerHTML = document.getElementById('nav-links').innerHTML.replace(/space-x-8/g, 'flex flex-col gap-6 text-xl') + `<a href="#contato" class="cta-button font-medium py-3 px-8 mt-4">Contato</a>`;
    
    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.className = isHidden ? 'ph-list text-3xl' : 'ph-x text-3xl';
        document.body.classList.toggle('overflow-hidden', !isHidden);
    };

    menuButton.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));
    
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

    const closeModal = () => modal.classList.remove('visible');
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
});
