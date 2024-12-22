from django.contrib import admin

from .models import Currency, Rates


#class CurrencyInline(admin.TabularInline):
#    model = Rates
#    min_num = 1
#    extra = 0


@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
    pass
#    inlines = (
#        CurrencyInline,
#    )
#    list_display = (
#        'name',
#        'date',
#    )
#    list_display_links = (
#        'name',
#    )
#    search_fields = (
#        'name',
#    )
#    list_filter = (
#        'name',
#    )


@admin.register(Rates)
class RatesAdmin(admin.ModelAdmin):
    pass


admin.site.empty_value_display = 'Не задано'
