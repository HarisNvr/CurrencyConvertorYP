from django.contrib import admin
from django.urls import path

from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rates/', views.currency_rates_view, name='currency_rates'),
]
