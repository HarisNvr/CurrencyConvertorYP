from json import dumps, JSONDecodeError, loads
from typing import Any, Dict

from django.http import HttpResponse
from redis import Redis
from requests import get

from CurrencyConvertor.settings import (
    API_KEY, BASE_URL, MAJOR_CURRENCIES, REDIS_HOST, REDIS_PORT, REDIS_DB
)
from forex.models import Course


def get_rates(base_currency: str) -> Dict[str, Any]:
    """
    Fetches the latest currency conversion rates for the specified base
    currency.

    The function makes a request to the API, retrieves exchange rates and
    related information, and parses the data into a dictionary containing the
    base currency code, conversion rates, and the last update timestamp.

    :param base_currency: The base currency for which to fetch exchange
                          rates (e.g., "USD").
    :return: A dictionary with the base currency code, conversion rates, and
             the last update timestamp.
    """

    api_url = f'{BASE_URL}/{API_KEY}/latest/{base_currency}'
    response = get(api_url)
    response.raise_for_status()
    data = dict(response.json())

    parsed_data = {
        'base_code': data.get('base_code'),
        'conversion_rates': data.get('conversion_rates', {}),
        'time_last_update_utc': data.get('time_last_update_utc')
    }

    return parsed_data


def save_current_rate(currency_name: str, currency_rate: dict) -> None:
    """
    Saves the current exchange rate for a given currency into Redis.

    :param currency_name: The name of the currency as the key in Redis.
    :param currency_rate: The exchange rate to be stored, represented as a
                          dictionary.
    """

    redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

    serialized_rate = dumps(currency_rate)
    redis_client.set(currency_name, serialized_rate)
    redis_client.close()


def get_current_rate(currency_name: str) -> HttpResponse | dict:
    """
    Fetches the current exchange rates for the specified currency from Redis.

    :param currency_name: The name of the currency for which rates are
           requested.
    :return: If successful, a dictionary containing exchange rates with
             currency codes as keys and their corresponding rates as values.
             Returns an HttpResponse with status 404 if no rates are found,
             or 500 if there is an error reading data from Redis.
    """

    redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
    rates = redis_client.get(currency_name)
    redis_client.close()

    if not rates:
        return HttpResponse(
            f'Курсы для валюты {currency_name} не найдены.',
            status=404
        )

    try:
        rates = loads(rates.decode())
    except (UnicodeDecodeError, JSONDecodeError):
        return HttpResponse(
            'Ошибка при чтении данных из Redis.', status=500
        )

    return rates


def get_and_save_all_rates() -> None:
    """
    Fetches and saves exchange rates for all major currencies.

    The function iterates through a list of major currencies, retrieves the
    latest exchange rates for each currency using the `get_rates` function,
    and saves the data to Redis and PostgreSQL databases.

    :return: None
    """

    course_dict = {}

    for currency in MAJOR_CURRENCIES:
        parsed_data = get_rates(currency)

        base_code = parsed_data['base_code']
        conversion_rates = parsed_data['conversion_rates']

        save_current_rate(
            currency_name=base_code,
            currency_rate=conversion_rates
        )

        course_dict[base_code] = conversion_rates

    Course.objects.create(rates=course_dict)
