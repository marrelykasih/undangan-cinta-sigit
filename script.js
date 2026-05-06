document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. LOGIKA AMPLOP ---
    const btnBuka = document.getElementById('btn-buka');
    const coverScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-invitation');
    const bgMusic = document.getElementById('bg-music');
    const flap = document.querySelector('.flap');
    const letter = document.querySelector('.letter');

    if (btnBuka) {
        btnBuka.addEventListener('click', function() {
            bgMusic.play();
            btnBuka.style.opacity = '0';
            btnBuka.style.pointerEvents = 'none';
            flap.classList.add('open');
            
            setTimeout(() => { letter.classList.add('pull-out'); }, 600);
            setTimeout(() => { 
                letter.classList.add('zoom-in');
                coverScreen.style.opacity = '0'; 
            }, 1600); 
            setTimeout(() => { mainContent.classList.remove('hidden'); }, 2000);
            setTimeout(() => { coverScreen.style.display = 'none'; }, 2600);
        });
    }

    // --- 2. LOGIKA LIGHTBOX FOTO GALERI (MEMBESAR SAAT DIKLIK) ---
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.querySelector('.close-lightbox');

    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src; 
            lightbox.classList.add('show'); 
        });
    });

    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('show');
        }
    });

    // --- 3. LOGIKA EFEK SCROLL ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const colorObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('colored');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-color');
    revealElements.forEach(el => { colorObserver.observe(el); });

    // --- 4. LOGIKA COUNTDOWN TIMER ---
    const weddingDate = new Date(2026, 0, 27, 8, 0, 0).getTime(); 

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("hari").innerText = "00";
            document.getElementById("jam").innerText = "00";
            document.getElementById("menit").innerText = "00";
            document.getElementById("detik").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hari").innerText = days < 10 ? "0" + days : days;
        document.getElementById("jam").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("menit").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("detik").innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);

});

// --- 5. LOGIKA SALIN REKENING ---
function copyRekening(elementId) {
    const norek = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(norek).then(() => {
        alert("Nomor rekening " + norek + " berhasil disalin!");
    }).catch(err => {
        alert("Gagal menyalin. Silakan salin manual.");
    });
}