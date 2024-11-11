# Generated by Django 5.1.1 on 2024-11-11 20:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home_app', '0004_alter_order_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('complete', 'Complete'), ('cancel', 'Cancel')], default='pending', max_length=50),
        ),
    ]