from os import environ

from celery import Celery
from celery.beat import crontab

from CurrencyConvertor.settings import DEBUG

environ.setdefault('DJANGO_SETTINGS_MODULE', 'CurrencyConvertor.settings')
app = Celery(
    'celery',
    broker_connection_retry=False,
    broker_connection_retry_on_startup=True,
)
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
app.conf.enable_utc = True

app.conf.beat_schedule = {
    'update_rate_every_single_day': {
        'task': 'api.tasks.update_course_db_task',
        'schedule': crontab(minute='30', hour='0', day_of_week='*'),
    },
}
