document.addEventListener('DOMContentLoaded', async () => {
    AOS.init({ duration: 800, once: true, offset: 50 });

    const header = document.getElementById('main-header');
    
    // --- HEADER SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // --- DATA FETCHING ---
    async function fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        document.body.innerHTML = "<h1>Erro ao carregar o conteúdo. Tente novamente mais tarde.</h1>";
        return;
    }

    // --- HELPER FUNCTIONS ---
    const render = (el, data, template) => {
        if (el && data) el.innerHTML = Array.isArray(data) ? data.map(template).join('') : template(data);
    };
    const setText = (el, text) => { if (el && text) el.textContent = text; };
    const setBg = (el, url) => { if (el && url) el.style.backgroundImage = `url(${url})`; };

    // --- RENDER DYNAMIC CONTENT ---

    // Header & Logo
    setText(document.getElementById('logo-container'), content.header.logo_text);

    // Hero & Proposal Card
    setText(document.getElementById('hero-title'), content.hero.title);
    setText(document.getElementById('hero-subtitle'), content.hero.subtitle);
    setBg(document.getElementById('hero-bg'), content.hero.background_image);

    // Dynamic Proposal Data from URL
    const params = new URLSearchParams(window.location.search);
    const clientName = params.get('cliente') || "Prezado(a) Cliente";
    const issueDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(issueDate.getDate() + (content.proposal_details.validity_days || 15));
    
    setText(document.getElementById('client-name'), clientName);
    setText(document.getElementById('proposal-date'), issueDate.toLocaleDateString('pt-BR'));
    setText(document.getElementById('proposal-validity-container').querySelector('h3'), content.proposal_details.validity_text);
    setText(document.getElementById('proposal-validity'), expiryDate.toLocaleDateString('pt-BR'));

    // ROI Table
    const roiTableEl = document.getElementById('roi-table');
    render(roiTableEl, content.value_comparison, (item, i) => `
        <div class="grid grid-cols-3 gap-4 items-center text-center p-4 roi-row" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="font-semibold text-left flex items-center gap-3"><i class="ph-${item.icon} text-2xl text-[var(--primary-blue)]"></i> ${item.criteria}</div>
            <div class="text-red-500 flex items-center justify-center gap-2"><i class="ph-x-circle text-xl"></i> ${item.without_professional}</div>
            <div class="text-[var(--accent-emerald)] flex items-center justify-center gap-2"><i class="ph-check-circle text-xl"></i> ${item.with_professional}</div>
        </div>
    `);

    // Solutions Tabs
    const tabsContainer = document.getElementById('tabs-container');
    const tabsContent = document.getElementById('tabs-content');
    if (tabsContainer && tabsContent && content.solutions) {
        const solutions = Object.values(content.solutions);
        render(tabsContainer, solutions, s => `<div data-key="${s.title.replace(/\s+/g, '-')}" class="tab-card"><i class="ph-${s.icon} text-4xl mb-2 inline-block"></i><h4 class="font-bold">${s.title}</h4></div>`);

        const renderTabContent = (key) => {
            const solutionData = solutions.find(s => s.title.replace(/\s+/g, '-') === key);
            render(tabsContent, solutionData, s => `
                <h3 class="text-2xl font-bold text-[var(--primary-blue)]">${s.title}</h3>
                <p class="mt-4 text-slate-700 leading-relaxed">${s.description}</p>
                <ul class="mt-6 grid sm:grid-cols-2 gap-3">${s.deliverables.map(d => `<li class="flex items-start"><i class="ph-check-circle text-xl mr-3 mt-0.5 text-[var(--accent-emerald)]"></i><span>${d}</span></li>`).join('')}</ul>
            `);
        };

        tabsContainer.addEventListener('click', e => {
            const tab = e.target.closest('.tab-card');
            if (tab) {
                tabsContainer.querySelector('.active')?.classList.remove('active');
                tab.classList.add('active');
                renderTabContent(tab.dataset.key);
            }
        });
        tabsContainer.querySelector('.tab-card').click();
    }

    // Portfolio
    const portfolioGridEl = document.getElementById('portfolio-grid');
    if (portfolioData && portfolioData.items) {
        render(portfolioGridEl, portfolioData.items, item => `
            <div class="group portfolio-card relative overflow-hidden rounded-lg shadow-lg" data-aos="fade-up">
                <img src="${item.image}" alt="${item.title}" class="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div class="absolute bottom-0 left-0 p-6">
                    <h3 class="text-xl font-bold text-white mt-2">${item.title}</h3>
                    <span class="text-sm font-semibold uppercase tracking-wider text-slate-300">${item.category}</span>
                </div>
            </div>`);
    }


    // Packages
    const packagesContainerEl = document.getElementById('packages-container');
    render(packagesContainerEl, content.packages, (pkg, i) => `
        <div class="package-card relative bg-white p-8 rounded-xl shadow-lg border-2 ${pkg.recommended ? 'recommended' : 'border-slate-100'} flex flex-col" data-aos="fade-up" data-aos-delay="${i*100}">
            ${pkg.recommended ? '<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[var(--accent-emerald)] text-white text-sm font-bold px-4 py-1 rounded-full uppercase tracking-wider">Recomendado</div>' : ''}
            <div class="flex-grow">
                <h3 class="text-2xl font-bold package-name text-[var(--primary-blue)]">${pkg.name}</h3>
                <p class="mt-2 text-slate-500 h-12">${pkg.description}</p>
                <p class="text-4xl font-extrabold my-6 text-[var(--primary-blue)]">R$ ${pkg.price}</p>
                <ul class="space-y-3 text-slate-700 text-left">${pkg.features.map(f => `<li class="flex items-start"><i class="ph-check-circle text-green-500 text-xl mr-2 mt-0.5"></i><span>${f}</span></li>`).join('')}</ul>
            </div>
            <button class="w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors cta-button">
                <span>Selecionar Plano</span>
            </button>
        </div>`);

    // FAQ
    const faqContainerEl = document.getElementById('faq-container');
    render(faqContainerEl, content.faq, item => `
        <div class="faq-item bg-white rounded-lg shadow-sm overflow-hidden border border-slate-200">
            <div class="faq-header p-5 flex justify-between items-center cursor-pointer">
                <h4 class="font-semibold text-lg text-[var(--primary-blue)]">${item.question}</h4>
                <i class="ph-plus faq-icon text-2xl font-light text-[var(--accent-emerald)]"></i>
            </div>
            <div class="faq-content px-5"><div class="pb-5 text-slate-600">${item.answer}</div></div>
        </div>`);
    
    faqContainerEl.addEventListener('click', e => {
        const header = e.target.closest('.faq-header');
        if (header) {
            const item = header.parentElement;
            const wasOpen = item.classList.contains('open');
            faqContainerEl.querySelectorAll('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        }
    });
    
    // --- Mobile Menu ---
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    mobileMenu.innerHTML = document.getElementById('nav-links').innerHTML.replace(/space-x-8/g, 'flex flex-col gap-6 text-xl') + `<a href="#contato" class="cta-button font-medium py-3 px-8 mt-4">Contato</a>`;
    
    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuIcon.className = isHidden ? 'ph-list text-3xl' : 'ph-x text-3xl';
    };

    menuButton.addEventListener('click', toggleMenu);
    mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggleMenu));


    // --- MODAL & FINAL CTA ---
    const modal = document.getElementById('confirmation-modal');
    document.getElementById('accept-proposal-btn').addEventListener('click', () => modal.classList.add('visible'));
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.remove('visible'));
    document.getElementById('download-pdf-btn').addEventListener('click', () => alert("Em um site real, esta ação iniciaria o download de um PDF com a proposta."));

});

