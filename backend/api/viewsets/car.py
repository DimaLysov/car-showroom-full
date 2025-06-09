from drf_spectacular.utils import extend_schema
from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from api.models import Car
from api.serializers.car import CarSerializer


@extend_schema(tags=['Car'])
class CarViewSet(GenericViewSet):
    serializer_class = CarSerializer
    queryset = Car.objects.all()

    @action(detail=False, methods=['get'], url_path='by-brand/(?P<brand_id>[^/.]+)')
    def get_product_by_category(self, request, brand_id=None):
        products = self.queryset.filter(brand=brand_id)
        serializer = self.serializer_class(products, many=True, context={'request': request})
        return Response(serializer.data)
