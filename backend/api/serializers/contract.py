from rest_framework import serializers

from api.models import Contract


class ContractSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contract
        fields = '__all__'

class ContractListSerializer(serializers.ModelSerializer):
    model = serializers.CharField(source='car.model')
    price = serializers.IntegerField(source='car.price')
    image_url = serializers.ImageField(source='car.image_url')

    class Meta:
        model = Contract
        fields = ['id', 'model', 'price', 'image_url', 'date', 'payment_method']