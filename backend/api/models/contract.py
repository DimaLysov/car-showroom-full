from django.db import models
from django.utils import timezone

from api.models import Car


class Contract(models.Model):
    date = models.DateTimeField(default=timezone.now)
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=100)

    def __str__(self):
        return f'контракт N{self.pk} - {self.car} ({self.date})'

    class Meta:
        verbose_name = 'Контракт'
        verbose_name_plural= 'Контракты'