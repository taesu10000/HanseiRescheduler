from django import forms

class UploadFileForm(forms.Form):
    sheetName = forms.CharField()
    Excelimport = forms.FileField()
    FileName = forms.CharField()
    sheetRowCnt = forms.CharField()
    sheetCloCnt= forms.CharField()