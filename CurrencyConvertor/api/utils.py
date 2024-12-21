import json
import os

import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv('EXCHANGE_RATE_API_KEY')
BASE_URL = 'https://v6.exchangerate-api.com/v6'
OUTPUT_FILE = 'api/exchange_rates.json'

MAJOR_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'RUB']


def get_rates(base_currency):
    api_url = f'{BASE_URL}/{API_KEY}/latest/{base_currency}'
    response = requests.get(api_url)
    response.raise_for_status()
    data = response.json()
    return data.get('conversion_rates', {})


def get_and_save_all_rates():
    all_rates = {}

    for currency in MAJOR_CURRENCIES:

        try:
            rates = get_rates(currency)
            if rates:
                all_rates[currency] = rates
            else:
                print(f'Ошибка: данные для {currency} отсутствуют.')

        except Exception as e:
            print(f'Ошибка при запросе для {currency}: {e}')

    with open(OUTPUT_FILE, 'w') as file:
        json.dump(all_rates, file, indent=4)

    print('Данные успешно сохранены в JSON файл.')
