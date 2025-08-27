document.addEventListener('DOMContentLoaded', () => {

    // Central de Dados da Aplicação
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
            { text: '"Estávamos com problemas de compatibilização entre a arquitetura e a estrutura. O Alison resolveu tudo de forma brilhante, nos poupando tempo e dinheiro na obra. O profissionalismo superou as expectativas!"', author: '- Família Silva, Residência Jequitibá' },
            { text: '"Tínhamos medo de construir, mas o Alison nos deu total segurança. A comunicação foi clara do início ao fim e o resultado foi a casa dos nossos sonhos, sem estouro no orçamento. Serviço impecável."', author: '- João e Maria, Casa do Campo' }
        ],
        packages: [
            { name: 'Pacote Essencial', description: 'O ponto de partida seguro para sua construção.', price: '4.500,00', features: ['Projeto Arquitetônico', 'Projeto Estrutural'], recommended: false },
            { name: 'Pacote Integrado', description: 'A solução completa para uma obra sem dor de cabeça.', price: '8.000,00', features: ['Todos os itens do Pacote Essencial', 'Projeto Hidrossanitário', 'Projeto Elétrico', 'Análise de Compatibilização 3D'], recommended: true },
            { name: 'Pacote Premium', description: 'A experiência definitiva em personalização e acompanhamento.', price: '12.500,00', features: ['Todos os itens do Pacote Integrado', 'Projeto de Luminotecnia', 'Detalhamento de Interiores', 'Visitas Técnicas de Acompanhamento'], recommended: false }
        ]
    };
    
    // Função para inicializar os elementos básicos da UI
    function initUI() {
        // Data e Nome do Cliente
        document.getElementById('proposal-date').textContent = new Date().toLocaleDateString('pt-BR');
        const clientName = new URLSearchParams(window.location.search).get('cliente');
        if (clientName) {
            document.getElementById('client-name').textContent = decodeURIComponent(clientName.replace(/\+/g, ' '));
        }

        // Header com sombra no scroll
        const header = document.getElementById('main-header');
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 10);
            scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
        });
        scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        // Acordeão
        const accordionHeader = document.querySelector('.accordion-header');
        accordionHeader.addEventListener('click', () => {
            document.querySelector('.accordion-content').classList.toggle('hidden');
            document.querySelector('.accordion-icon').classList.toggle('rotate-45');
        });

        // Navegação ativa com scroll
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

    // Função para renderizar conteúdo dinâmico
    function renderContent(containerId, data, renderer) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = data.map(renderer).join('');
        }
    }

    // Demais funções de setup (abas, portfólio, etc.)
    function setupAllModules() {
        // Renderiza seções dinâmicas
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
        // ... (outras renderizações)
    }


    // Inicializa todos os módulos da página
    initUI();
    setupMobileMenu();
    setupAllModules();
    // Adicione aqui as funções específicas que precisam de mais lógica, como setupTabs, setupPortfolio, setupPackages, etc.
});
