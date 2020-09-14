from django.db import models
from django.conf import settings

class ScheduleInfo(models.Model):
    Memo = models.TextField(null=True)
    TimetableCellInfo = models.TextField(null=True)
    Inputdate = models.DateTimeField('date published')
    User = models.ForeignKey(settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE)
    
    def Memo_(self):
        return self.Memo
    def TimetableCellInfo_(self):
        return self.TimetableCellInfo
    def Inputdate_(self):
        return self.Inputdate
    def User_(self):
        return self.User


class ClassesInfo(models.Model):
    ClassInfo = models.TextField(null=True)

    def ClassInfo_(self):
        return self.ClassInfo

class Document(models.Model):#파일 받기 위한
    ImpertedExcel = models.TextField(null=True)