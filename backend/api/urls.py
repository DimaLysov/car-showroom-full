from django.urls import path, include
from rest_framework import routers

from .viewsets.brand import BrandViewSet
from .viewsets.contract import ContractViewSet
from .viewsets.car import CarViewSet


router = routers.DefaultRouter()
router.register(r'brand', BrandViewSet)
router.register(r'contract', ContractViewSet)
router.register(r'car', CarViewSet)

urlpatterns = [
    path('', include(router.urls)),
]