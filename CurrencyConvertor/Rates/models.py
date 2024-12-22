from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator
from django.db import models

from .constants import CURRENCY_LEN, SLICE_LENGTH, MIN_VALUE


User = get_user_model()


class Currency(models.Model):
    ### Модель валюты###
    name = models.CharField(
        verbose_name='Название валюты',
        max_length=CURRENCY_LEN,
        unique=True,
    )
    date = models.DateTimeField(
        verbose_name='Дата запроса курса',
        auto_now_add=True,
    )

    class Meta:
        ordering = ('name',)
        verbose_name = 'Валюта'
        verbose_name_plural = 'Валюта'
        constraints = (
            models.UniqueConstraint(
                fields=('name', 'date',),
                name='unique_currency',
            ),
        )

    def __str__(self):
        return self.name[:SLICE_LENGTH]


class Rates(models.Model):
    ### Модель истории курсов валют###
    currency = models.ForeignKey(
        Currency,
        verbose_name='Курс валюты',
        related_name='rates'
        on_delete=models.CASCADE,
    )
    currency_code = models.CharField(
        verbose_name='Код валюты',
        max_length=CURRENCY_LEN,
        unique=True,
    )
    amount = models.FloatField(
        verbose_name='Значение курса валюты',    
        validators=(
            MinValueValidator(
                MIN_VALUE,
                message=f'Значение курса валюты не менее {MIN_VALUE}!'
            ),
        ),
    )

    class Meta:
        verbose_name = "Rate"
        verbose_name_plural = "Rates"
        constraints = (
            models.UniqueConstraint(
                fields=('currency', 'currency_code',),
                name='unique_rate',
            ),
        )


    def __str__(self):
        return f"{self.currency_code}: {self.amount[:SLICE_LENGTH]}"
