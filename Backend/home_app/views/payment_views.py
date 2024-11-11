# Initialize Stripe with your secret key
import json
import stripe
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view

stripe.api_key = settings.STRIPE_SECRET_KEY

@api_view(['POST'])
def create_payment_intent(request):
    try:
        data = json.loads(request.body)
        amount = data.get('amount')

        intent = stripe.PaymentIntent.create(
            amount=amount,  # Amount in cents (e.g., 1000 = $10)
            currency='usd',
            payment_method_types=['card'],
        )

        #return JsonResponse({'clientSecret': intent['client_secret']})
        return JsonResponse({'clientSecret': intent.client_secret})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

