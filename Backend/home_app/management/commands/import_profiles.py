from django.core.management.base import BaseCommand
import os, json
from home_app.models import User_Profile, User
from django.utils import timezone

class Command(BaseCommand):
    help = 'Import users from JSON data'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(os.path.dirname(__file__), '../../Json/User_Profile.json')

        # Load JSON data from the file
        with open(json_file_path, 'r') as json_file:
            json_data = json.load(json_file)
        
        
        profiles_data = json_data[0]["rows"]
        
        for profile_data in profiles_data:

            profile_id = int(profile_data[0])
            phone = profile_data[1]
            email = profile_data[2]
            is_register_seller = bool(int(profile_data[3]))
            date_joined = timezone.make_aware(timezone.datetime.fromisoformat(profile_data[4])) if profile_data[4] != "NULL" else None
            first_name = profile_data[5]
            last_name = profile_data[6]
            user= User.objects.get(id=profile_data[7])

            # Create User instance
            user_Profile = User_Profile(
                id                  =profile_id,
                user                =user,
                first_name          =first_name,
                last_name           =last_name,
                phone               =phone,
                email               =email,
                is_register_seller  =is_register_seller,
                date_joined         =date_joined
            )

            # Save User instance
            user_Profile.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully imported profile user: {first_name}'))
