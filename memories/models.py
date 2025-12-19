# memories/models.py
from django.db import models
from django.utils.text import slugify

class ClassmateMemory(models.Model):
    name = models.CharField(max_length=100)
    story = models.TextField(blank=True)
    photo = models.ImageField(upload_to='photos/')
    slug = models.SlugField(unique=True, blank=True, max_length=120)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            base = slugify(self.name)
            candidate = base
            i = 1
            while ClassmateMemory.objects.filter(slug=candidate).exists():
                i += 1
                candidate = f"{base}-{i}"
            self.slug = candidate
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.slug})"

