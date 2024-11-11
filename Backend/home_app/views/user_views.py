from home_app.models import * 
from ..serilaizers.user_serializers import *
from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        serializer = User_InfoSerializer(user.user_profile).data

        for key,value in serializer.items():
            token[key] = value
        token['user_profile'] = user.user_profile.id
        token['is_Admin'] = user.is_superuser
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Create your views here.
class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [JWTAuthentication,]
    permission_classes = [permissions.IsAuthenticated,]

    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        
        # Regular users can only access their own profile
        return User.objects.filter(id =self.request.user.id)

class Profile_UsersViewSet(viewsets.ModelViewSet):
    queryset = User_Profile.objects.all()
    serializer_class = Profile_UserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated,]
    
    def get_queryset(self):
        # Superusers can access all profiles
        if self.request.user.is_superuser:
            return User_Profile.objects.all()
        
        # Regular users can only access their own profile
        return User_Profile.objects.filter(user=self.request.user)
    