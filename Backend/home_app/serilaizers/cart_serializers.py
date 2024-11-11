from rest_framework import serializers
from home_app.models import Cart, CartItem, Product
from home_app.serilaizers.user_serializers import Profile_UserSerializer
from home_app.serilaizers.product_serializers import ProductSerializer 

class CartSerializer(serializers.ModelSerializer):
    user = Profile_UserSerializer()  

    class Meta:
        model = Cart
        fields = '__all__'

class CartProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image'] 

class CartItemsSerializer(serializers.ModelSerializer):
    product_id = serializers.IntegerField(source='product.id')
    name = serializers.CharField(source='product.name')
    price = serializers.DecimalField(source='product.price', max_digits=10, decimal_places=2)
    image = serializers.SerializerMethodField()
    quantity = serializers.IntegerField()

    def get_image(self, obj):
        return obj.product.image.url if obj.product.image else None

    class Meta:
        model = CartItem
        fields = ['product_id', 'name', 'price', 'image', 'quantity']


