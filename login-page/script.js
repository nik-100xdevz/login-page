document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    function showForm() {
        const hash = window.location.hash || '#login';
        if (hash === '#login') {
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
        } else if (hash === '#register') {
            registerForm.classList.add('active');
            loginForm.classList.remove('active');
        }
    }

    window.addEventListener('hashchange', showForm);
    showForm();
});
