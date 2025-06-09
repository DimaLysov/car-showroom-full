from drf_spectacular.utils import extend_schema
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from api.models import Brand
from api.serializers.brand import BrandSerializer


@extend_schema(tags=['Brand'])
class BrandViewSet(mixins.ListModelMixin,
                      GenericViewSet):
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()