/**
 * Director Dashboard Controller
 * Музыкальная школа - Панель директора
 */
class DirectorDashboard {
    constructor() {
      this.currentUser = null;
      this.charts = {
        finance: null,
        performance: null,
        analytics: null
      };
      this.init();
    }
  
    /**
     * Инициализация приложения
     */
    async init() {
      try {
        await this.checkAuth();
        this.initUI();
        await this.loadData();
        this.initCharts();
        this.setupEventListeners();
      } catch (error) {
        console.error('Ошибка инициализации:', error);
        this.showError('Не удалось загрузить приложение');
      }
    }
  
    /**
     * Проверка авторизации пользователя
     */
    async checkAuth() {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if (!this.currentUser || this.currentUser.role !== 'director') {
        this.redirectToLogin();
        throw new Error('Доступ запрещен');
      }
    }
  
    /**
     * Инициализация пользовательского интерфейса
     */
    initUI() {
      // Установка данных пользователя
      document.getElementById('display-username').textContent = 
        this.currentUser.username || 'Директор Иванов';
      document.getElementById('user-avatar').textContent = 
        this.getInitials(this.currentUser.username || 'Директор Иванов');
      document.getElementById('display-role').textContent = 'Директор';
      
      // Активация первого раздела
      this.activateSection('dashboard');
    }
  
    /**
     * Загрузка данных
     */
    async loadData() {
      try {
        await Promise.all([
          this.loadStudents(),
          this.loadTeachers()
        ]);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        this.showError('Не удалось загрузить данные');
      }
    }
  
    /**
     * Инициализация графиков
     */
    initCharts() {
      // Уничтожаем старые графики, если они есть
      this.destroyCharts();
      
      // Создаем новые графики
      this.initFinanceChart();
      this.initPerformanceChart();
    }
  
    /**
     * Уничтожение графиков
     */
    destroyCharts() {
      Object.values(this.charts).forEach(chart => {
        if (chart) chart.destroy();
      });
      this.charts = {
        finance: null,
        performance: null,
        analytics: null
      };
    }
  
    /**
     * График финансовых показателей
     */
    initFinanceChart() {
      const ctx = document.getElementById('finance-chart')?.getContext('2d');
      if (!ctx) return;
      
      this.charts.finance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн'],
          datasets: [
            {
              label: 'Доходы',
              data: [450, 480, 520, 490, 530, 560],
              backgroundColor: 'rgba(39, 174, 96, 0.7)',
              borderColor: 'rgba(39, 174, 96, 1)',
              borderWidth: 1
            },
            {
              label: 'Расходы',
              data: [380, 395, 410, 420, 430, 440],
              backgroundColor: 'rgba(229, 57, 53, 0.7)',
              borderColor: 'rgba(229, 57, 53, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Тысячи рублей'
              }
            }
          }
        }
      });
    }
  
    /**
     * График успеваемости
     */
    initPerformanceChart() {
      const ctx = document.getElementById('performance-chart')?.getContext('2d');
      if (!ctx) return;
      
      this.charts.performance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Фортепиано', 'Струнные', 'Духовые', 'Ударные', 'Теория'],
          datasets: [{
            data: [4.5, 4.3, 4.2, 4.1, 4.7],
            backgroundColor: [
              'rgba(46, 26, 71, 0.7)',
              'rgba(94, 53, 177, 0.7)',
              'rgba(156, 39, 176, 0.7)',
              'rgba(103, 58, 183, 0.7)',
              'rgba(63, 81, 181, 0.7)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });
    }
  
    /**
     * Настройка обработчиков событий
     */
    setupEventListeners() {
      // Навигация по разделам
      document.querySelectorAll('.white-key').forEach(item => {
        item.addEventListener('click', (e) => {
          const section = e.currentTarget.getAttribute('data-section');
          this.activateSection(section);
        });
      });
      
      // Остальные обработчики...
    }
  
    /**
     * Активация раздела
     */
    activateSection(section) {
      // Обновление навигации
      document.querySelectorAll('.white-key').forEach(item => {
        item.classList.remove('active');
      });
      
      const activeItem = document.querySelector(`.white-key[data-section="${section}"]`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
      
      // Показ соответствующего раздела
      document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
      });
      
      const activeSection = document.getElementById(`${section}-section`);
      if (activeSection) {
        activeSection.classList.add('active');
        
        // Обновление заголовка
        const sectionTitle = activeItem?.querySelector('span')?.textContent;
        if (sectionTitle) {
          document.querySelector('.content-header h2').textContent = sectionTitle;
        }
        
        // Обновление графиков при переключении
        if (section === 'dashboard') {
          this.initCharts();
        }
      }
    }
  
    // ... остальные методы класса ...
  }
  
  // Запуск приложения после полной загрузки страницы
  window.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что все необходимые элементы DOM загружены
    if (document.querySelector('.app-container')) {
      new DirectorDashboard();
    } else {
      console.error('Не найден основной контейнер приложения');
    }
  });