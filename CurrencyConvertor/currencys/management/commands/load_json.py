from json import load
from django.core.management import BaseCommand

from currencys.models import Currency

from currencys.constants import OUTPUT_FILE


class Command(BaseCommand):
    def handle(self, *args, **options):
        """
        Saves the current exchange rate in model Currency.
        """
        try:
            with open(
                    f'./data/{OUTPUT_FILE}',
                    encoding='utf-8'
            ) as file:
                data = load(file)
                for content in data.values():
                    Currency.objects.create(
                        name=content['base_code'],
                        rates=content['conversion_rates'],
                        date=content['time_last_update_utc'],
                    )
        except Exception as error:
            self.stdout.write(self.style.ERROR(f'{error}'))
        self.stdout.write(self.style.SUCCESS('Загрузка данных завершена'))
