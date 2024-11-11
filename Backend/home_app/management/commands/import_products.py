from django.core.management.base import BaseCommand
from django.utils import timezone
import os, json
from home_app.models import Category, User_Profile, Product

class Command(BaseCommand):
    help = 'Import users from JSON data'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(os.path.dirname(__file__), '../../Json/Products.json')

        # Load JSON data from the file
        with open(json_file_path, 'r') as json_file:
            json_data = json.load(json_file)
        

        products_data = json_data[0]["rows"]
        
        for product_data in products_data:

            product_id          = int(product_data[0])
            product_name        = product_data[1]
            product_description = product_data[2]
            product_stock       = product_data[3]
            created_at          = timezone.make_aware(timezone.datetime.fromisoformat(product_data[4])) if product_data[4] != "NULL" else None
            product_price       = product_data[5]
            product_category    = Category.objects.get(id=product_data[6])
            product_seller      = User_Profile.objects.get(id=product_data[7])
            product_image       = product_data[8]

            # Create Product instance
            product = Product(
                id          = product_id,
                name        = product_name,
                description = product_description,
                stock       = product_stock,
                created_at  = created_at,
                price       = product_price,
                category    = product_category,
                seller      = product_seller,
                image       = product_image
            )

            # Save Product instance
            product.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully imported product {product_name}'))