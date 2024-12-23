from django.db import models

from .constants import CURRENCY_LEN, SLICE_LENGTH


class Currency(models.Model):
    """
    The currency history model
    """
    name = models.CharField(
        verbose_name='Название валюты',
        max_length=CURRENCY_LEN,
        unique=True,
    )
    date = models.DateTimeField(
        verbose_name='Дата запроса курса',
        auto_now_add=True,
    )
    rates = models.JSONField(
        verbose_name='Запрос курсов валют',
        default=dict
    )

    class Meta:
        ordering = ('name',)
        verbose_name = 'История валют'
        verbose_name_plural = 'Истории валют'
        constraints = (
            models.UniqueConstraint(
                fields=('name', 'date',),
                name='unique_currency',
            ),
        )

    def __str__(self):
        return f'{self.name[:SLICE_LENGTH]}: {self.date}'
