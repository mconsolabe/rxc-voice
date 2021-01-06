from rest_framework import serializers
from django.contrib.auth import authenticate
from guardian.shortcuts import assign_perm
from django.utils.translation import gettext_lazy as _
import uuid

from .utils import mailcredits

from .models import Election, Vote, Proposal, Delegate, Conversation, Process, Transfer
from django.contrib.auth.models import (User, Group, Permission)


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = '__all__'

    def create(self, validated_data):
        conversation = Conversation.objects.create(
            uuid=uuid.uuid1(),
            title=validated_data.get('title'),
            description=validated_data.get('description'),
            start_date=validated_data.get('start_date'),
            end_date=validated_data.get('end_date'),
            )
        conversation.groups.set(validated_data.get('groups', []))
        return conversation


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

    def create(self, validated_data):
        election = Election.objects.get(pk=self.context.get("election_id"))
        sender = validated_data['sender']
        assign_perm('can_view_results', sender, election)

        vote = Vote.objects.create(
            sender=sender,
            proposal=validated_data['proposal'],
            amount=validated_data['amount'],
            date=validated_data['date'],
        )
        return vote


class ProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proposal
        fields = '__all__'


class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = '__all__'


class TransferSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transfer
        fields = '__all__'

    def create(self, validated_data):
        recipient_data = validated_data.get('recipient')
        sender_data = validated_data.get('sender')
        recipient_autogenerated = recipient_data.is_autogenerated
        mailcredits(validated_data.get('amount'), validated_data.get('sender'), recipient_data.user.email)
        transfer = Transfer.objects.create(
            sender=sender_data,
            recipient=recipient_data,
            amount=validated_data.get('amount'),
            date=validated_data.get('date'),
            status=('A' if recipient_autogenerated else 'P'),
            process=validated_data.get('process'),
            )
        # Uncommment for real time transfers (credits are transferred immediately rather than at the end of process). Transfers will still be cancelled at end of process if not accepted.
        # recipient_data.credit_balance += validated_data.get('amount')
        # sender_data.credit_balance -= validated_data.get('amount')
        # recipient_data.save()
        # sender_data.save()
        return transfer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': False},
            'email': {'required': True},
            }

    def create(self, validated_data, is_autogenerated):
        """
        autogenerated user: set uuid as username.

        standard user: conceal password and set email as username.
        """
        if is_autogenerated:
            validated_data['username'] = validated_data.get('password', '')
        else:
            validated_data['username'] = validated_data.get('email', '')
        user = User(
            username=validated_data.get('username'),
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            email=validated_data.get('email'),
            is_staff=validated_data.get('is_staff', False),
            is_superuser=validated_data.get('is_superuser', False),
        )
        user.set_password(validated_data['password'])
        user.save()
        user.groups.set(validated_data.get('groups', []))
        return user


class DelegateSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=True)

    class Meta:
        model = Delegate
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.get('user')
        is_autogenerated = validated_data.get('is_autogenerated', False)
        user = UserSerializer.create(
            UserSerializer(),
            validated_data=user_data,
            is_autogenerated=is_autogenerated)
        delegate, created = Delegate.objects.update_or_create(
            user=user,
            is_autogenerated=is_autogenerated,
            profile_pic=validated_data.get('profile_pic'),
            phone_number=validated_data.get('phone_number', ''),
            invited_by=validated_data.get('invited_by'),
            credit_balance=validated_data.get('credit_balance', 0),
            )
        return delegate

    def update(self, instance, validated_data):
        Transfer.objects.filter(recipient=instance.id).filter(status='P').update(status='A')
        user_data = validated_data.get('user')
        user = UserSerializer.create(
            UserSerializer(),
            validated_data=user_data,
            is_autogenerated=is_autogenerated)
        delegate = instance.update(
            user=user,
            is_autogenerated=False,
            profile_pic=validated_data.get('profile_pic'),
            phone_number=validated_data.get('phone_number', ''),
            credit_balance=validated_data.get('credit_balance', 0),
            )
        return delegate


class CustomAuthTokenSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label=_("Email"),
        write_only=True
        )
    password = serializers.CharField(
        label=_("Password",),
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )
    token = serializers.CharField(
        label=_("Token"),
        read_only=True
    )

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'),
                                email=email, password=password)
            """
            The authenticate call simply returns None for is_active=False
            users. (Assuming the default ModelBackend authentication
            backend.)
            """
            if not user:
                msg = _('Unable to log in with provided credentials.')
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = _('Must include "email" and "password".')
            raise serializers.ValidationError(msg, code='authorization')

        attrs['user'] = user
        return attrs


class ProcessSerializer(serializers.ModelSerializer):
    delegates = DelegateSerializer(many=True)
    conversation = ConversationSerializer()
    election = ElectionSerializer()

    class Meta:
        model = Process
        fields = '__all__'

    def create(self, validated_data):
        conversation_data = validated_data.get('conversation')
        if conversation_data is not None:
            conversation_data = ConversationSerializer.create(
                ConversationSerializer(),
                validated_data=conversation_data,
                )
        election_data = validated_data.get('election')
        if election_data is not None:
            election_data = ElectionSerializer.create(
                ElectionSerializer(),
                validated_data=election_data,
            )
        process, created = Process.objects.update_or_create(
            title=validated_data.get('title'),
            description=validated_data.get('description'),
            start_date=validated_data.get('start_date'),
            end_date=validated_data.get('end_date'),
            matching_pool=validated_data.get('matching_pool'),
            conversation=conversation_data,
            curation_info=validated_data.get('curation_info'),
            top_posts=validated_data.get('top_posts', []),
            election=election_data,
            )
        process.groups.set(validated_data.get('groups', []))
        process.delegates.set(validated_data.get('delegates', []))
        return process
