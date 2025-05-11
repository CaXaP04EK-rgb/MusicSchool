// Добавляем функцию для логирования ошибок
function logError(message, error) {
    console.error(`[МузШкола] ${message}`, error);
    // Можно также добавить визуальное уведомление для пользователя
}

// Функция для проверки существования элемента
function elementExists(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`[МузШкола] Элемент не найден: ${selector}`);
        return false;
    }
    return true;
}

// Основная инициализация с обработкой ошибок
document.addEventListener('DOMContentLoaded', function() {
    console.log('[МузШкола] Страница загружена, начинаем инициализацию...');
    
    try {
        // Проверяем наличие ключевых элементов
        const requiredElements = [
            '.white-key', 
            '.content-section', 
            '#display-username', 
            '#user-avatar', 
            '#display-role'
        ];
        
        let missingElements = false;
        requiredElements.forEach(selector => {
            if (!elementExists(selector)) {
                missingElements = true;
            }
        });
        
        if (missingElements) {
            console.error('[МузШкола] Отсутствуют необходимые элементы интерфейса');
            return;
        }
        
        // Проверка авторизации и роли
        let currentUser;
        try {
            const userData = localStorage.getItem('currentUser');
            currentUser = userData ? JSON.parse(userData) : null;
            
            // Если пользователя нет, создаем тестового для демонстрации
            if (!currentUser) {
                console.log('[МузШкола] Пользователь не найден в localStorage, используем тестового пользователя');
                currentUser = {
                    username: "Алексей Админ", 
                    role: "admin"
                };
            }
        } catch (e) {
            logError('Ошибка при получении данных пользователя', e);
            currentUser = {
                username: "Алексей Админ", 
                role: "admin"
            };
        }
        
        if (!currentUser || currentUser.role !== 'admin') {
            console.log('[МузШкола] Доступ запрещен: пользователь не является администратором');
            alert('Доступ только для администраторов');
            window.location.href = 'index.html';
            return;
        }
        
        // Инициализация страницы
        console.log('[МузШкола] Начинаем инициализацию приложения...');
        initAdminApp(currentUser);
        
    } catch (error) {
        logError('Критическая ошибка при инициализации приложения', error);
        alert('Произошла ошибка при загрузке приложения. Пожалуйста, обновите страницу.');
    }
});

function initAdminApp(user) {
    try {
        console.log('[МузШкола] Инициализация интерфейса...');
        
        // Установка информации о пользователе
        document.getElementById('display-username').textContent = user.username;
        document.getElementById('user-avatar').textContent = getInitials(user.username);
        document.getElementById('display-role').textContent = 'Администратор';
        
        // Проверяем наличие Chart.js
        if (typeof Chart === 'undefined') {
            console.error('[МузШкола] Библиотека Chart.js не загружена!');
            alert('Ошибка: не удалось загрузить библиотеку для графиков. Некоторые функции будут недоступны.');
        } else {
            console.log('[МузШкола] Инициализация графиков...');
            initCharts();
        }
        
        // Настройка обработчиков событий
        console.log('[МузШкола] Настройка обработчиков событий...');
        setupEventListeners();
        
        console.log('[МузШкола] Инициализация завершена успешно');
    } catch (error) {
        logError('Ошибка при инициализации приложения', error);
    }
}

