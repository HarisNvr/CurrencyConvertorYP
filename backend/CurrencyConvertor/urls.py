from django.contrib import admin
from django.urls import path

from CurrencyConvertor.settings import HASH_URL
from api import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('rates/', views.currency_rates_view, name='currency_rates'),
    path(f'{HASH_URL}', views.update_course_db, name='update_course_db')
]
