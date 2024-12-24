from json import loads, JSONDecodeError

from django.http import HttpResponse, JsonResponse
from redis import Redis

from api.constants import REDIS_HOST, REDIS_PORT, REDIS_DB


def currency_rates_view(request):
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
        rates = rates.decode()
        rates = loads(rates)
    except (UnicodeDecodeError, JSONDecodeError):
        return HttpResponse(
            'Ошибка при чтении данных из Redis.', status=500
        )

    return JsonResponse({base_currency: rates})
