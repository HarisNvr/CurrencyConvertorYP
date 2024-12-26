from CurrencyConvertor.celery import app
from api.views import update_course_db


@app.task
def update_course_db_task() -> None:
    update_course_db()
