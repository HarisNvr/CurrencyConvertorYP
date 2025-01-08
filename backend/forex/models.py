from django.db import models
from django.utils.timezone import localtime


class Course(models.Model):
    """
    The currency history model.
    """

    date = models.DateTimeField(
        verbose_name='Дата актуальности курса',
        auto_now_add=True
    )
    date_unix = models.BigIntegerField(
        verbose_name='Дата актуальности курса в unix-epoch формате',
        default=int
    )
    rates = models.JSONField(
        verbose_name='Курсы валют',
        default=dict
    )

    class Meta:
        ordering = ('date',)
        verbose_name = 'Курс валют'
        verbose_name_plural = 'Курсы валют'

    def __str__(self):
        return localtime(self.date).strftime('%Y-%m-%d %H:%M:%S')
