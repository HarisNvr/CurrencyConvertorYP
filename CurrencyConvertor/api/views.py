from json import load

from django.http import HttpResponse, JsonResponse

from .constants import OUTPUT_FILE


def currency_rates_view(request):

    try:
        with open(OUTPUT_FILE, 'r') as file:
            data = load(file)
    except FileNotFoundError:
        return HttpResponse('Файл с курсами валют не найден.', status=404)

    base_currency = request.GET.get('base', 'USD')

    rates = data.get(base_currency)
    if not rates:
        return HttpResponse(
            f'Курсы для валюты {base_currency} не найдены.', status=404
        )

    return JsonResponse({base_currency: rates})
