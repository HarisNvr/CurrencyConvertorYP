from os import getenv

API_KEY = getenv('EXCHANGE_RATE_API_KEY')

BASE_URL = 'https://v6.exchangerate-api.com/v6'

MAJOR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'RUB']

REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_DB = 0
