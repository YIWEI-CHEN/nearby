from enum import Enum

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls):
        choices = list()
        # Loop thru defined enums
        for item in cls:
            choices.append((item.value, item.name))
        # return as tuple
        return tuple(choices)

    def __str__(self):
        return self.name

    def __int__(self):
        return self.value


class CaseStatus(ChoiceEnum):
    INIT = 0
    DECISION = 1  # wait for provider decision
    ACCEPT = 2  # provider accept
    DECLINE = 3  # provider decline
    DOING = 4
    DONE = 5


class CareCase(models.Model):
    time = models.DateTimeField(_('service time'))
    note = models.TextField(_('note'), blank=True, null=True)
    provider = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name=_('provider'),
    )
    taker = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name=_('taker'),
    )
    provider_feedback = models.TextField(_('provider feedback'), blank=True, null=True)
    taker_feedback = models.TextField(_('taker feedback'), blank=True, null=True)
    star = models.IntegerField(_('star'), default=5.0, blank=True)
    status = models.IntegerField(_('status'), choices=ChoiceEnum.choices(), default=int(CaseStatus.INIT))
    # video = models.FileField(_('video'), upload_to='/static/videos', null=True)


class CareService(models.Model):
    name = models.CharField(_('care service name'), max_length=30)
    price = models.IntegerField(_('price'))
    checked = models.BooleanField(_('checked'), default=False, blank=True)
    case = models.ForeignKey(CareCase, on_delete=models.CASCADE)

    def __str__(self):
        return '{} costs {}'.format(self.name, self.price)
