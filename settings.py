import os

# We want to seamlessy run our API both locally and on Heroku. If running on
# Heroku, sensible DB connection settings are stored in environment variables.
MONGO_URI = os.environ.get('MONGODB_URI', 'mongodb://user:user@localhost:27017/evedemo')

# Enable reads (GET), inserts (POST) and DELETE for resources/collections
# (if you omit this line, the API will default to ['GET'] and provide
# read-only access to the endpoint).
RESOURCE_METHODS = ['GET', 'POST', 'DELETE']

# Enable reads (GET), edits (PATCH) and deletes of individual items
# (defaults to read-only item access).
ITEM_METHODS = ['GET', 'PATCH', 'DELETE']

# We enable standard client cache directives for all resources exposed by the
# API. We can always override these global settings later.
CACHE_CONTROL = 'max-age=20'
CACHE_EXPIRES = 20

schema = {
    # Schema definition, based on Cerberus grammar. Check the Cerberus project
    # (https://github.com/pyeve/cerberus) for details.
    'ps': {
        'type': 'integer'
    },
    "rules": {
        'type': 'list'
    },
    "facets": {
        'type': 'list'
    },
    "p": {
        'type': 'integer'
    },
    "paging": {
        'type': 'dict'
    },
    "components": {
        'type': 'list'
    },
    "total": {
        'type': 'integer'
    },
    "issues": {
        'type': 'list'
    },
    "date": {
        'type': 'string'
    }
}

issues_log = {
    'schema': schema,
}

RENDERERS = [
    'eve.render.JSONRenderer'
]

DOMAIN = {'issues_log': issues_log}