function setupEventListeners() {
    try {
        // Переключение между разделами
        const menuItems = document.querySelectorAll('.white-key');
        if (menuItems.length === 0) {
            console.warn('[МузШкола] Не найдены элементы меню (.white-key)');
        }
        
        menuItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                try {
                    console.log(`[МузШкола] Клик по пункту меню: ${this.querySelector('span')?.textContent || 'неизвестный'}`);
                    
                    // Удаляем активный класс у всех пунктов меню
                    menuItems.forEach(i => i.classList.remove('active'));
                    // Добавляем активный класс текущему пункту
                    this.classList.add('active');
                    
                    // Получаем ID раздела
                    const sectionId = this.getAttribute('data-section');
                    if (!sectionId) {
                        console.warn('[МузШкола] У элемента меню отсутствует атрибут data-section');
                        return;
                    }
                    
                    // Скрываем все разделы
                    const contentSections = document.querySelectorAll('.content-section');
                    contentSections.forEach(section => section.classList.add('hidden'));
                    
                    // Показываем выбранный раздел
                    const targetSectionId = `${sectionId}-section`;
                    const targetSection = document.getElementById(targetSectionId);
                    if (!targetSection) {
                        console.warn(`[МузШкола] Не найден раздел с ID: ${targetSectionId}`);
                        return;
                    }
                    
                    targetSection.classList.remove('hidden');
                    
                    // Обновляем заголовок
                    const sectionTitle = document.getElementById('section-title');
                    if (sectionTitle) {
                        sectionTitle.textContent = this.querySelector('span')?.textContent || '';
                    }
                    
                    // Инициализация графиков при переключении на раздел успеваемости
                    if (sectionId === 'performance' && typeof Chart !== 'undefined') {
                        console.log('[МузШкола] Инициализация графика успеваемости');
                        initPerformanceChart();
                    }
                } catch (error) {
                    logError('Ошибка при переключении раздела', error);
                }
            });
        });
        
        // Кнопка выхода
        const logoutBtn = document.querySelector('.logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function() {
                console.log('[МузШкола] Выход из системы');
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            });
        } else {
            console.warn('[МузШкола] Не найдена кнопка выхода (.logout-btn)');
        }
        
        // Другие обработчики событий...
        setupAdditionalEventListeners();
        
    } catch (error) {
        logError('Ошибка при настройке обработчиков событий', error);
    }
}

function setupAdditionalEventListeners() {
    // Кнопки добавления в разделах
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            try {
                const section = this.closest('.content-section')?.id;
                console.log(`[МузШкола] Нажата кнопка добавления в разделе: ${section}`);
                
                if (section === 'students-section') {
                    alert('Функция добавления ученика будет доступна в следующей версии');
                } else if (section === 'teachers-section') {
                    alert('Функция добавления преподавателя будет доступна в следующей версии');
                }
            } catch (error) {
                logError('Ошибка при обработке кнопки добавления', error);
            }
        });
    });
    
    // Кнопки в таблицах
    document.querySelectorAll('.view-btn, .edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                const action = this.classList.contains('view-btn') ? 'просмотра' : 'редактирования';
                console.log(`[МузШкола] Нажата кнопка ${action}`);
                alert(`Функция ${action} будет доступна в следующей версии`);
            } catch (error) {
                logError('Ошибка при обработке кнопки в таблице', error);
            }
        });
    });
    
    // Фильтры в разделе успеваемости
    const perfFilters = document.querySelectorAll('#perf-department, #perf-year, #perf-period');
    perfFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            try {
                console.log(`[МузШкола] Изменен фильтр: ${this.id}, значение: ${this.value}`);
                // Перерисовываем график с новыми данными
                if (typeof Chart !== 'undefined') {
                    initPerformanceChart();
                }
            } catch (error) {
                logError('Ошибка при обработке изменения фильтра', error);
            }
        });
    });
    
    // Кнопка экспорта данных
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('[МузШкола] Нажата кнопка экспорта данных');
            alert('Функция экспорта данных будет доступна в следующей версии');
        });
    }
    
    // Поиск
    document.querySelectorAll('.search-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                const searchInput = this.previousElementSibling;
                console.log(`[МузШкола] Поиск: ${searchInput?.value || 'пустой запрос'}`);
                
                if (searchInput && searchInput.value) {
                    alert(`Поиск по запросу "${searchInput.value}" будет доступен в следующей версии`);
                } else {
                    alert('Введите поисковый запрос');
                }
            } catch (error) {
                logError('Ошибка при обработке поиска', error);
            }
        });
    });
    
    // Пагинация
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            try {
                if (!this.classList.contains('active')) {
                    console.log(`[МузШкола] Выбрана страница: ${this.textContent}`);
                    
                    document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                }
            } catch (error) {
                logError('Ошибка при обработке пагинации', error);
            }
        });
    });
}

