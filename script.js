document.addEventListener('DOMContentLoaded', () => {

    // =================================================================================
    // CENTRAL DE DADOS DA APLICAÇÃO
    // Todo o conteúdo do site está aqui para facilitar a manutenção.
    // =================================================================================
    const APP_DATA = {
        problemas: [
            { emoji: '💸', title: 'O Orçamento que Sangra', color: 'red', description: 'Cada incompatibilidade descoberta na obra vira um remendo caro. É o desperdício de material, o pagamento de mão de obra extra e a certeza de que o custo final será muito maior que o planejado.' },
            { emoji: '⏳', title: 'O Cronograma Destruído', color: 'yellow', description: 'A obra que se arrasta, os prazos estourados e a frustração de ver o sonho ser adiado. O retrabalho não consome apenas dinheiro, ele rouba seu tempo e sua paz.' },
            { emoji: '🤯', title: 'O Estresse que Não Acaba', color: 'orange', description: 'Conflitos com pedreiros, decisões tomadas sob pressão e a constante preocupação com a segurança da estrutura. Seu sonho não pode se transformar em um pesadelo.' }
        ],
        services: {
            arquitetonico: { title: '1. Projeto Arquitetônico', emoji: '🏠', subtitle: 'A alma do seu espaço, onde seus sonhos tomam forma.', description: 'Criamos espaços que refletem sua personalidade e atendem às suas necessidades, garantindo o máximo de conforto, iluminação e ventilação natural.', deliverables: ['Plantas baixas humanizadas', 'Cortes e fachadas detalhadas', 'Layout de pontos elétricos e hidráulicos', 'Modelo 3D para visualização'] },
            estrutural: { title: '2. Projeto Estrutural', emoji: '🏗️', subtitle: 'A base sólida que garante a segurança e a durabilidade.', description: 'Garantimos a segurança e a longevidade da sua construção, otimizando o uso de materiais para que você economize sem abrir mão da qualidade.', deliverables: ['Plantas de formas', 'Detalhamento de pilares, vigas, lajes e fundações', 'Lista de materiais (aço e concreto)'] },
            hidrossanitario: { title: '3. Projeto Hidrossanitário', emoji: '💧', subtitle: 'Saúde e conforto para o seu dia a dia.', description: 'Planejamos sistemas eficientes de água e esgoto para garantir o funcionamento perfeito da sua casa, evitando entupimentos e vazamentos futuros.', deliverables: ['Plantas de distribuição de água fria e quente', 'Isométricos para fácil execução', 'Detalhamento de caixas e esgoto', 'Lista de materiais'] },
            eletrico: { title: '4. Projeto Elétrico', emoji: '⚡', subtitle: 'A energia que dá vida ao seu lar, com total segurança.', description: 'Dimensionamos uma instalação elétrica segura e eficiente, prevendo o uso de todos os seus equipamentos para evitar sobrecargas ou falta de tomadas.', deliverables: ['Plantas de pontos de iluminação e tomadas', 'Diagramas dos quadros de distribuição', 'Detalhamento de eletrodutos e fiação', 'Lista de materiais'] }
        },
        portfolio: [
            { image: 'https://placehold.co/600x400/0d9488/white?text=Portfolio+1', title: 'Casa Contemporânea', category: 'residencial' },
            { image: 'https://placehold.co/600x400/1e293b/white?text=Portfolio+2', title: 'Escritório Moderno', category: 'comercial' },
            { image: 'https://placehold.co/600x400/0d9488/white?text=Portfolio+3', title: 'Reforma de Apartamento', category: 'residencial' },
            { image: 'https://placehold.co/600x400/1e293b/white?text=Portfolio+4', title: 'Galpão Industrial', category: 'comercial' },
            { image: 'https://placehold.co/600x400/0d9488/white?text=Portfolio+5', title: 'Casa de Campo', category: 'residencial' },
            { image: 'https://placehold.co/600x400/1e293b/white?text=Portfolio+6', title: 'Loja Conceito', category: 'comercial' }
        ],
        timeline: [
            { title: 'Etapa 1: Briefing e Análise', description: 'Entendemos suas necessidades, desejos e orçamento para criar a base do projeto.' },
            { title: 'Etapa 2: Estudo Preliminar e 3D', description: 'Desenvolvemos as primeiras ideias e modelos 3D para visualização e aprovação.' },
            { title: 'Etapa 3: Projeto Executivo', description: 'Detalhamos todos os aspectos técnicos para a execução da obra sem erros.' },
            { title: 'Etapa 4: Entrega e Suporte', description: 'Entregamos todos os projetos e permanecemos disponíveis para esclarecer dúvidas.' }
        ],
        deliverables: [
            { image: 'imagens/detalhamento-sapatas.jpg', title: 'Detalhamento de Sapatas', category: 'estrutural' },
            { image: 'imagens/entregavel-vigas.jpg', title: 'Detalhamento de Vigas', category: 'estrutural' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Planta+Humanizada', title: 'Planta Baixa Humanizada', category: 'arquitetonico' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Cortes+3D', title: 'Cortes e Vistas 3D', category: 'arquitetonico' },
            { image: 'https://placehold.co/800x600/1e293b/white?text=Elétrico', title: 'Projeto Elétrico', category: 'eletrico' },
            { image: 'https://placehold.co/800x600/1e293b/white?text=Diagrama', title: 'Diagrama Unifilar', category: 'eletrico' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Isométrico', title: 'Isométrico Hidráulico', category: 'hidrossanitario' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Esgoto', title: 'Planta de Esgoto', category: 'hidrossanitario' }
        ],
        garantias: [
            { title: '✓ Garantia de Compatibilidade', description: 'Asseguramos que todos os projetos (arquitetônico, estrutural, elétrico e hidráulico) são 100% compatíveis, eliminando surpresas e retrabalho na obra.' },
            { title: '✓ Compromisso com Prazos', description: 'Respeitamos o cronograma acordado. A sua obra não pode esperar, e nós levamos isso a sério, garantindo a entrega pontual de todas as etapas.' },
            { title: '✓ Suporte Técnico Contínuo', description: 'Após a entrega, permanecemos à sua disposição e da sua equipe de construção para esclarecer qualquer dúvida, garantindo uma execução perfeita.' }
        ],
        depoimentos: [
            { text: 'Estávamos com problemas de compatibilização entre a arquitetura e a estrutura. O Alison resolveu tudo de forma brilhante, nos poupando tempo e dinheiro na obra. O profissionalismo superou as expectativas!', author: '- Família Silva, Residência Jequitibá' },
            { text: 'Tínhamos medo de construir, mas o Alison nos deu total segurança. A comunicação foi clara do início ao fim e o resultado foi a casa dos nossos sonhos, sem estouro no orçamento. Serviço impecável.', author: '- João e Maria, Casa do Campo' }
        ],
        packages: [
            { name: 'Pacote Essencial', description: 'O ponto de partida seguro para sua construção.', price: '4.500,00', features: ['Projeto Arquitetônico', 'Projeto Estrutural'], recommended: false },
            { name: 'Pacote Integrado', description: 'A solução completa para uma obra sem dor de cabeça.', price: '8.000,00', features: ['Todos os itens do Pacote Essencial', 'Projeto Hidrossanitário', 'Projeto Elétrico', 'Análise de Compatibilização 3D'], recommended: true },
            { name: 'Pacote Premium', description: 'A experiência definitiva em personalização e acompanhamento.', price: '12.500,00', features: ['Todos os itens do Pacote Integrado', 'Projeto de Luminotecnia', 'Detalhamento de Interiores', 'Visitas Técnicas de Acompanhamento'], recommended: false }
        ]
    };

    // =================================================================================
    // FUNÇÕES DE SETUP E RENDERIZAÇÃO
    // Cada função é responsável por uma parte específica do site.
    // =================================================================================

    /**
     * Inicializa elementos básicos da UI como datas, header e botão de scroll.
     */
    function initUI() {
        document.getElementById('proposal-date').textContent = new Date().toLocaleDateString('pt-BR');
        const clientName = new URLSearchParams(window.location.search).get('cliente');
        if (clientName) {
            document.getElementById('client-name').textContent = decodeURIComponent(clientName.replace(/\+/g, ' '));
        }

        const header = document.getElementById('main-header');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        const accordionHeader = document.querySelector('.accordion-header');
        accordionHeader.addEventListener('click', () => {
            document.querySelector('.accordion-content').classList.toggle('hidden');
            document.querySelector('.accordion-icon').classList.toggle('rotate-45');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('main section');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' });
        sections.forEach(section => observer.observe(section));
    }

    /**
     * Configura a funcionalidade do menu mobile (abrir/fechar).
     */
    function setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const iconOpen = document.getElementById('menu-icon-open');
        const iconClose = document.getElementById('menu-icon-close');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    /**
     * Renderiza conteúdo dinâmico em um container específico.
     * @param {string} containerId - O ID do elemento container.
     * @param {Array} data - O array de dados a ser renderizado.
     * @param {Function} renderer - A função que transforma um item de dado em HTML.
     */
    function renderContent(containerId, data, renderer) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = data.map(renderer).join('');
        }
    }
    
    /**
     * Configura o sistema de abas da seção "Soluções".
     */
    function setupTabs() {
        const container = document.getElementById('tabs-container');
        const contentEl = document.getElementById('tabs-content');
        if (!container || !contentEl) return;

        container.innerHTML = Object.keys(APP_DATA.services).map(key => {
            const service = APP_DATA.services[key];
            return `<button data-tab="${key}" class="tab-button flex items-center gap-2 text-sm md:text-base font-medium py-2 px-4 rounded-lg border-2 border-transparent hover:border-teal-600 transition">
                        <span class="text-xl">${service.emoji}</span> ${service.title.substring(3)}
                    </button>`;
        }).join('');
        
        const buttons = container.querySelectorAll('.tab-button');
        const render = (key) => {
            const service = APP_DATA.services[key];
            contentEl.innerHTML = `
                <h3 class="text-2xl font-bold text-teal-800">${service.title}</h3>
                <p class="mt-1 text-slate-500 italic">${service.subtitle}</p>
                <p class="mt-4 text-slate-700">${service.description}</p>
                <p class="mt-6 font-semibold">O que você recebe:</p>
                <ul class="mt-2 space-y-2 list-disc list-inside text-slate-700">${service.deliverables.map(item => `<li>${item}</li>`).join('')}</ul>`;
        };

        container.addEventListener('click', e => {
            const button = e.target.closest('.tab-button');
            if (button) {
                container.querySelector('.active')?.classList.remove('active');
                button.classList.add('active');
                render(button.dataset.tab);
            }
        });
        
        buttons[0].click();
    }

    /**
     * Configura a galeria e os filtros do Portfólio.
     */
    function setupPortfolio() {
        const filtersContainer = document.getElementById('portfolio-filters');
        const gridContainer = document.getElementById('portfolio-grid');
        if (!filtersContainer || !gridContainer) return;

        const categories = ['Todos', ...new Set(APP_DATA.portfolio.map(p => p.category))];
        filtersContainer.innerHTML = categories.map(cat => 
            `<button class="filter-btn bg-white px-4 py-2 rounded-full font-semibold shadow-sm" data-filter="${cat.toLowerCase()}">${cat}</button>`
        ).join('');
        
        const filterBtns = filtersContainer.querySelectorAll('.filter-btn');
        const render = (filter = 'todos') => {
            const data = (filter === 'todos') ? APP_DATA.portfolio : APP_DATA.portfolio.filter(p => p.category === filter);
            renderContent('portfolio-grid', data, item => `
                <div class="portfolio-item bg-white rounded-lg shadow-lg overflow-hidden group h-full transform transition-transform duration-300 hover:scale-105">
                    <div class="overflow-hidden"><img src="${item.image}" alt="${item.title}" class="w-full h-64 object-cover" loading="lazy"></div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold">${item.title}</h3>
                        <p class="text-slate-600 mt-2">Categoria: ${item.category}</p>
                    </div>
                </div>
            `);
        };

        filtersContainer.addEventListener('click', e => {
            const button = e.target.closest('.filter-btn');
            if (button) {
                filtersContainer.querySelector('.active')?.classList.remove('active');
                button.classList.add('active');
                render(button.dataset.filter);
            }
        });

        filtersContainer.querySelector('[data-filter="todos"]').click();
    }
    
    /**
     * Configura e renderiza a timeline de Processo.
     */
    function setupTimeline() {
        const container = document.getElementById('timeline-container');
        if(!container) return;

        container.innerHTML += '<div class="border-l-2 border-dashed border-slate-300 absolute h-full top-0 left-4 md:left-1/2 md:-translate-x-1/2"></div>';
        renderContent('timeline-container', APP_DATA.timeline, (item, index) => {
            const isEven = index % 2 === 0;
            return `
            <div class="relative pl-12 md:pl-0">
                <div class="md:flex ${isEven ? 'md:justify-end' : 'md:justify-start'} md:gap-8">
                    <div class="md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} ${isEven ? '' : 'md:ml-auto'} timeline-item">
                        <h3 class="text-xl font-bold text-teal-800">${item.title}</h3>
                        <p class="text-slate-600">${item.description}</p>
                    </div>
                </div>
            </div>
            `;
        });
    }

    /**
     * Configura o carrossel de Entregáveis.
     */
    function setupDeliverablesCarousel() {
        // Implementação do carrossel aqui...
    }

    /**
     * Configura a seleção de Pacotes.
     */
    function setupPackages() {
        const container = document.getElementById('packages-container');
        if (!container) return;
        
        renderContent('packages-container', APP_DATA.packages, (pkg, index) => `
            <div class="package-card cursor-pointer bg-white p-8 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 flex flex-col ${pkg.recommended ? 'relative' : ''}" data-index="${index}">
                ${pkg.recommended ? '<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm font-bold px-4 py-1 rounded-full">RECOMENDADO</div>' : ''}
                <div class="flex-grow">
                    <h3 class="text-2xl font-bold">${pkg.name}</h3>
                    <p class="mt-2 text-slate-500 h-12">${pkg.description}</p>
                    <p class="text-4xl font-extrabold my-6">R$ ${pkg.price}</p>
                    <ul class="space-y-3 text-slate-700 text-left">${pkg.features.map(f => `<li class="flex items-start"><span class="text-green-500 mr-2 mt-1">✔</span><span>${f}</span></li>`).join('')}</ul>
                </div>
                <button class="w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors duration-300">Selecionar Plano</button>
            </div>
        `);

        const updateSelection = (selectedIndex) => {
            document.querySelectorAll('.package-card').forEach((card, index) => {
                const isSelected = index === selectedIndex;
                card.classList.toggle('selected', isSelected);
                const button = card.querySelector('button');
                button.classList.toggle('bg-teal-600', isSelected);
                button.classList.toggle('text-white', isSelected);
                button.classList.toggle('bg-slate-200', !isSelected);
                button.classList.toggle('text-slate-800', !isSelected);
                button.textContent = isSelected ? 'Plano Selecionado' : 'Selecionar Plano';
            });
        };

        container.addEventListener('click', e => {
            const card = e.target.closest('.package-card');
            if (card) {
                updateSelection(parseInt(card.dataset.index));
            }
        });

        const recommendedIndex = APP_DATA.packages.findIndex(p => p.recommended);
        updateSelection(recommendedIndex > -1 ? recommendedIndex : 0);
    }


    // =================================================================================
    // INICIALIZAÇÃO DA APLICAÇÃO
    // Chama todas as funções de setup para construir a página.
    // =================================================================================
    initUI();
    setupMobileMenu();
    
    // Renderiza o conteúdo estático que vem dos dados
    renderContent('problema-cards', APP_DATA.problemas, item => `
        <div class="bg-white p-8 rounded-lg shadow-lg border-t-4 border-${item.color}-500 transform hover:-translate-y-2 transition-transform duration-300">
            <div class="text-4xl mb-4">${item.emoji}</div>
            <h3 class="text-xl font-bold text-${item.color}-600">${item.title}</h3>
            <p class="mt-2 text-slate-600">${item.description}</p>
        </div>
    `);
    renderContent('garantia-cards', APP_DATA.garantias, item => `
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="font-bold text-xl text-teal-800">${item.title}</h3>
            <p class="mt-2 text-slate-600">${item.description}</p>
        </div>
    `);
    renderContent('depoimentos-grid', APP_DATA.depoimentos, item => `
        <div class="bg-slate-50 p-8 rounded-lg shadow-sm">
            <p class="text-slate-600 italic">"${item.text}"</p>
            <p class="font-bold text-slate-800 mt-4">${item.author}</p>
        </div>
    `);

    // Configura os módulos interativos
    setupTabs();
    setupPortfolio();
    setupTimeline();
    setupPackages();
    // setupDeliverablesCarousel(); // Ativaremos esta função quando o carrossel for implementado
});
