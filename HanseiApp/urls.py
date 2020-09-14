from django.urls import path

from . import views

app_name = 'Hansei'
urlpatterns = [
    # ex: /polls/
    path('', views.loginpage, name='loginpage'),
    path('signinpage', views.signinpage, name='signinpage'),
    path('login', views.login, name='login'),
    path('signin', views.signin, name='signin'),
    path('logout', views.logout, name='logout'),
    path('index', views.index, name='index'),
    path('manual', views.manual, name='manual'),
    path('timetableSubmit', views.timetableSubmit, name='timetableSubmit'),
    path('timetable', views.timetable, name='timetable'),
    path('examples', views.examples, name='examples'),
    path('classinfo', views.classinfo, name='classinfo'),
    path('timetableimport', views.timetableimport, name='timetableimport'),
]