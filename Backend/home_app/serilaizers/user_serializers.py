from rest_framework import serializers
from home_app.models import * 

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class Profile_UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Profile
        fields = '__all__'

class User_InfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Profile
        fields = ['first_name', 'last_name', 'phone', 'email', 'date_joined']
