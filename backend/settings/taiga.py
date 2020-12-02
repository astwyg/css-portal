import sys

TAIGA_USER_MODEL = "users.User"
FORMAT_MODULE_PATH = "taiga.base.formats"

DATE_INPUT_FORMATS = (
    "%Y-%m-%d", "%m/%d/%Y", "%d/%m/%Y", "%b %d %Y",
    "%b %d, %Y", "%d %b %Y", "%d %b, %Y", "%B %d %Y",
    "%B %d, %Y", "%d %B %Y", "%d %B, %Y"
)

# Authentication settings (only for django admin)
AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend", # default
)

MAX_AGE_AUTH_TOKEN = None
MAX_AGE_CANCEL_ACCOUNT = 30 * 24 * 60 * 60 # 30 days in seconds

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # Mainly used by taiga-front
        "taiga.auth.backends.Token",

        # Mainly used for api debug.
        "taiga.auth.backends.Session",

        # Application tokens auth
        "taiga.external_apps.auth_backends.Token",
    ),
    "DEFAULT_THROTTLE_CLASSES": (
        "taiga.base.throttling.CommonThrottle",
    ),
    "DEFAULT_THROTTLE_RATES": {
        "anon-write": None,
        "user-write": None,
        "anon-read": None,
        "user-read": None,
        "import-mode": None,
        "import-dump-mode": "1/minute",
        "create-memberships": None,
        "login-fail": None,
        "register-success": None,
        "user-detail": None,
        "user-update": None,
    },
    "DEFAULT_THROTTLE_WHITELIST": [],
    "FILTER_BACKEND": "taiga.base.filters.FilterBackend",
    "EXCEPTION_HANDLER": "taiga.base.exceptions.exception_handler",
    "PAGINATE_BY": 30,
    "PAGINATE_BY_PARAM": "page_size",
    "MAX_PAGINATE_BY": 1000,
    "DATETIME_FORMAT": "%Y-%m-%dT%H:%M:%S%z"
}

# Extra expose header related to Taiga APP (see taiga.base.middleware.cors=)
APP_EXTRA_EXPOSE_HEADERS = [
    "taiga-info-total-opened-milestones",
    "taiga-info-total-closed-milestones",
    "taiga-info-project-memberships",
    "taiga-info-project-is-private",
    "taiga-info-order-updated"
]

DEFAULT_PROJECT_TEMPLATE = "scrum"
# Setting DEFAULT_PROJECT_SLUG_PREFIX to false removes the username from project slug
DEFAULT_PROJECT_SLUG_PREFIX = True
PUBLIC_REGISTER_ENABLED = False
# None or [] values in USER_EMAIL_ALLOWED_DOMAINS means allow any domain
USER_EMAIL_ALLOWED_DOMAINS = None

PRIVATE_USER_PROFILES = False

SEARCHES_MAX_RESULTS = 150

SOUTH_MIGRATION_MODULES = {
    'easy_thumbnails': 'easy_thumbnails.south_migrations',
}


THN_AVATAR_SIZE = 80                # 80x80 pixels
THN_AVATAR_BIG_SIZE = 300           # 300x300 pixels
THN_LOGO_SMALL_SIZE = 80            # 80x80 pixels
THN_LOGO_BIG_SIZE = 300             # 300x300 pixels
THN_TIMELINE_IMAGE_SIZE = 640       # 640x??? pixels
THN_CARD_IMAGE_WIDTH = 300          # 300 pixels
THN_CARD_IMAGE_HEIGHT = 200         # 200 pixels
THN_PREVIEW_IMAGE_WIDTH = 800       # 800 pixels

THN_AVATAR_SMALL = "avatar"
THN_AVATAR_BIG = "big-avatar"
THN_LOGO_SMALL = "logo-small"
THN_LOGO_BIG = "logo-big"
THN_ATTACHMENT_TIMELINE = "timeline-image"
THN_ATTACHMENT_CARD = "card-image"
THN_ATTACHMENT_PREVIEW = "preview-image"

