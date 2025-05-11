# МузШкола

Установка и проверка установки Node.js

*Node.js*

Установка происходит через оф. сайт: https://nodejs.org/

Проверка же происходит через cmd или PowerShel
```bash
   node -v
   npm -v
```

в файле server.js указан IP и пароль(лучше перепроверить) а так же настройки подключения к PostgreSQL.

**Запуск проекта**
Для начала клонируем репозиторий через

```bash
   git clone https://github.com/ваш-логин/project-name.git
   cd project-name
```

Затем настраиваем файл бэкэнда
**server.js**(в самом низу будет подключение меняем значения)

И просто запускаем бэкэнд
```bash
   npm install express mysql2 cors  # установить зависимости
   node server.js
```

Открытие происходит через **index.html**
