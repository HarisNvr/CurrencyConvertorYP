![Main Currency-converter workflow]
# Currency-converter

## Описание проекта

Currency-converter — это веб-приложение, предназначенное для простого и удобного преобразования валют. Пользователи могут вводить сумму в одной валюте и выбирать валюту, в которую они хотят конвертировать, получая мгновенные результаты. Приложение использует актуальные курсы валют, чтобы обеспечить точность расчетов.

## В проекте реализовано:

- **Форма ввода**: Пользователи могут вводить сумму, которую хотят конвертировать.
- **Выбор валюты**: Доступен выбор исходной и целевой валюты из выпадающего списка.
- **Кнопка конвертации**: При нажатии на кнопку происходит смена валют и отображение результата конвертации.
- **Актуальные курсы валют**: Приложение использует API для получения актуальных курсов валют, обеспечивая точность расчетов.
- **Интуитивно понятный интерфейс**: Простой и удобный интерфейс, который позволяет пользователям быстро и легко выполнять конвертацию валют.
- **Интеграция с Redis и Celery**: Проект содержит Redis и Celery для обработки фоновых задач.
- **Развертывание в Docker**: Проект развернут в Docker для удобства развертывания и масштабирования.
- **Обновление базы данных**: Приложение обращается по API раз в сутки и обновляет базу данных с актуальными курсами валют.

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

## Установка

1. Клонируйте репозиторий на свой компьютер:

```
git clone git@github.com:HarisNvr/CurrencyConvertorYP.git
```
```
cd CurrencyConvertor
```
2. Создайте файл .env. Пример находится в корневой директории .env.example

## Запуск проекта

1. Подключитесь к удаленному серверу.
```
ssh -i путь_до_файла_с_SSH_ключом/название_файла_с_SSH_ключом имя_пользователя@ip_адрес_сервера 
```
2. Cоздайте папку проекта CurrencyConvertor и перейдите в неё:
```
mkdir CurrencyConvertor
cd CurrencyConvertor
```
3. Установите docker compose на сервер:
```
sudo apt update
sudo apt install curl
curl -fSL https://get.docker.com -o get-docker.sh
sudo sh ./get-docker.sh
sudo apt-get install docker-compose-plugin
```
4. Скопируйте в дирректорию проекта файлы docker-compose.production.yml и .env
```
scp -i path_to_SSH/SSH_name docker-compose.production.yml username@server_ip:/home/username/CurrencyConvertor/docker-compose.production.yml
scp -i path_to_SSH/SSH_name .env username@server_ip:/home/username/CurrencyConvertor/.env
```
5. Запустите docker compose в режиме демона:
```
sudo docker compose -f docker-compose.production.yml up -d
```
6. Выполните миграции, соберите статику бэкенда.
7. Отредактируйте конфиг Nginx на сервере, убедитесь в работоспособности и перезапустите Nginx.

## Проект доступен по адресу: 

Release
0.0.1

Date
December 28, 2024
