class Config(object):
    DEBUG = False
    TESTING = False
    DATABASE_URI = 'sqlite:///:memory:'


class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'


class DevelopmentConfig(Config):
    DYNAMO_ENDPOINT = 'http://localhost:4569'  # localstack
    # DYNAMO_ENDPOINT = 'http://localhost:8000' # local dynamodb
    S3_ENDPOINT = 'http://localhost:4572'# localstack
    TABLE_USERS = "users"
    BUCKET_HK = "healthkitdata"
    DEBUG = True
    DYNAMO_ENABLE_LOCAL = True
    DYNAMO_LOCAL_HOST = "localhost"
    DYNAMO_LOCAL_PORT = 8000


class TestingConfig(Config):
    TESTING = True
