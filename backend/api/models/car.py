from django.db import models

from api.models import Brand


class Car(models.Model):
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    model = models.CharField(max_length=100)
    price = models.BigIntegerField()
    year = models.CharField()
    image_url = models.ImageField(upload_to='images', default='images/img.png')

    def __str__(self):
        return f'{self.brand} {self.model} ({self.year}) - {self.price}'

    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural= 'Автомобили'
