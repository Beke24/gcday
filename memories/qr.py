# memories/qr.py
import io
import qrcode
from django.http import HttpResponse
from django.conf import settings
from .models import ClassmateMemory

def qr_for_slug(request, slug):
    try:
        mem = ClassmateMemory.objects.get(slug=slug)
    except ClassmateMemory.DoesNotExist:
        return HttpResponse(status=404)

    # Build the public URL to the React detail page
    url = f"{settings.SITE_URL}/memories/{mem.slug}"

    img = qrcode.make(url)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)

    return HttpResponse(buf.read(), content_type='image/png')
