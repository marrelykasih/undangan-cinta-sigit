document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. AMBIL NAMA TAMU DARI URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) {
        document.getElementById('guest-name').innerText = guestName;
    }

    // --- 2. LOGIKA AMPLOP ---
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

    // --- 3. LOGIKA PESAN (LOCAL STORAGE) ---
    const wishesBoard = document.getElementById('wishes-board');
    
    function loadWishes() {
        const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
        savedWishes.forEach(wish => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<h4>${wish.nama}</h4><p>${wish.pesan}</p>`;
            wishesBoard.prepend(card); // Masukin di atas
        });
    }
    loadWishes();

    window.kirimRSVP = function() {
        const nama = document.getElementById('nama-rsvp').value;
        const ucapan = document.getElementById('ucapan-rsvp').value;
        const hadir = document.getElementById('kehadiran-rsvp').value;
        const jumlah = document.getElementById('jumlah-tamu').value || 1;

        if(!nama || !ucapan || !hadir) {
            alert("Mohon lengkapi data nama, ucapan, dan kehadiran ya!");
            return;
        }

        // Simpan ucapan ke LocalStorage biar ga hilang di browser ini
        const savedWishes = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
        savedWishes.push({ nama: nama, pesan: ucapan });
        localStorage.setItem('wedding_wishes', JSON.stringify(savedWishes));
        
        // Tampilkan langsung di layar
        const card = document.createElement('div');
        card.className = 'wish-card';
        card.innerHTML = `<h4>${nama}</h4><p>${ucapan}</p>`;
        wishesBoard.prepend(card);

        // Kirim ke WhatsApp
        const nomorWA = "6281234567890"; // GANTI NOMOR WA DISINI
        const teksWA = `Halo, saya *${nama}*.\nKonfirmasi: *${hadir}*\nJumlah Tamu: *${jumlah} orang*\n\nUcapan: "${ucapan}"`;
        window.open(`https://wa.me/${nomorWA}?text=${encodeURIComponent(teksWA)}`, '_blank');

        // Reset form
        document.getElementById('rsvp-form').reset();
    };

    // --- 4. LOGIKA LIGHTBOX FOTO GALERI ---
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

    // --- 5. LOGIKA EFEK SCROLL ---
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

    // --- 6. LOGIKA COUNTDOWN TIMER ---
    const weddingDate = new Date(2027, 0, 27, 8, 0, 0).getTime(); 

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

// --- 7. LOGIKA SALIN REKENING ---
function copyRekening(elementId) {
    const norek = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(norek).then(() => {
        alert("Nomor rekening " + norek + " berhasil disalin!");
    }).catch(err => {
        alert("Gagal menyalin. Silakan salin manual.");
    });
}