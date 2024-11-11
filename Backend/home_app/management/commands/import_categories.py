from django.core.management.base import BaseCommand
import os, json
from home_app.models import Category

class Command(BaseCommand):
    help = 'Import users from JSON data'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(os.path.dirname(__file__), '../../Json/Categories.json')

        # Load JSON data from the file
        with open(json_file_path, 'r') as json_file:
            json_data = json.load(json_file)
        
        categories_data = json_data[0]["rows"]
        
        for category_data in categories_data:

            category_id          = int(category_data[0])
            category_name        = category_data[1]
            category_description = category_data[2]

            # Create category instance
            category = Category(
                id          = category_id,
                name        = category_name,
                description = category_description
            )

            # Save User instance
            category.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully imported category: {category_name}'))
