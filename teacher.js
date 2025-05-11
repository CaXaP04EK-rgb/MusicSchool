// Модальное окно для новостей
const newsModal = document.getElementById('news-modal');
const newsForm = document.getElementById('news-form');
const fileInput = document.getElementById('news-files');
const filesPreview = document.getElementById('files-preview');

// Открытие модального окна
document.getElementById('add-news-btn').addEventListener('click', () => {
    newsModal.classList.remove('hidden');
});

// Закрытие модального окна
document.querySelector('.close-modal').addEventListener('click', () => {
    newsModal.classList.add('hidden');
    newsForm.reset();
    filesPreview.innerHTML = '';
});

// Превью файлов
fileInput.addEventListener('change', (e) => {
    filesPreview.innerHTML = '';
    
    Array.from(e.target.files).forEach(file => {
        const fileElement = document.createElement('div');
        fileElement.className = 'file-preview-item';
        fileElement.innerHTML = `
            <span class="file-icon">📄</span>
            <span class="file-name">${file.name}</span>
            <span class="file-remove" data-name="${file.name}">×</span>
        `;
        filesPreview.appendChild(fileElement);
    });
});

// Удаление файла из превью
filesPreview.addEventListener('click', (e) => {
    if (e.target.classList.contains('file-remove')) {
        const fileName = e.target.dataset.name;
        const dt = new DataTransfer();
        
        Array.from(fileInput.files)
            .filter(file => file.name !== fileName)
            .forEach(file => dt.items.add(file));
        
        fileInput.files = dt.files;
        e.target.closest('.file-preview-item').remove();
    }
});