THUMBNAIL_ALIASES = {
    "": {
        THN_AVATAR_SMALL: {"size": (THN_AVATAR_SIZE, THN_AVATAR_SIZE), "crop": True},
        THN_AVATAR_BIG: {"size": (THN_AVATAR_BIG_SIZE, THN_AVATAR_BIG_SIZE), "crop": True},
        THN_LOGO_SMALL: {"size": (THN_LOGO_SMALL_SIZE, THN_LOGO_SMALL_SIZE), "crop": True},
        THN_LOGO_BIG: {"size": (THN_LOGO_BIG_SIZE, THN_LOGO_BIG_SIZE), "crop": True},
        THN_ATTACHMENT_TIMELINE: {"size": (THN_TIMELINE_IMAGE_SIZE, 0), "crop": True},
        THN_ATTACHMENT_CARD: {"size": (THN_CARD_IMAGE_WIDTH, THN_CARD_IMAGE_HEIGHT), "crop": True},
        THN_ATTACHMENT_PREVIEW: {"size": (THN_PREVIEW_IMAGE_WIDTH, 0), "crop": False},
    },
}

TAGS_PREDEFINED_COLORS = ["#fce94f", "#edd400", "#c4a000", "#8ae234",
                          "#73d216", "#4e9a06", "#d3d7cf", "#fcaf3e",
                          "#f57900", "#ce5c00", "#729fcf", "#3465a4",
                          "#204a87", "#888a85", "#ad7fa8", "#75507b",
                          "#5c3566", "#ef2929", "#cc0000", "#a40000",
                          "#2e3436",]

# Feedback module settings
FEEDBACK_ENABLED = True
FEEDBACK_EMAIL = "support@taiga.io"

# Stats module settings
STATS_ENABLED = False
STATS_CACHE_TIMEOUT = 60*60  # In second

# 0 notifications will work in a synchronous way
# >0 an external process will check the pending notifications and will send them
# collapsed during that interval
CHANGE_NOTIFICATIONS_MIN_INTERVAL = 0 #seconds


# List of functions called for filling correctly the ProjectModulesConfig associated to a project
# This functions should receive a Project parameter and return a dict with the desired configuration
PROJECT_MODULES_CONFIGURATORS = {
    "github": "taiga.hooks.github.services.get_or_generate_config",
    "gitlab": "taiga.hooks.gitlab.services.get_or_generate_config",
    "bitbucket": "taiga.hooks.bitbucket.services.get_or_generate_config",
    "gogs": "taiga.hooks.gogs.services.get_or_generate_config",
}

BITBUCKET_VALID_ORIGIN_IPS = ["131.103.20.165", "131.103.20.166", "104.192.143.192/28", "104.192.143.208/28"]

GITLAB_VALID_ORIGIN_IPS = []

EXPORTS_TTL = 60 * 60 * 24  # 24 hours

CELERY_ENABLED = False
WEBHOOKS_ENABLED = False
WEBHOOKS_BLOCK_PRIVATE_ADDRESS = False


# If is True /front/sitemap.xml show a valid sitemap of taiga-front client
FRONT_SITEMAP_ENABLED = False
FRONT_SITEMAP_CACHE_TIMEOUT = 24*60*60  # In second

EXTRA_BLOCKING_CODES = []

MAX_PRIVATE_PROJECTS_PER_USER = None # None == no limit
MAX_PUBLIC_PROJECTS_PER_USER = None # None == no limit
MAX_MEMBERSHIPS_PRIVATE_PROJECTS = None # None == no limit
MAX_MEMBERSHIPS_PUBLIC_PROJECTS = None # None == no limit

MAX_PENDING_MEMBERSHIPS = 30 # Max number of unconfirmed memberships in a project

from .sr import *

IMPORTERS = {
    "github": {
        "active": False,
        "client_id": "",
        "client_secret": "",
    },
    "trello": {
        "active": False,
        "api_key": "",
        "secret_key": "",
    },
    "jira": {
        "active": False,
        "consumer_key": "",
        "cert": "",
        "pub_cert": "",
    },
    "asana": {
        "active": False,
        "callback_url": "",
        "app_id": "",
        "app_secret": "",
    }
}

# NOTE: DON'T INSERT MORE SETTINGS AFTER THIS LINE
TEST_RUNNER="django.test.runner.DiscoverRunner"

if "test" in sys.argv:
    print ("\033[1;91mNo django tests.\033[0m")
    print ("Try: \033[1;33mpy.test\033[0m")
    sys.exit(0)

# Configuration for sending notifications
NOTIFICATIONS_CUSTOM_FILTER = False

# MDRENDER
MDRENDER_CACHE_ENABLE = True
MDRENDER_CACHE_MIN_SIZE = 40
MDRENDER_CACHE_TIMEOUT = 86400
