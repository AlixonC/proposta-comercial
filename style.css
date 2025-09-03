:root {
    --primary-blue: #1A3A5A;
    --secondary-gray: #4A4A4A;
    --accent-terracotta: #BF4E30; 
    --light-bg: #F7F9FA;
    --white: #FFFFFF;
    --text-light: #D1D5DB;
}

body { 
    font-family: 'Inter', sans-serif; 
    background-color: var(--white); 
    color: var(--secondary-gray);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* --- Typography --- */
.section-title {
    @apply text-3xl md:text-4xl font-bold text-[var(--primary-blue)];
}
.section-subtitle {
    @apply mt-4 text-lg text-slate-600;
}


/* --- Header --- */
#main-header.scrolled { 
    background-color: rgba(26, 58, 90, 0.85); /* var(--primary-blue) with opacity */
    backdrop-filter: blur(8px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
}
.nav-link { 
    font-weight: 500; 
    transition: color 0.3s; 
    position: relative; 
    padding-bottom: 6px; 
}
#main-header.scrolled .nav-link {
    color: var(--text-light);
}
.nav-link:hover { color: white; }
.nav-link::after { 
    content: ''; 
    position: absolute; 
    bottom: 0; 
    left: 0;
    width: 0; 
    height: 2px; 
    background-color: var(--accent-terracotta);
    transition: width 0.3s ease-out;
}
.nav-link:hover::after, .nav-link.active::after { width: 100%; }


/* --- Buttons --- */
.cta-button, .contact-button { 
    @apply inline-flex items-center justify-center gap-3 font-bold py-3 px-8 rounded-lg transition-all duration-300 ease-in-out shadow-lg;
    background-color: var(--accent-terracotta); 
    color: white; 
}
.cta-button:hover, .contact-button:hover { 
    transform: scale(1.05) translateY(-2px); 
    box-shadow: 0 8px 25px -5px rgba(191, 78, 48, 0.5);
    filter: brightness(1.1);
}

/* --- Cards & Interactive Elements --- */
.interactive-card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.interactive-card:hover { 
    transform: translateY(-8px); 
    box-shadow: 0 20px 40px -15px rgba(26, 58, 90, 0.2); 
}

/* --- Solutions Tabs --- */
.tab-button {
    @apply font-semibold py-3 px-5 rounded-lg border-2 border-slate-200 bg-white text-slate-600;
    transition: all 0.3s ease;
}
.tab-button:hover {
    background-color: var(--light-bg);
    border-color: var(--accent-terracotta);
    color: var(--accent-terracotta);
}
.tab-button.active { 
    border-color: var(--accent-terracotta); 
    background-color: var(--accent-terracotta); 
    color: white; 
    box-shadow: 0 4px 15px rgba(191, 78, 48, 0.3);
}

/* --- Timeline --- */
.timeline-item::before { 
    content: ''; 
    position: absolute; 
    left: -9px; 
    top: 0;
    width: 24px; 
    height: 24px; 
    border-radius: 50%; 
    background-color: var(--light-bg); 
    border: 5px solid var(--primary-blue); 
    z-index: 1;
}

/* --- FAQ --- */
.faq-header { cursor: pointer; }
.faq-icon { transition: transform 0.3s ease-in-out; }
.faq-item.open .faq-icon { transform: rotate(45deg); }
.faq-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out, padding 0.4s ease-in-out;
}
.faq-item.open .faq-content {
    max-height: 200px; /* Adjust as needed */
    padding-top: 0;
    padding-bottom: 1.25rem;
}


/* --- Modal --- */
.modal-overlay { 
    position: fixed; top: 0; left: 0; right: 0; bottom: 0; 
    background: rgba(13, 27, 42, 0.6); /* primary-blue dark */
    display: flex; align-items: center; justify-content: center; 
    z-index: 1000; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
    backdrop-filter: blur(5px);
}
.modal-overlay.visible { opacity: 1; visibility: visible; }
.modal-content { 
    background: white; padding: 2.5rem; border-radius: 0.75rem; width: 90%; max-width: 500px; 
    text-align: center; transform: scale(0.95) translateY(10px); transition: transform 0.3s ease; 
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
}
.modal-overlay.visible .modal-content { transform: scale(1) translateY(0); }
