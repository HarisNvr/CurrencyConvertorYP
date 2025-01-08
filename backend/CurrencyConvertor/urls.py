from django.contrib.admin import site
from django.urls import path, include

urlpatterns = [
    path('admin/', site.urls),
    path('api/', include('api.urls'))
]
