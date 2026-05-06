document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. AMBIL NAMA TAMU ---
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    if (guestName) document.getElementById('guest-name').innerText = guestName;

    // --- 2. LOGIKA AMPLOP ---
    const btnBuka = document.getElementById('btn-buka');
    const coverScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('main-invitation');
    const bgMusic = document.getElementById('bg-music');
    const flap = document.querySelector('.flap');
    const letter = document.querySelector('.letter');

    btnBuka.addEventListener('click', function() {
        bgMusic.play();
        btnBuka.style.opacity = '0';
        flap.classList.add('open');
        setTimeout(() => { letter.classList.add('pull-out'); }, 600);
        setTimeout(() => { 
            letter.classList.add('zoom-in');
            coverScreen.style.opacity = '0'; 
        }, 1600); 
        setTimeout(() => { mainContent.classList.remove('hidden'); }, 2000);
        setTimeout(() => { coverScreen.style.display = 'none'; }, 2600);
    });

    // --- 3. RSVP & WISHES (Simpan di browser) ---
    const board = document.getElementById('wishes-board');
    function loadWishes() {
        const saved = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
        board.innerHTML = '';
        saved.forEach(w => {
            const card = document.createElement('div');
            card.className = 'wish-card';
            card.innerHTML = `<h4>${w.nama}</h4><p>${w.pesan}</p>`;
            board.prepend(card);
        });
    }
    loadWishes();

    window.kirimRSVP = function() {
        const n = document.getElementById('nama-rsvp').value;
        const p = document.getElementById('ucapan-rsvp').value;
        const h = document.getElementById('kehadiran-rsvp').value;
        const j = document.getElementById('jumlah-tamu').value || 1;
        if(!n || !p || !h) return alert("Lengkapi data dulu ya!");

        const saved = JSON.parse(localStorage.getItem('wedding_wishes')) || [];
        saved.push({ nama: n, pesan: p });
        localStorage.setItem('wedding_wishes', JSON.stringify(saved));
        loadWishes();

        const wa = "6281234567890"; // GANTI NOMOR WA KAMU DI SINI
        const msg = `Halo, saya *${n}*.\nKonfirmasi: *${h}*\nJumlah: *${j} orang*\n\nUcapan: "${p}"`;
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(msg)}`, '_blank');
        document.getElementById('rsvp-form').reset();
    };

    // --- 4. LIGHTBOX & SCROLL ---
    document.querySelectorAll('.gallery-img, .story-polaroid img').forEach(img => {
        img.onclick = () => {
            document.getElementById('lightbox-img').src = img.src;
            document.getElementById('lightbox').classList.add('show');
        }
    });
    document.querySelector('.close-lightbox').onclick = () => document.getElementById('lightbox').classList.remove('show');

    const obs = new IntersectionObserver((es) => {
        es.forEach(e => { if (e.isIntersecting) e.target.classList.add('colored'); });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-color').forEach(el => obs.observe(el));

    // --- 5. TIMER 2027 ---
    const wed = new Date(2027, 0, 27, 8, 0, 0).getTime(); 
    setInterval(() => {
        const d = wed - new Date().getTime();
        document.getElementById("hari").innerText = Math.floor(d / (1000 * 60 * 60 * 24));
        document.getElementById("jam").innerText = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById("menit").innerText = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));
        document.getElementById("detik").innerText = Math.floor((d % (1000 * 60)) / 1000);
    }, 1000);
});

function copyRekening(id) {
    const t = document.getElementById(id).innerText;
    navigator.clipboard.writeText(t).then(() => alert("Nomor rekening disalin!"));
}