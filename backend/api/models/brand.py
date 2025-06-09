from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=100)
    image_url = models.ImageField(upload_to='images', default='images/img.png')

    def __str__(self):
        return f'{self.name}'

    class Meta:
        verbose_name = 'Бренд'
        verbose_name_plural= 'Бренды'