// Отправка формы
newsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('news-title').value);
    formData.append('content', document.getElementById('news-content').value);
    formData.append('status', document.getElementById('news-status').value);
    
    // Добавляем файлы
    Array.from(fileInput.files).forEach(file => {
        formData.append('files[]', file);
    });
    
    try {
        // Здесь будет реальный запрос к API
        console.log('Отправка данных:', {
            title: formData.get('title'),
            files: fileInput.files
        });
        
        alert('Новость успешно добавлена!');
        newsModal.classList.add('hidden');
        newsForm.reset();
        filesPreview.innerHTML = '';
        loadNews(); // Перезагружаем список новостей
        
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка при добавлении новости');
    }
});
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('DOMContentLoaded', function() {
        document.addEventListener('DOMContentLoaded', function() {
            document.addEventListener('DOMContentLoaded', function() {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                
                if (!currentUser || currentUser.role !== 'teacher') {
                    window.location.href = 'index.html';
                    return;
                }
                
                // Инициализация страницы преподавателя
                console.log('Добро пожаловать, преподаватель!');
            });
            // Проверяем авторизацию и роль
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            
            if (!currentUser) {
                window.location.href = 'index.html';
                return;
            }
            
            // Проверка роли (для teacher.html)
            if (currentUser.role !== 'teacher') {
                alert('Доступ только для преподавателей');
                window.location.href = 'index.html';
                return;
            }
            
            // Инициализация страницы
            initTeacherPage(currentUser);
        });
        
        function initTeacherPage(user) {
            // Заполняем данные пользователя
            document.getElementById('display-username').textContent = user.username;
            document.getElementById('user-avatar').textContent = user.username.charAt(0).toUpperCase();
            document.getElementById('display-role').textContent = `Преподаватель • ${user.department}`;
            
            // Остальной код инициализации страницы...
        }
        // Проверяем авторизацию и роль
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
            window.location.href = 'index.html';
            return;
        }
        
        // Проверка роли (для teacher.html)
        if (currentUser.role !== 'teacher') {
            alert('Доступ только для преподавателей');
            window.location.href = 'index.html';
            return;
        }
        
        // Инициализация страницы
        initTeacherPage(currentUser);
    });
    
    function initTeacherPage(user) {
        // Заполняем данные пользователя
        document.getElementById('display-username').textContent = user.username;
        document.getElementById('user-avatar').textContent = user.username.charAt(0).toUpperCase();
        document.getElementById('display-role').textContent = `Преподаватель • ${user.department}`;
        
        // Остальной код инициализации страницы...
    }
    // Инициализация данных учителя из localStorage
    const teacherData = JSON.parse(localStorage.getItem('teacherData'));
    if (teacherData) {
        document.getElementById('display-username').textContent = teacherData.name;
        document.getElementById('user-avatar').textContent = getInitials(teacherData.name);
    }

    // Переключение между разделами
    const menuItems = document.querySelectorAll('.white-key');
    const contentSections = document.querySelectorAll('.content-section');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            contentSections.forEach(section => section.classList.add('hidden'));
            
            const sectionId = this.getAttribute('data-section') + '-section';
            document.getElementById(sectionId).classList.remove('hidden');
            
            document.getElementById('section-title').textContent = this.querySelector('span').textContent;
        });
    });

    // Обработка формы оценки
    const gradeForm = document.getElementById('grade-form');
    if (gradeForm) {
        gradeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('grade-student').value;
            const subjectId = document.getElementById('grade-subject').value;
            const gradeValue = document.querySelector('input[name="grade"]:checked').value;
            const comment = document.getElementById('grade-comment').value;
            
            // Сохраняем оценку в localStorage
            saveGrade(studentId, subjectId, gradeValue, comment);
            
            alert('Оценка успешно сохранена!');
            this.reset();
        });
    }

    // Обработка формы задания
    const homeworkForm = document.getElementById('homework-form');
    if (homeworkForm) {
        homeworkForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('hw-student').value;
            const subjectId = document.getElementById('hw-subject').value;
            const title = document.getElementById('hw-title').value;
            const description = document.getElementById('hw-description').value;
            const deadline = document.getElementById('hw-deadline').value;
            
            // Сохраняем задание в localStorage
            saveHomework(studentId, subjectId, title, description, deadline);
            
            alert('Задание успешно добавлено!');
            this.reset();
        });
    }

    // Кнопки быстрого доступа в таблице учеников
    document.querySelectorAll('.grade-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Переключаемся на вкладку оценки
            document.querySelector('.white-key[data-section="add-grade"]').click();
            
            // Можно автоматически заполнить ученика
            // const studentId = this.closest('tr').dataset.studentId;
            // document.getElementById('grade-student').value = studentId;
        });
    });

    document.querySelectorAll('.homework-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Переключаемся на вкладку задания
            document.querySelector('.white-key[data-section="add-homework"]').click();
        });
    });

    // Функции для работы с данными
    function getInitials(name) {
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }

    function saveGrade(studentId, subjectId, grade, comment) {
        const grades = JSON.parse(localStorage.getItem('grades')) || [];
        
        grades.push({
            id: Date.now(),
            studentId,
            subjectId,
            grade,
            comment,
            date: new Date().toISOString(),
            teacher: teacherData.name
        });
        
        localStorage.setItem('grades', JSON.stringify(grades));
    }

    function saveHomework(studentId, subjectId, title, description, deadline) {
        const homeworks = JSON.parse(localStorage.getItem('homeworks')) || [];
        
        homeworks.push({
            id: Date.now(),
            studentId: studentId === 'all' ? null : studentId,
            subjectId,
            title,
            description,
            deadline,
            date: new Date().toISOString(),
            teacher: teacherData.name
        });
        
        localStorage.setItem('homeworks', JSON.stringify(homeworks));
    }
});
// Функция для загрузки новостей
async function loadNews() {
    try {
        // Здесь должен быть реальный запрос к API
        const mockNews = [
            {
                id: 1,
                date: new Date().toISOString(),
                title: 'Важное объявление о расписании',
                status: 'published'
            },
            {
                id: 2,
                date: new Date(Date.now() - 86400000).toISOString(),
                title: 'Подготовка к концерту',
                status: 'published'
            },
            {
                id: 3,
                date: new Date(Date.now() - 172800000).toISOString(),
                title: 'Новые методические материалы',
                status: 'draft'
            }
        ];

        const tableBody = document.getElementById('news-table-body');
        tableBody.innerHTML = '';

        mockNews.forEach(news => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(news.date)}</td>
                <td>${news.title}</td>
                <td><span class="news-status status-${news.status}">
                    ${news.status === 'published' ? 'Опубликовано' : 'Черновик'}
                </span></td>
                <td class="news-actions">
                    <button class="table-btn edit-btn" data-id="${news.id}">Редактировать</button>
                    <button class="table-btn delete-btn" data-id="${news.id}">Удалить</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Добавляем обработчики событий
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editNews(btn.dataset.id));
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deleteNews(btn.dataset.id));
        });

    } catch (error) {
        console.error('Ошибка загрузки новостей:', error);
        alert('Не удалось загрузить новости');
    }
}

// Вспомогательная функция для форматирования даты
function formatDate(dateString) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
}

// Функции для работы с новостями
function editNews(newsId) {
    alert(`Редактирование новости с ID: ${newsId}`);
    // Реальная логика редактирования
}

