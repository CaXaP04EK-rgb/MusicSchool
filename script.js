document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('DOMContentLoaded', function() {
                const loginBtn = document.getElementById('login-btn');
                
                loginBtn.addEventListener('click', function() {
                    const username = document.getElementById('username').value.trim();
                    const password = document.getElementById('password').value;
                    const role = document.getElementById('user-role').value;
                    
                    if (!username || !password || !role) {
                        alert('Пожалуйста, заполните все поля');
                        return;
                    }
                    
                    // Сохраняем данные пользователя
                    const userData = {
                        username: username,
                        role: role,
                        timestamp: new Date().getTime()
                    };
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    
                    // Перенаправление по ролям
                    switch(role) {
                        case 'teacher':
                            window.location.href = 'teacher.html';
                            break;
                        case 'admin':
                            window.location.href = 'admin.html';
                            break;
                        case 'student':
                            window.location.href = 'student.html';
                            break;
                        case 'director':
                            window.location.href = 'director.html';
                            break;
                        default:
                            alert('Неизвестная роль');
                    }
                });
            });
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const role = document.getElementById('user-role').value;
        
        if (username && password) {
            // Сохраняем данные пользователя в localStorage
            const userData = {
                username: username,
                role: role,
                department: getDepartmentByRole(role),
                timestamp: new Date().getTime()
            };
            localStorage.setItem('currentUser', JSON.stringify(userData));
            
            // Перенаправляем в зависимости от роли
            switch(role) {
                case 'teacher':
                    window.location.href = 'teacher.html';
                    break;
                case 'admin':
                    window.location.href = 'admin.html';
                    break;
                case 'student':
                    window.location.href = 'student.html';
                    break;
                case 'director':
                    window.location.href = 'director.html';
                    break;
                default:
                    alert('Неизвестная роль пользователя');
            }
        } else {
            alert('Пожалуйста, заполните все поля');
        }
    });
    
    function getDepartmentByRole(role) {
        // В реальном приложении это должно приходить с сервера
        if (role === 'teacher' || role === 'student') {
            return 'Фортепиано'; // Пример, можно сделать выбор
        }
        return null;
    }
});
        const loginForm = document.getElementById('login-form');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const role = document.getElementById('user-role').value;
            
            if (username) {
                if (role === 'teacher') {
                    // Сохраняем данные учителя
                    const teacherData = {
                        name: username,
                        role: 'teacher',
                        department: 'Фортепиано'
                    };
                    localStorage.setItem('teacherData', JSON.stringify(teacherData));
                    
                    // Перенаправляем на страницу учителя
                    window.location.href = 'teacher.html';
                } else {
                    // Логика для других ролей (ученик, администратор и т.д.)
                    initMainApp(username, role);
                }
            }
        });
        
        function initMainApp(username, role) {
        }
    });
    // Элементы формы входа
    const loginContainer = document.getElementById('login-container');
    const appContainer = document.getElementById('app-container');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const roleSelect = document.getElementById('user-role');
    
    // Элементы основного интерфейса
    const displayUsername = document.getElementById('display-username');
    const displayRole = document.getElementById('display-role');
    const userAvatar = document.getElementById('user-avatar');
    
    // Обработчик отправки формы входа
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const role = roleSelect.value;
        
        if (username) {
            // Сохраняем имя пользователя
            displayUsername.textContent = username;
            
            // Устанавливаем роль
            let roleText = '';
            switch(role) {
                case 'student':
                    roleText = 'Ученик • Фортепиано';
                    break;
                case 'teacher':
                    roleText = 'Преподаватель';
                    break;
                case 'admin':
                    roleText = 'Администратор';
                    break;
                case 'director':
                    roleText = 'Директор';
                    break;
            }
            displayRole.textContent = roleText;
            
            // Устанавливаем аватар (первые буквы имени и фамилии)
            const nameParts = username.split(' ');
            let initials = '';
            if (nameParts.length >= 2) {
                initials = nameParts[0].charAt(0) + nameParts[1].charAt(0);
            } else {
                initials = username.substring(0, 2);
            }
            userAvatar.textContent = initials.toUpperCase();
            
            // Скрываем форму входа и показываем основное приложение
            loginContainer.style.display = 'none';
            appContainer.style.display = 'flex';
            
            // Инициализируем основные компоненты
            initMainApp();
        }
    });
    
    function initMainApp() {
        // Переключение между разделами
        const menuItems = document.querySelectorAll('.white-key');
        const contentSections = document.querySelectorAll('.content-section');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                // Удаляем активный класс у всех элементов меню
                menuItems.forEach(i => i.classList.remove('active'));
                
                // Добавляем активный класс текущему элементу
                this.classList.add('active');
                
                // Скрываем все секции контента
                contentSections.forEach(section => section.classList.add('hidden'));
                
                // Показываем выбранную секцию
                const sectionId = this.getAttribute('data-section') + '-section';
                document.getElementById(sectionId).classList.remove('hidden');
                
                // Обновляем заголовок
                document.getElementById('section-title').textContent = this.querySelector('span').textContent;
                
                // Если это раздел оценок, инициализируем график
                if (sectionId === 'grades-section') {
                    initGradesChart();
                }
            });
        });
        
        // Инициализация графика оценок
        function initGradesChart() {
            const canvas = document.getElementById('grades-chart');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Устанавливаем размер canvas
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
            
            // Пример данных оценок
            const grades = [4, 5, 4, 3, 5, 5, 4, 5, 4, 5, 5, 3, 4, 5];
            
            // Очищаем canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Рисуем звуковую волну оценок
            ctx.strokeStyle = '#5E35B1';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const step = canvas.width / (grades.length - 1);
            const centerY = canvas.height / 2;
            const amplitude = canvas.height / 3;
            
            for (let i = 0; i < grades.length; i++) {
                const x = i * step;
                const y = centerY - (grades[i] - 3) * (amplitude / 2);
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                
                // Рисуем кружок для каждой оценки
                ctx.fillStyle = getGradeColor(grades[i]);
                ctx.beginPath();
                ctx.arc(x, y, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
            
            ctx.stroke();
        }
        
        function getGradeColor(grade) {
            switch(grade) {
                case 5: return '#4CAF50';
                case 4: return '#8BC34A';
                case 3: return '#FFC107';
                case 2: return '#F44336';
                default: return '#9E9E9E';
            }
        }
        
        // Обработчик изменения года обучения
        const yearSelect = document.getElementById('year-select');
        if (yearSelect) {
            yearSelect.addEventListener('change', function() {
                console.log('Выбран год:', this.value);
                // Здесь будет логика загрузки данных для выбранного года
            });
        }
    }
});
// В функцию initMainApp() добавляем:

// Инициализация вкладок предметов
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок и контента
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        // Показываем соответствующий контент
        const year = button.getAttribute('data-year');
        document.querySelector(`.tab-content[data-year="${year}"]`).classList.add('active');
    });
});

// Инициализация графика прогресса
function initProgressChart() {
    const ctx = document.getElementById('progress-chart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1 год', '2 год', '3 год'],
            datasets: [{
                label: 'Средний балл',
                data: [4.8, 4.6, 4.7],
                borderColor: '#5E35B1',
                backgroundColor: 'rgba(94, 53, 177, 0.1)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 3,
                    max: 5
                }
            }
        }
    });
}

// В обработчике переключения разделов добавляем:
if (sectionId === 'progress-section') {
    initProgressChart();
}