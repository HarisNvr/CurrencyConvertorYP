from json import dumps
from typing import Any, Dict

from redis import Redis, ConnectionError
from requests import get

from api.constants import (
    API_KEY, BASE_URL, MAJOR_CURRENCIES, REDIS_HOST, REDIS_PORT, REDIS_DB
)


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

    api_url = f'{BASE_URL}/{API_KEY}/{base_currency}'
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

    try:
        redis_client.ping()
        print("Connected to Redis!")
    except ConnectionError:
        print("Could not connect to Redis.")
        return

    serialized_rate = dumps(currency_rate)
    redis_client.set(currency_name, serialized_rate)
    redis_client.close()


def get_and_save_all_rates() -> None:
    """
    Fetches and saves exchange rates for all major currencies.

    The function iterates through a list of major currencies, retrieves the
    latest exchange rates for each currency using the `get_rates` function,
    and saves the data to Redis and PostgreSQL databases.

    :return: None
    """

    for currency in MAJOR_CURRENCIES:
        parsed_data = get_rates(currency)
        save_current_rate(
            currency_name=parsed_data['base_code'],
            currency_rate=parsed_data['conversion_rates']
        )

        # PostgreSQL saving func
