from django.contrib import admin
from .models import ScheduleInfo, ClassesInfo, Document
# Register your models here.
admin.site.register(ScheduleInfo)
admin.site.register(ClassesInfo)
admin.site.register(Document)