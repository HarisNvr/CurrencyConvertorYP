from forex.models import Course


def save_current_history(rates: dict) -> None:
    """
    Saves the course history in PostgreSQL database.

    :param rates: The exchange rate to be stored, represented as a dictionary.
    :return: None
    """

    Course.objects.create(rates=rates)
