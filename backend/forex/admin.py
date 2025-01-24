from django.contrib import admin

from forex.models import ExchangeRate


class CourseAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Course model.

    This class customizes the display of the Course model in the Django admin
    interface. It specifies which fields to display in the list view and
    customizes the display of the `rates` field.
    """
    list_display = ('date', 'short_rates')

    def short_rates(self, obj):
        """
        Returns a string indicating that the field contains a JSON dictionary.

        This method is used to display a simplified representation of the
        `rates` field in the admin list view. It will always return the string
        'JSON словарь'.

        :param obj: The model instance (Course) for which the method is called.
        :return: The string 'JSON словарь'.
        """
        return 'JSON словарь'

    short_rates.admin_order_field = 'date'
    short_rates.short_description = 'Currency rates'


admin.site.register(ExchangeRate, CourseAdmin)
