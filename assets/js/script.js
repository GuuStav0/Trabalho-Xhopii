document.addEventListener('DOMContentLoaded', function() {
    const tamanhoOptions = document.querySelectorAll('.tamanho-option');
    const tamanhoSelecionadoText = document.getElementById('tamanho-selecionado-texto');

    const miniaturas = document.querySelectorAll('.miniatura');
    const imagemPrincipal = document.querySelector('.produto-imagem-principal img');
    const produtoImagemPrincipal = document.querySelector('.produto-imagem-prncipa');
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    
    const modeloOptions = document.querySelectorAll('.cor-option');

    function atualizarTamanhoSelecionado(tamanho) {
        tamanhoOptions.forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        tamanhoSelecionadoText.textContent = tamanho;
    }

    tamanhoOptions.forEach(button => {
        button.addEventListener('click', function() {
            atualizarTamanhoSelecionado(this.textContent);
        });
    });

    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            miniaturas.forEach(m => m.classList.remove('active'));
            
            this.classList.add('active');
            
            const novaImagem = this.querySelector('img').src;
            const altText = this.querySelector('img').alt;
            
            imagemPrincipal.src = novaImagem;
            imagemPrincipal.alt = altText;
            
            imagemPrincipal.style.opacity = '0';
            setTimeout(() => {
                imagemPrincipal.style.opacity = '1';
                imagemPrincipal.style.transition = 'opacity 0.3s ease';
                
                lightboxImg.src = novaImagem;
                lightboxImg.alt = altText;
            }, 100);
        });
    });

    modeloOptions.forEach(button => {
        button.addEventListener('click', function() {
            modeloOptions.forEach(btn => {
                btn.classList.remove('active');
            });
            
            this.classList.add('active');
            
            console.log('Modelo selecionado:', this.textContent.trim());
        });
    });
    
    function openLightbox(imgSrc, imgAlt) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = imgAlt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; 
    }
    
    if (imagemPrincipal) {
        imagemPrincipal.addEventListener('click', function() {
            openLightbox(this.src, this.alt);
        });
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
