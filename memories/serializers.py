# memories/serializers.py
from rest_framework import serializers
from .models import ClassmateMemory

class ClassmateMemorySerializer(serializers.ModelSerializer):
    photo_url = serializers.SerializerMethodField()

    class Meta:
        model = ClassmateMemory
        fields = ('id', 'name', 'story', 'photo', 'photo_url', 'slug', 'created_at')

    def get_photo_url(self, obj):
        request = self.context.get('request')
        if obj.photo and request:
            return request.build_absolute_uri(obj.photo.url)
        return None
