# Generated by Django 5.1.4 on 2024-12-25 08:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True, verbose_name='Дата запроса курса')),
                ('rates', models.JSONField(default=dict, verbose_name='Курсы валют')),
            ],
            options={
                'verbose_name': 'Курс валют',
                'verbose_name_plural': 'Курсы валют',
                'ordering': ('date',),
            },
        ),
    ]
