from django.core.management.base import BaseCommand
import os, json
from django.contrib.auth.models import User
from django.utils import timezone

class Command(BaseCommand):
    help = 'Import users from JSON data'

    def handle(self, *args, **kwargs):
        json_file_path = os.path.join(os.path.dirname(__file__), '../../Json/User.json')

        # Load JSON data from the file
        with open(json_file_path, 'r') as json_file:
            json_data = json.load(json_file)
        
        users_data = json_data[0]["rows"]
        
        for user_data in users_data:

            user_id = int(user_data[0])
            password = user_data[1]
            is_superuser = bool(int(user_data[3]))
            username = user_data[4]
            last_name = user_data[5] if user_data[5] else ''
            email = user_data[6]
            is_staff = bool(int(user_data[7]))
            is_active = bool(int(user_data[8]))
            date_joined = timezone.make_aware(timezone.datetime.fromisoformat(user_data[9])) if user_data[9] != "NULL" else None
            first_name=user_data[10] if user_data[10] else ''
            
            # Create User instance
            user = User(
                id=user_id,
                username=username,
                email=email,
                is_superuser=is_superuser,
                is_staff=is_staff,
                is_active=is_active,
                date_joined=date_joined,
                first_name=first_name,
                last_name=last_name
            )
            user.set_password(password)
            
            # Save User instance
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully imported user {username}'))
