# Generated by Django 5.1.1 on 2024-10-24 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_app', '0003_alter_order_status_alter_orderitem_item_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('complete', 'Complete')], default='pending', max_length=50),
        ),
    ]