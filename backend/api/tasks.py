from datetime import datetime
from json import dumps

from api.utils import get_and_save_all_rates
from CurrencyConvertor.celery import app

from backend.CurrencyConvertor.settings import LOG_FILE


def log_to_json(message):
    log_entry = {"time": datetime.now().isoformat(), "message": message}
    with open(LOG_FILE, "a") as f:
        f.write(dumps(log_entry) + "\n")


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
    log_to_json("Task update_course_db_task started.")
    try:
        get_and_save_all_rates()
        log_to_json("Exchange rates updated successfully.")
    except Exception as e:
        log_to_json(f"Error occurred while updating exchange rates: {str(e)}")
