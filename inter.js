document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main-content');
    const footer = document.getElementById('site-footer');
    const gradient = document.querySelector('.gradient-animation');
    // Quando finisce l'animazione del gradiente, mostra contenuto e footer
    gradient.addEventListener('animationend', () => {
        mainContent.classList.add('show');
        footer.classList.add('show');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const rows = document.querySelectorAll('.subtitle-row');
    const body = document.querySelector('body.page-progetti');
    rows.forEach(row => {
        const bgClass = 'bg-' + row.dataset.bg;
        row.addEventListener('mouseenter', () => {
            body.classList.add(bgClass);
        });
        row.addEventListener('mouseleave', () => {
            body.classList.remove(bgClass);
        });
    });
});

const bgLayer = document.getElementById('bg-transition-layer');
document.querySelectorAll('.subtitle-row').forEach((row, index) => {
    row.addEventListener('mouseenter', () => {
        const bg = row.dataset.bg;
        const newImage = `url('assets/covers/${bg}.jpg')`;
        // Applica il fade out
        bgLayer.style.opacity = '0';
        // Dopo che svanisce, cambia immagine e rifai fade in
        setTimeout(() => {
            bgLayer.style.backgroundImage = newImage;
            bgLayer.style.opacity = '1';
        }, 300); // deve essere < del transition delay di background-image
    });
    
    // Click per aprire il progetto
    row.addEventListener('click', () => {
        const details = document.querySelectorAll('.project-details')[index];
        
        if (details.classList.contains('open')) {
            details.classList.remove('open');
        } else {
            // Chiudi tutti gli altri progetti
            document.querySelectorAll('.project-details').forEach(d => d.classList.remove('open'));
            // Apri il progetto corrente
            details.classList.add('open');
            
            // FORZA LO SCROLL IN ALTO - prova tutti i metodi possibili
            setTimeout(() => {
                // Metodo 1: Window scroll
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // Metodo 2: Document scroll
                document.documentElement.scrollTop = 0;
                document.body.scrollTop = 0;
                
                // Metodo 3: Main content scroll (se esiste)
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.scrollTop = 0;
                }
                
                // Metodo 4: Scroll del body se ha classe page-progetti
                const body = document.querySelector('body.page-progetti');
                if (body) {
                    body.scrollTop = 0;
                }
                
            }, 100); // Delay minimo
        }
    });
});