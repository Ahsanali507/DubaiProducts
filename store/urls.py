from django.urls import path
from . import views

urlpatterns = [
    path('', views.store, name='Store'),
    path('Cart/', views.cart, name='Cart'),
    path('Checkout/', views.checkout, name='Checkout'),
]