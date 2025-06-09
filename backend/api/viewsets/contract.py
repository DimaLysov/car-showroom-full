from drf_spectacular.utils import extend_schema
from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from api.models import Contract
from api.serializers.contract import ContractSerializer, ContractListSerializer


@extend_schema(tags=['Contract'])
class ContractViewSet(mixins.CreateModelMixin,
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet):
    serializer_class = ContractSerializer
    queryset = Contract.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ContractListSerializer
        return ContractSerializer