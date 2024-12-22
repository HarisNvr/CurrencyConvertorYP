from django.apps import AppConfig


class RatesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Rates'
    verbose_name = 'История курсов валют'
    verbose_name_plural = 'Истории курсов валют'
