from json import dump
from typing import Any, Dict

from dotenv import load_dotenv
from requests import get

from .constants import API_KEY, BASE_URL, MAJOR_CURRENCIES, OUTPUT_FILE

load_dotenv()


def get_rates(base_currency: str) -> Dict[str, Any]:
    api_url = f'{BASE_URL}/{API_KEY}/latest/{base_currency}'
    response = get(api_url)
    response.raise_for_status()
    data = response.json()

    parsed_data = {
        'base_code': data.get('base_code'),
        'conversion_rates': data.get('conversion_rates', {}),
        'time_last_update_utc': data.get('time_last_update_utc')
    }

    return parsed_data


def get_and_save_all_rates() -> None:
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
        dump(all_rates, file, indent=4)

    print('Данные успешно сохранены в JSON файл.')