function deleteNews(newsId) {
    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
        alert(`Удаление новости с ID: ${newsId}`);
        // Реальная логика удаления
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Загрузка новостей
    loadNews();

    // Обработчик кнопки добавления новости
    document.getElementById('add-news-btn')?.addEventListener('click', () => {
        alert('Добавление новой новости');
        // Реальная логика добавления
    });

    // Обработчик поиска новостей
    document.querySelector('.search-btn')?.addEventListener('click', () => {
        const query = document.getElementById('news-search').value;
        alert(`Поиск новостей: ${query}`);
        // Реальная логика поиска
    });
});
// Обработчик для кнопки добавления новости
document.getElementById('add-news-btn').addEventListener('click', () => {
    document.getElementById('news-modal').classList.remove('hidden');
});

// Закрытие модального окна
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('news-modal').classList.add('hidden');
});

// Превью загружаемых файлов
document.getElementById('news-files').addEventListener('change', (e) => {
    const filesPreview = document.getElementById('files-preview');
    filesPreview.innerHTML = '';
    
    Array.from(e.target.files).forEach(file => {
        const filePreview = document.createElement('div');
        filePreview.className = 'file-preview';
        filePreview.innerHTML = `
            <span class="file-icon">📄</span>
            <span class="file-name">${file.name}</span>
            <span class="remove-file" data-name="${file.name}">×</span>
        `;
        filesPreview.appendChild(filePreview);
    });
});

// Удаление файлов из превью
document.getElementById('files-preview').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-file')) {
        const fileName = e.target.dataset.name;
        const fileInput = document.getElementById('news-files');
        
        // Создаем новый FileList без удаленного файла
        const newFiles = Array.from(fileInput.files).filter(f => f.name !== fileName);
        const dataTransfer = new DataTransfer();
        
        newFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        
        // Обновляем превью
        fileInput.dispatchEvent(new Event('change'));
    }
});

// Отправка формы новости
document.getElementById('news-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('news-title').value);
    formData.append('content', document.getElementById('news-content').value);
    formData.append('status', document.getElementById('news-status').value);
    
    // Добавляем файлы
    Array.from(document.getElementById('news-files').files).forEach(file => {
        formData.append('files[]', file);
    });
    
    try {
        // Здесь должен быть реальный запрос к API
        const response = await fetch('/api/news', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Новость успешно добавлена');
            document.getElementById('news-modal').classList.add('hidden');
            loadNews(); // Перезагружаем список новостей
        } else {
            throw new Error('Ошибка сервера');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось добавить новость');
    }
});

// Переключение между разделами
document.querySelectorAll('.white-key').forEach(key => {
    key.addEventListener('click', function() {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.white-key').forEach(k => {
            k.classList.remove('active');
        });
        
        // Добавляем активный класс текущей кнопке
        this.classList.add('active');
        
        // Скрываем все разделы
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });
        
        // Показываем нужный раздел
        const sectionId = this.getAttribute('data-section') + '-section';
        document.getElementById(sectionId).classList.add('active');
        document.getElementById(sectionId).classList.remove('hidden');
        
        // Обновляем заголовок
        const sectionTitle = this.querySelector('span').textContent;
        document.getElementById('section-title').textContent = sectionTitle;
    });
});

// Обработка формы оценки
document.getElementById('grade-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Оценка успешно сохранена!');
    this.reset();
});

// Обработка формы задания
document.getElementById('homework-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Задание успешно добавлено!');
    this.reset();
});

// Управление новостями
document.getElementById('add-news-btn').addEventListener('click', function() {
    document.getElementById('news-modal').classList.remove('hidden');
});

document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('news-modal').classList.add('hidden');
});

document.getElementById('news-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Новость успешно сохранена!');
    this.reset();
    document.getElementById('news-modal').classList.add('hidden');
});

// Фильтрация учеников по году обучения
document.getElementById('year-select').addEventListener('change', function() {
    const year = this.value;
    alert('Фильтрация по ' + (year === 'all' ? 'всем годам' : year + ' году обучения'));
    // Здесь должна быть реальная фильтрация данных
});

// Обработка кнопок "Оценка" и "Задание" в таблице учеников
document.querySelectorAll('.grade-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Переключаемся на раздел выставления оценки
        document.querySelector('[data-section="add-grade"]').click();
        
        // Можно добавить автоматическое заполнение формы
        const studentName = this.closest('tr').querySelector('.student-name').textContent;
        document.getElementById('grade-student').value = studentName.includes('Иван') ? '1' : 
                                                       studentName.includes('Елена') ? '2' : '3';
    });
});

document.querySelectorAll('.homework-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Переключаемся на раздел добавления задания
        document.querySelector('[data-section="add-homework"]').click();
        
        // Автоматическое заполнение формы
        const studentName = this.closest('tr').querySelector('.student-name').textContent;
        document.getElementById('hw-student').value = studentName.includes('Иван') ? '1' : 
                                                    studentName.includes('Елена') ? '2' : '1';
    });
});