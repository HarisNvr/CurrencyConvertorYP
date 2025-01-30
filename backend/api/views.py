from django.http import HttpResponse, JsonResponse, HttpRequest
from django.views.decorators.http import require_GET

from CurrencyConvertor import settings
from api.utils import get_current_rate


@require_GET
def currency_rates_view(request: HttpRequest) -> HttpResponse | JsonResponse:
    """
    Handles a request to retrieve currency exchange rates for a specified base
    currency.

    The function queries Redis to fetch stored exchange rates for the given
    base currency. If the rates are not found, it returns a 404 response.
    If an error occurs while reading or decoding the data, it returns a 500
    response. On success, the function responds with a JSON containing the
    exchange rates.

    :param request: An HttpRequest object.
    :return: An HttpResponse or JsonResponse with the exchange rates or an
             error message.
    """

    base_currency = request.GET.get('base')

    result = get_current_rate(base_currency)

    if isinstance(result, HttpResponse):
        return result
    else:
        return JsonResponse({base_currency: result})


@require_GET
def convert_currency_view(request: HttpRequest) -> HttpResponse | JsonResponse:
    """
    Converts a specified amount from one currency to another based on current
    exchange rates.

    :param request: An HttpRequest object.
    :return: An HttpResponse or JsonResponse with the exchange result or an
             error message.
    """

    base = request.GET.get('from')
    target = request.GET.get('to')
    result = get_current_rate(base)

    try:
        amount = float(request.GET.get('amount'))
    except ValueError:
        return HttpResponse(
            'Параметр amount заполнен некорректно',
            status=400
        )

    if amount <= 0:
        return HttpResponse(
            'Параметр amount не может быть меньше или равен нулю',
            status=400
        )
    elif amount >= settings.MAX_AMOUNT:
        return HttpResponse(
            f'Параметр amount не может быть больше '
            f'или равен {settings.MAX_AMOUNT}',
            status=400
        )

    if isinstance(result, HttpResponse):
        return result
    else:
        target_currency_rate = result.get(target)

        if not target_currency_rate:
            return HttpResponse(
                'Курсы для валюты для пары: '
                f'{base}-{target} '
                'не найдены.',
                status=404
            )

        result = target_currency_rate * amount

        if str(result).split('.')[-1] == '0':
            result = int(result)

        return JsonResponse({'result': result})
