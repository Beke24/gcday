# memories/admin.py
from django.contrib import admin
from .models import ClassmateMemory

@admin.register(ClassmateMemory)
class ClassmateMemoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'story', 'slug')

