document.addEventListener('DOMContentLoaded', () => {

    const APP_DATA = {
        services: {
            arquitetonico: { title: '1. Projeto Arquitetônico', emoji: '🏠', subtitle: 'A alma do seu espaço, onde seus sonhos tomam forma.', description: 'Criamos espaços que refletem sua personalidade e atendem às suas necessidades, garantindo o máximo de conforto, iluminação e ventilação natural.', deliverables: ['Plantas baixas humanizadas', 'Cortes e fachadas detalhadas', 'Layout de pontos elétricos e hidráulicos', 'Modelo 3D para visualização'] },
            estrutural: { title: '2. Projeto Estrutural', emoji: '🏗️', subtitle: 'A base sólida que garante a segurança e a durabilidade.', description: 'Garantimos a segurança e a longevidade da sua construção, otimizando o uso de materiais para que você economize sem abrir mão da qualidade.', deliverables: ['Plantas de formas', 'Detalhamento de pilares, vigas, lajes e fundações', 'Lista de materiais (aço e concreto)'] },
            hidrossanitario: { title: '3. Projeto Hidrossanitário', emoji: '💧', subtitle: 'Saúde e conforto para o seu dia a dia.', description: 'Planejamos sistemas eficientes de água e esgoto para garantir o funcionamento perfeito da sua casa, evitando entupimentos e vazamentos futuros.', deliverables: ['Plantas de distribuição de água fria e quente', 'Isométricos para fácil execução', 'Detalhamento de caixas e esgoto', 'Lista de materiais'] },
            eletrico: { title: '4. Projeto Elétrico', emoji: '⚡', subtitle: 'A energia que dá vida ao seu lar, com total segurança.', description: 'Dimensionamos uma instalação elétrica segura e eficiente, prevendo o uso de todos os seus equipamentos para evitar sobrecargas ou falta de tomadas.', deliverables: ['Plantas de pontos de iluminação e tomadas', 'Diagramas dos quadros de distribuição', 'Detalhamento de eletrodutos e fiação', 'Lista de materiais'] }
        },
        packages: [
            { name: 'Pacote Essencial', description: 'O ponto de partida seguro para sua construção.', price: '4.500,00', features: ['Projeto Arquitetônico', 'Projeto Estrutural'], recommended: false },
            { name: 'Pacote Integrado', description: 'A solução completa para uma obra sem dor de cabeça.', price: '8.000,00', features: ['Todos os itens do Pacote Essencial', 'Projeto Hidrossanitário', 'Projeto Elétrico', 'Análise de Compatibilização 3D'], recommended: true },
            { name: 'Pacote Premium', description: 'A experiência definitiva em personalização e acompanhamento.', price: '12.500,00', features: ['Todos os itens do Pacote Integrado', 'Projeto de Luminotecnia', 'Detalhamento de Interiores', 'Visitas Técnicas de Acompanhamento'], recommended: false }
        ],
        deliverables: [
            // Usando as imagens que você enviou!
            { image: 'imagens/detalhamento-sapatas.jpg', title: 'Detalhamento de Sapatas', category: 'estrutural' },
            { image: 'imagens/entregavel-vigas.jpg', title: 'Detalhamento de Vigas', category: 'estrutural' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Planta+Humanizada', title: 'Planta Baixa Humanizada', category: 'arquitetonico' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Cortes+3D', title: 'Cortes e Vistas 3D', category: 'arquitetonico' },
            { image: 'https://placehold.co/800x600/1e293b/white?text=Elétrico', title: 'Projeto Elétrico', category: 'eletrico' },
            { image: 'https://placehold.co/800x600/1e293b/white?text=Diagrama', title: 'Diagrama Unifilar', category: 'eletrico' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Isométrico', title: 'Isométrico Hidráulico', category: 'hidrossanitario' },
            { image: 'https://placehold.co/800x600/027a7e/white?text=Esgoto', title: 'Planta de Esgoto', category: 'hidrossanitario' }
        ],
        // ... (resto dos dados como portfolio, timeline, etc)
    };
    
    // Função para inicializar os elementos básicos da UI
    function initUI() {
        // ... (código para data, nome do cliente, header com scroll, botão de topo)
    }

    // Função para configurar o menu mobile
    function setupMobileMenu() {
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const iconOpen = document.getElementById('menu-icon-open');
        const iconClose = document.getElementById('menu-icon-close');

        menuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            iconOpen.classList.toggle('hidden');
            iconClose.classList.toggle('hidden');
            document.body.classList.toggle('overflow-hidden'); // Trava o scroll do corpo
        });

        // Fecha o menu ao clicar em um link
        mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                iconOpen.classList.remove('hidden');
                iconClose.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }
    
    // Função para as abas de "Soluções"
    function setupTabs() {
        const tabsContainer = document.getElementById('tabs-container');
        const tabsContent = document.getElementById('tabs-content');
        if (!tabsContainer) return;

        // Renderiza os botões das abas
        tabsContainer.innerHTML = Object.keys(APP_DATA.services).map(key => {
            const service = APP_DATA.services[key];
            return `<button data-tab="${key}" class="tab-button flex items-center gap-2 text-sm md:text-base font-medium py-2 px-4 rounded-lg border-2 border-transparent hover:border-teal-600 transition">
                        <span class="text-xl">${service.emoji}</span> ${service.title.substring(3)}
                    </button>`;
        }).join('');

        const tabButtons = tabsContainer.querySelectorAll('.tab-button');
        
        const renderContent = (key) => {
            const service = APP_DATA.services[key];
            tabsContent.innerHTML = `
                <h3 class="text-2xl font-bold text-teal-800">${service.title}</h3>
                <p class="mt-1 text-slate-500 italic">${service.subtitle}</p>
                <p class="mt-4 text-slate-700">${service.description}</p>
                <p class="mt-6 font-semibold">O que você recebe:</p>
                <ul class="mt-2 space-y-2 list-disc list-inside text-slate-700">${service.deliverables.map(item => `<li>${item}</li>`).join('')}</ul>`;
        };
        
        tabsContainer.addEventListener('click', e => {
            const button = e.target.closest('.tab-button');
            if (button) {
                tabsContainer.querySelector('.active')?.classList.remove('active');
                button.classList.add('active');
                renderContent(button.dataset.tab);
            }
        });

        // Ativa a primeira aba por padrão
        tabButtons[0].classList.add('active');
        renderContent(tabButtons[0].dataset.tab);
    }
    
    // Função para os pacotes
    function setupPackages() {
        const container = document.getElementById('packages-container');
        if (!container) return;
        
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

        APP_DATA.packages.forEach((pkg, index) => {
            const card = document.createElement('div');
            card.className = 'package-card cursor-pointer bg-white p-8 rounded-lg shadow-lg border-2 border-transparent transition-all duration-300 flex flex-col';
            if (pkg.recommended) card.classList.add('relative');
            
            let featuresHtml = pkg.features.map(feature => `<li class="flex items-start"><span class="text-green-500 mr-2 mt-1">✔</span><span>${feature}</span></li>`).join('');
            
            card.innerHTML = `
                ${pkg.recommended ? '<div class="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-teal-600 text-white text-sm font-bold px-4 py-1 rounded-full">RECOMENDADO</div>' : ''}
                <div class="flex-grow">
                    <h3 class="text-2xl font-bold">${pkg.name}</h3>
                    <p class="mt-2 text-slate-500 h-12">${pkg.description}</p>
                    <p class="text-4xl font-extrabold my-6">R$ ${pkg.price}</p>
                    <ul class="space-y-3 text-slate-700 text-left">${featuresHtml}</ul>
                </div>
                <button class="w-full mt-8 py-3 px-6 rounded-lg font-semibold transition-colors duration-300 hover:bg-slate-300">Selecionar Plano</button>
            `;
            
            card.addEventListener('click', () => updateSelection(index));
            container.appendChild(card);
        });

        const recommendedIndex = APP_DATA.packages.findIndex(p => p.recommended);
        updateSelection(recommendedIndex > -1 ? recommendedIndex : 0);
    }

    // Inicializa todos os módulos
    initUI();
    setupMobileMenu();
    setupTabs();
    setupPackages();
    // ... chame aqui as outras funções de setup (portfolio, timeline, etc.)
});