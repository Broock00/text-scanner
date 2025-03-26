from django.urls import path
from .views import ScanTextAPIView

urlpatterns = [
    path('scan/', ScanTextAPIView.as_view(), name='scan-text'),
]