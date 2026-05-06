document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIKA AMPLOP ZOOM IN ---
    const btnBuka = document.getElementById('btn-buka');
    const coverScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-invitation');
    const bgMusic = document.getElementById('bg-music');
    const flap = document.querySelector('.flap');
    const letter = document.querySelector('.letter');

    if (btnBuka) {
        btnBuka.addEventListener('click', function() {
            // Mainkan lagu & sembunyikan tombol
            bgMusic.play();
            btnBuka.style.opacity = '0';
            btnBuka.style.pointerEvents = 'none';
            
            // 1. Buka tutup amplop
            flap.classList.add('open');
            
            // 2. Tarik kertas ke atas (jeda 0.6 detik)
            setTimeout(() => { 
                letter.classList.add('pull-out'); 
            }, 600);
            
            // 3. Kertas membesar (Zoom-In) & background amplop memudar
            setTimeout(() => { 
                letter.classList.add('zoom-in');
                coverScreen.style.opacity = '0'; 
            }, 1600); // Mulai membesar setelah kertas selesai ditarik

            // 4. Munculkan isi undangan utama
            setTimeout(() => { 
                mainContent.classList.remove('hidden');
            }, 2000);
            
            // 5. Buang layar amplop agar bisa di-scroll
            setTimeout(() => { 
                coverScreen.style.display = 'none'; 
            }, 2600);
        });
    }

    // --- 2. LOGIKA EFEK SCROLL ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const colorObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('colored');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-color');
    revealElements.forEach(el => {
        colorObserver.observe(el);
    });

});