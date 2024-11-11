from django.core.management.base import BaseCommand
from django.utils import timezone
import os, json
from home_app.models import Review, User_Profile, Product

class Command(BaseCommand):
    help = 'Import users from JSON data'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(os.path.dirname(__file__), '../../Json/Reviews.json')

        # Load JSON data from the file
        with open(json_file_path, 'r') as json_file:
            json_data = json.load(json_file)
        

        reviews_data = json_data[0]["rows"]
        
        for review_data in reviews_data:

            review_id           = int(review_data[0])
            review              = review_data[1]
            created_at          = timezone.make_aware(timezone.datetime.fromisoformat(review_data[2])) if review_data[2] != "NULL" else None
            review_product      = review_data[3]
            review_user         = review_data[4]
            review_rating       = review_data[5]
            

            # Create Review instance
            review = Review(
                id          = review_id,
                review      = review,
                created_at  = created_at,
                product     = Product.objects.get(id=review_product),
                user        = User_Profile.objects.get(id=review_user),
                rating      = review_rating
            )

            # Save Review instance
            review.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully imported product {review_id}'))