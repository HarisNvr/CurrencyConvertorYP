from json import loads, JSONDecodeError

from django.http import HttpResponse, JsonResponse, HttpRequest
from redis import Redis

from CurrencyConvertor.settings import REDIS_HOST, REDIS_PORT, REDIS_DB
from api.utils import get_and_save_all_rates


def currency_rates_view(request: HttpRequest) -> HttpResponse | JsonResponse:
    """
    Handles a request to retrieve currency exchange rates for a specified base
    currency.

    The function queries Redis to fetch stored exchange rates for the given
    base currency. If the rates are not found, it returns a 404 response.
    If an error occurs while reading or decoding the data, it returns a 500
    response. On success, the function responds with a JSON containing the
    exchange rates.

    :param request: The HTTP request containing the 'base' currency parameter
                    in the query string.
    :return: An HttpResponse or JsonResponse with the exchange rates or an
             error message.
    """

    redis_client = Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)

    base_currency = request.GET.get('base')

    rates = redis_client.get(base_currency)
    if not rates:
        return HttpResponse(
            f'Курсы для валюты {base_currency} не найдены.',
            status=404
        )
    redis_client.close()

    try:
        rates = loads(rates.decode())
    except (UnicodeDecodeError, JSONDecodeError):
        return HttpResponse(
            'Ошибка при чтении данных из Redis.', status=500
        )

    return JsonResponse({base_currency: rates})


def update_course_db() -> HttpResponse:
    """
    Updates the exchange rates in the database.

    This view function is triggered by a request to a specific URL and calls
    the `get_and_save_all_rates` function to fetch and save the latest exchange
    rates. If the update is successful, it returns a 200 response indicating
    that the rates have been updated. If an error occurs during the update
    process, a 500 error is returned with the exception message.

    :param request: The HTTP request that triggers the update process.
    :return: An HttpResponse indicating the success or failure of
             the operation.
    """

    try:
        get_and_save_all_rates()
        status = HttpResponse(
            'Курсы валют обновлены!',
            status=200
        )
    except Exception as e:
        status = HttpResponse(
            f'Во время обновления курсов произошла ошибка: {e}',
            status=500
        )

    return status
