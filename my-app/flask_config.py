# Read more about setting up your flask config here!

class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'sqlite:///:memory:'

class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'

class DevelopmentConfig(Config):
    DB_ENDPOINT='http://localhost:8000'
    DEBUG = True
    DYNAMO_ENABLE_LOCAL = True
    DYNAMO_LOCAL_HOST = "localhost"
    DYNAMO_LOCAL_PORT = 8000

class TestingConfig(Config):
    TESTING = True