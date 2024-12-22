from os import getenv

API_KEY = getenv('EXCHANGE_RATE_API_KEY')

BASE_URL = 'https://v6.exchangerate-api.com/v6'

OUTPUT_FILE = 'api/exchange_rates.json'

MAJOR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'RUB']