// Функции для работы с графиками
function initCharts() {
    try {
        // График по отделениям
        const deptChart = document.getElementById('department-chart');
        if (deptChart) {
            console.log('[МузШкола] Инициализация графика по отделениям');
            const deptCtx = deptChart.getContext('2d');
            
            new Chart(deptCtx, {
                type: 'bar',
                data: {
                    labels: ['Фортепиано', 'Духовые', 'Ударные'],
                    datasets: [{
                        label: 'Средний балл',
                        data: [4.5, 4.2, 4.3],
                        backgroundColor: [
                            'rgba(94, 53, 177, 0.7)',
                            'rgba(33, 150, 243, 0.7)',
                            'rgba(76, 175, 80, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: false,
                            min: 3,
                            max: 5
                        }
                    }
                }
            });
        } else {
            console.warn('[МузШкола] Не найден элемент для графика отделений (#department-chart)');
        }
        
        // График активности преподавателей
        const teachersChart = document.getElementById('teachers-chart');
        if (teachersChart) {
            console.log('[МузШкола] Инициализация графика активности преподавателей');
            const teachersCtx = teachersChart.getContext('2d');
            
            new Chart(teachersCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Высокая активность', 'Средняя активность', 'Низкая активность'],
                    datasets: [{
                        data: [12, 5, 1],
                        backgroundColor: [
                            'rgba(76, 175, 80, 0.7)',
                            'rgba(255, 193, 7, 0.7)',
                            'rgba(244, 67, 54, 0.7)'
                        ]
                    }]
                },
                options: {
                    responsive: true
                }
            });
        } else {
            console.warn('[МузШкола] Не найден элемент для графика преподавателей (#teachers-chart)');
        }
    } catch (error) {
        logError('Ошибка при инициализации графиков', error);
    }
}

function initPerformanceChart() {
    try {
        const perfChart = document.getElementById('performance-chart');
        if (!perfChart) {
            console.warn('[МузШкола] Не найден элемент для графика успеваемости (#performance-chart)');
            return;
        }
        
        console.log('[МузШкола] Инициализация графика успеваемости');
        const ctx = perfChart.getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
                datasets: [
                    {
                        label: 'Фортепиано',
                        data: [4.3, 4.4, 4.5, 4.5, 4.6, 4.5],
                        borderColor: 'rgba(94, 53, 177, 1)',
                        backgroundColor: 'rgba(94, 53, 177, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Духовые',
                        data: [4.1, 4.2, 4.2, 4.1, 4.2, 4.2],
                        borderColor: 'rgba(33, 150, 243, 1)',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        fill: true
                    },
                    {
                        label: 'Ударные',
                        data: [4.2, 4.3, 4.3, 4.4, 4.3, 4.3],
                        borderColor: 'rgba(76, 175, 80, 1)',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3,
                        max: 5
                    }
                }
            }
        });
    } catch (error) {
        logError('Ошибка при инициализации графика успеваемости', error);
    }
}

// Вспомогательные функции
function getInitials(name) {
    try {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    } catch (error) {
        logError('Ошибка при получении инициалов', error);
        return 'АА'; // Возвращаем значение по умолчанию
    }
}

// Запускаем проверку на наличие Chart.js после загрузки страницы
window.addEventListener('load', function() {
    if (typeof Chart === 'undefined') {
        console.error('[МузШкола] ОШИБКА: Библиотека Chart.js не загружена!');
        alert('Ошибка: не удалось загрузить библиотеку для графиков. Проверьте подключение к интернету и обновите страницу.');
    } else {
        console.log('[МузШкола] Библиотека Chart.js успешно загружена');
    }
});

// Выводим сообщение о готовности скрипта
console.log('[МузШкола] Скрипт admin.js загружен');