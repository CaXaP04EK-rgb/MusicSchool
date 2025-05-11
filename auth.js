document.addEventListener('DOMContentLoaded', function() {
    const authForm = document.getElementById('authForm');
    const switchToRegister = document.getElementById('switchToRegister');
    let isLoginForm = true;

    // Проверяем сохраненные данные для входа
    checkRememberedUser();

    // Обработка переключения между формами
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        isLoginForm = !isLoginForm;
        updateFormUI();
    });

    // Обработка отправки формы
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        if (!validateEmail(email)) {
            alert('Пожалуйста, введите корректный email');
            return;
        }

        if (isLoginForm) {
            loginUser(email, password, role, rememberMe);
        } else {
            registerUser(email, password, role, rememberMe);
        }
    });

    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Функция обновления интерфейса формы
    function updateFormUI() {
        const header = document.querySelector('.login-header h2');
        const submitBtn = document.querySelector('.login-btn');
        const switchLink = document.getElementById('switchToRegister');

        if (isLoginForm) {
            header.textContent = 'Вход в систему';
            submitBtn.textContent = 'Войти';
            switchLink.textContent = 'Зарегистрироваться';
        } else {
            header.textContent = 'Регистрация';
            submitBtn.textContent = 'Зарегистрироваться';
            switchLink.textContent = 'Войти';
        }
    }

    // Функция проверки запомненного пользователя
    function checkRememberedUser() {
        const rememberedUser = localStorage.getItem('rememberedUser');
        if (rememberedUser) {
            const userData = JSON.parse(rememberedUser);
            document.getElementById('email').value = userData.email;
            document.getElementById('password').value = userData.password;
            document.getElementById('rememberMe').checked = true;
        }
    }

    // Функция входа пользователя
    function loginUser(email, password, role, rememberMe) {
        const usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];
        const user = usersDB.find(u => u.email === email && u.password === password && u.role === role);

        if (user) {
            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({
                    email: email,
                    password: password
                }));
            } else {
                localStorage.removeItem('rememberedUser');
            }

            localStorage.setItem('currentUser', JSON.stringify(user));
            redirectByRole(role);
        } else {
            alert('Неверный email, пароль или роль!');
        }
    }

    // Функция регистрации пользователя
    function registerUser(email, password, role, rememberMe) {
        let usersDB = JSON.parse(localStorage.getItem('usersDB')) || [];

        if (usersDB.some(u => u.email === email)) {
            alert('Пользователь с таким email уже существует!');
            return;
        }

        const userData = {
            email: email,
            password: password,
            role: role,
            createdAt: new Date().toISOString()
        };

        usersDB.push(userData);
        localStorage.setItem('usersDB', JSON.stringify(usersDB));

        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({
                email: email,
                password: password
            }));
        }

        localStorage.setItem('currentUser', JSON.stringify(userData));
        redirectByRole(role);
    }

    // Функция перенаправления по роли
    function redirectByRole(role) {
        switch(role) {
            case 'student':
                window.location.href = 'student.html';
                break;
            case 'teacher':
                window.location.href = 'teacher.html';
                break;
            case 'admin':
                window.location.href = 'admin.html';
                break;
            default:
                window.location.href = 'student.html';
        }
    }
});