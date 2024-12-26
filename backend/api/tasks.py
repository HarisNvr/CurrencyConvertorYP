from CurrencyConvertor.celery import app

from api.utils import get_and_save_all_rates


@app.task
def update_course_db_task() -> None:
    """
    Updates the exchange rates in the database.

    This task function is triggered by Celery beat and calls the
    `get_and_save_all_rates` function to fetch and save the latest exchange
    rates. If an error occurs during the update process, a task failure is
    raised.

    :return: None
    """
    get_and_save_all_rates()
