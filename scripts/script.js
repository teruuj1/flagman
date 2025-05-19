document.addEventListener('DOMContentLoaded', function() {
    // Модальное окно
    const modal = document.getElementById('consult-modal');
    const consultBtns = document.querySelectorAll('.consult-btn, .btn-large');
    const closeModal = document.querySelector('.close-modal');

    // Открытие модального окна
    consultBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Отправка формы
    const form = document.getElementById('consult-form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Здесь будет отправка данных
        alert('Спасибо! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.');

        // Закрываем модальное окно
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Очищаем форму
        form.reset();
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