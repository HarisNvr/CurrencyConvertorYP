# Currency-converter

## Описание проекта

Currency-converter — это веб-приложение, предназначенное для простого и удобного преобразования валют. Пользователи могут вводить сумму в одной валюте и выбирать валюту, в которую они хотят конвертировать, получая мгновенные результаты. Приложение использует актуальные курсы валют, чтобы обеспечить точность расчетов.

## В проекте реализовано:

- **Форма ввода**: Пользователи могут вводить сумму, которую хотят конвертировать.
- **Выбор валюты**: Доступен выбор исходной и целевой валюты из выпадающего списка.
- **Кнопка "реверс"**: При нажатии на кнопку происходит смена валют и отображение результата конвертации.
- **Актуальные курсы валют**: Приложение использует https://app.exchangerate-api.com для получения актуальных курсов валют, обеспечивая точность расчетов.
- **Интуитивно понятный интерфейс**: Простой и удобный интерфейс, который позволяет пользователям быстро и легко выполнять конвертацию валют.
- **Интеграция с Redis**: Актуальные курсы конвертации хранятся в Redis базе, что обеспечивает быстрое время ответа.
- **Развертывание в Docker**: Проект развернут в Docker для удобства развертывания и масштабирования.
- **Обновление базы данных Celery**: Приложение раз в сутки обновляет базу данных с актуальными курсами валют, а также сохраняет историю курсов в PostgreSQL.

## Команда:

| Участник                                                           | Роль                               | Контакты                                                      |
|--------------------------------------------------------------------|------------------------------------|---------------------------------------------------------------|
| ![HarisNvr](https://github.com/HarisNvr.png?size=75)               | ТимЛид, Python-разработчик, DevOps | GitHub: [HarisNvr](https://github.com/HarisNvr)               |
| ![AnnPavlova03](https://github.com/AnnPavlova03.png?size=75)       | Старший Frontend-разработчик       | GitHub: [AnnPavlova03](https://github.com/AnnPavlova03)       |
| ![sashakostiukova](https://github.com/sashakostiukova.png?size=75) | Frontend-разработчик               | GitHub: [sashakostiukova](https://github.com/sashakostiukova) |
| ![vyalko](https://github.com/vyalko.png?size=75)                   | Python-разработчик                 | GitHub: [vyalko](https://github.com/vyalko)                   |
| ![GagarinRu](https://github.com/GagarinRu.png?size=75)             | Python-разработчик                 | GitHub: [GagarinRu](https://github.com/GagarinRu)             |
| Bant0n (Антон)                                                     | Python-разработчик                 | GitHub: [Bant0n](https://github.com/Bant0n)                   |
| Spo1ler0 (Сергей)                                                  | Дизайнер                           | TG: [Spo1ler0](https://t.me/Spo1ler0)                         |
| ma_ksn (Мария)                                                     | Дизайнер                           | TG: [ma_ksn](https://t.me/ma_ksn)                             |

## Используемый стек Backend

* **Django 5.1.4**
* **Python 3.12**
* **celery 5.4**
* **REDIS DB**
* **PostgreSQL DB**
* **Nginx**
* **Docker**

## Используемый стек Frontend

* **React**
* **TypeScript**
* **CSS**

## Используемый стек Design

* **FIGMA**

## Запуск проекта

**Предполагается, что на вашей машине уже установлен Docker с плагином Docker-compose!**

Инструкция по установке: https://docs.docker.com/engine/install/

1. Клонируйте репозиторий:
    ```
    git clone git@github.com:HarisNvr/CurrencyConvertorYP.git
    ```
    
    ```
    cd CurrencyConvertor
    ```

2. Создайте файл .env:
    ```
    sudo nano .env
    ```
    
    Пример .env файла:
    ```
    EXCHANGE_RATE_API_KEY=<Ваш ключ от https://app.exchangerate-api.com>
    
    DEBUG=True
    ENABLE_POSTGRES_DB=True
    TIME_ZONE=Europe/Moscow
    
    POSTGRES_USER=user
    POSTGRES_PASSWORD=pass
    POSTGRES_DB=django
    DB_HOST=localhost
    DB_PORT=5432
    
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_DB=0
    CELERY_REDIS_DB=1
    ```

3. Запустите сборку Docker-compose:
    ```
    sudo docker compose up -d
    ```    

## TO-DO:
1. Исправить "слепоту" frontend по поводу .env файла, который подгружается через docker-compose.yml
2. Добавить удалённый функционал личных кабинетов.
3. Добавить удалённый функционал графика истории курсов.
4. Исправить работу статики Django-admin.
5. Покрыть проект тестами.
