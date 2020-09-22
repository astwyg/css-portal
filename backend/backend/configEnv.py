# this file should be placed in *backend/backend/*

import os
import environ
import json

env = environ.Env()
# reading .env file
environ.Env.read_env()

SECRET_KEY = env("SECRET_KEY")

UDESK = {
    "entry": env("UDESK_ENTRY"),
    "admin_email": env("UDESK_ADMIN_EMAIL"),
    "admin_passwd": env("UDESK_ADMIN_PASSWD"),

    # v1 use
    "secret": env("UDESK_V1_SECRET"),
    "web_im_key":env("UDESK_V1_WEB_IM_KEY"),
}

BATCH_INVITE_SECRET = env("BATCH_INVITE_SECRET")
BACKDOOR_INVITE_CODE = env("BACKDOOR_INVITE_CODE")

###

DEBUG = env("NISP_DEBUG")

if DEBUG == 'True' :
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': env("DB_NAME"),
            'USER': env("DB_USER"),
            'PASSWORD': env("DB_PASSWORD"),
            'HOST': env("DB_HOST"),
            'PORT': env("DB_PORT"),
        }
    }
