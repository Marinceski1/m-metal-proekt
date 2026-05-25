document.addEventListener('DOMContentLoaded', () => {
    
    // 1. МОБИЛНО ХАМБУРГЕР МЕНИ
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            setTimeout(checkScroll, 300);
        });
    });

    // 2. СУПТИЛНИ АНИМАЦИИ ПРИ СКРОЛАЊЕ (SCROLL REVEAL)
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.9;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if(elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // 3. ИНТЕРАКТИВЕН ФИЛТЕР ЗА ПРОИЗВОДИ (TABS)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const productCards = document.querySelectorAll('.product-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');

            productCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    if (filterValue === 'all' || card.classList.contains(filterValue)) {
                        card.classList.remove('hide');
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        card.classList.add('hide');
                    }
                }, 200);
            });
        });
    });

    // 4. ПОП-АП ПРЕГЛЕД НА СЛИКИ (LIGHTBOX МОДАЛ)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.lightbox-close');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlayText = item.querySelector('.gallery-overlay h4').innerText;
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxCaption.innerText = overlayText; 
        });
    });

    if(closeLightbox) {
        closeLightbox.addEventListener('click', () => lightbox.style.display = 'none');
    }
    if(lightbox) {
        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) lightbox.style.display = 'none';
        });
    }

    // 5. МОЌНО И НЕВИДЛИВО ПРАЌАЊЕ ПРЕКУ WEB3FORMS (AJAX БЕЗ РЕФРЕШ)
    const form = document.getElementById('contact-form-web3');
    const button = document.getElementById('submit-btn');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            button.innerText = "Се испраќа...";
            button.disabled = true;

            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let res = await response.json();
                if (response.status == 200) {
                    alert("Ви благодариме! Вашата порака е успешно испратена.");
                    form.reset();
                } else {
                    console.log(response);
                    alert("Настана грешка. Ве молиме обидете се повторно.");
                }
            })
            .catch(error => {
                console.log(error);
                alert("Настана грешка. Ве молиме обидете се повторно.");
            })
            .finally(() => {
                button.innerHTML = 'Испрати Порака <i class="fa-solid fa-paper-plane" style="margin-left: 8px;"></i>';
                button.disabled = false;
            });
        });
    }
});