# Generated by Django 2.2.6 on 2019-10-27 04:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nearby', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='greeting',
            name='when',
            field=models.DateTimeField(auto_now_add=True, verbose_name='date created'),
        ),
    ]
