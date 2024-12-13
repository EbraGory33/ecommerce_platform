from rest_framework import serializers
from home_app.models import Product, Category, Review
from .user_serializers import Profile_UserSerializer

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='User_Profile.id')
    category = serializers.SlugRelatedField(queryset=Category.objects.all(), slug_field='name')
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        return obj.image.url if obj.image else None

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'seller', 'price', 'description', 'stock', 'image']
        read_only_fields = ['id', 'seller', 'created_at']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    user = Profile_UserSerializer()  
    product = ProductSerializer()  

    class Meta:
        model = Review
        fields = '__all__'

