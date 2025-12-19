# memories/views.py
from rest_framework import viewsets, permissions
from .models import ClassmateMemory
from .serializers import ClassmateMemorySerializer

class ClassmateMemoryViewSet(viewsets.ModelViewSet):
    queryset = ClassmateMemory.objects.order_by('-created_at')
    serializer_class = ClassmateMemorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

