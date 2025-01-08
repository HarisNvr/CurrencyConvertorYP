from django.urls import path

from api.views import convert_currency_view, currency_rates_view

urlpatterns = [
    path('rates/', currency_rates_view, name='currency_rates'),
    path('convert/', convert_currency_view, name='convert_currency')
]
