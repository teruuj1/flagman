document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('consult-modal');
    const consultBtns = document.querySelectorAll('.consult-btn, .btn-large');
    const closeModal = document.querySelector('.close-modal');
    const form = document.getElementById('consult-form');

    consultBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        const fields = form.querySelectorAll('[required]');
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Здесь отправляем форму через EmailJS
            const firstname = form.firstname.value.trim();
            const phone = form.phone.value.trim();

            emailjs.send("service_qi2yy2t", "template_f7tssvg", {
                firstname: firstname,
                phone: phone
            })
                .then(() => {
                    showNotification("Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.");
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    form.reset();
                }, (error) => {
                    console.error("Ошибка:", error);
                    showNotification("Произошла ошибка при отправке заявки.", "error");
                });
        }
    });

    function showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification ' + type; // success or error
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 4000);
    }

    function validateField(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        errorElement.textContent = '';

        // if (!field.value.trim()) {
        //     errorElement.textContent = 'Поле обязательно для заполнения';
        //     return false;
        // }

        if (field.type === 'tel') {
            const phoneRegex = /^(\+7|8)[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
            if (!phoneRegex.test(field.value.trim())) {
                errorElement.textContent = 'Введите корректный номер телефона';
                return false;
            }
        }

        // только буквы и пробелы
        if (field.name === 'firstname') {
            const nameRegex = /^[а-яА-ЯёЁa-zA-Z\s-]{2,50}$/;
            if (!nameRegex.test(field.value.trim())) {
                errorElement.textContent = 'Допустимы только буквы и дефисы (2-50 символов)';
                return false;
            }
        }
        return true;
    }

    document.querySelector('input[type="tel"]').addEventListener('input', function() {
        let x = this.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
        this.value = '+7' + (x[2] ? ' (' + x[2] : '') + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });

    document.querySelectorAll('#consult-form input').forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});