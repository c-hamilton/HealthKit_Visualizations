import json

from flask import Flask, current_app, request, g # g is the global context variable
from flask_cors import CORS
from gevent.pywsgi import WSGIServer
import boto3
from botocore.exceptions import ClientError

# TODO MOVE ALL BOKEH LOGIC TO ANOTHER FILE
from bokeh.plotting import Figure
from bokeh.resources import CDN
from bokeh.embed import json_item
from bokeh.layouts import column
from bokeh.models import CustomJS, ColumnDataSource, Slider
from bokeh.sampledata.autompg import autompg
from numpy import cos, linspace
from random import choice
from string import ascii_lowercase

def dynamodb_connection(ddb, app, env= "DEV"):
    # https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.client.run-application-python.01-create-table.html

    if env is not "DEV":
        # TODO change code so that there is only table creation in dev environment
        print("Error! have not implemented production connection!")

    # Create the DynamoDB table.
    try:

        table = ddb.create_table(
            TableName='users',
            KeySchema=[
                {
                    'AttributeName': 'username',
                    'KeyType': 'HASH'
                },
                {
                    'AttributeName': 'last_name',
                    'KeyType': 'RANGE'
                }
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'username',
                    'AttributeType': 'S'
                },
                {
                    'AttributeName': 'last_name',
                    'AttributeType': 'S'
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
        })
        # Wait until the table exists.
        table.meta.client.get_waiter('table_exists').wait(TableName='users')
        # Print out some data about the table.
        print(table.item_count)
    except ClientError as ce:
        if ce.response['Error']['Code'] == 'ResourceInUseException':
            print("Table already exsists and will not create.")
        else:
            print("Unknown exception occurred")
            print(ce.response)

    print(f"There are {ddb.tables.all()} tables in dynamo")
    return ddb


def random_string(stringLength=10):
    letters = ascii_lowercase
    s = ''.join(choice(letters) for i in range(stringLength))
    return s

def create_app(test_config=None):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object('flask_config.DevelopmentConfig')
    dynamo_resource = boto3.resource('dynamodb', endpoint_url=app.config['DB_ENDPOINT'])
    ddb = dynamodb_connection(dynamo_resource, app)

    # TODO refactor this to another "Blueprint file"
    @app.route('/')
    def hello_world():
        return 'Hello, World!'


    @app.route('/plot2')
    def plot2():
        # copy/pasted from Bokeh 'JavaScript Callbacks' - used as an example
        # https://bokeh.pydata.org/en/latest/docs/user_guide/interaction/callbacks.html

        x = [x*0.005 for x in range(0, 200)]
        y = x

        source = ColumnDataSource(data=dict(x=x, y=y))

        plot = Figure(plot_width=400, plot_height=400)
        plot.line('x', 'y', source=source, line_width=3, line_alpha=0.6)

        callback = CustomJS(args=dict(source=source), code="""
            var data = source.data;
            var f = cb_obj.value
            var x = data['x']
            var y = data['y']
            for (var i = 0; i < x.length; i++) {
                y[i] = Math.pow(x[i], f)
            }
            source.change.emit();
        """)

        slider = Slider(start=0.1, end=4, value=1, step=.1, title="power")
        slider.js_on_change('value', callback)
        layout = column(slider, plot)

        return json.dumps(json_item(layout, "myplot"))

    @app.route('/plot1')
    def plot1():
        # copy/pasted from Bokeh Getting Started Guide - used as an example
        grouped = autompg.groupby("yr")
        mpg = grouped.mpg
        avg, std = mpg.mean(), mpg.std()
        years = list(grouped.groups)
        american = autompg[autompg["origin"]==1]
        japanese = autompg[autompg["origin"]==3]

        p = Figure(title="MPG by Year (Japan and US)")

        p.vbar(x=years, bottom=avg-std, top=avg+std, width=0.8,
            fill_alpha=0.2, line_color=None, legend="MPG 1 stddev")

        p.circle(x=japanese["yr"], y=japanese["mpg"], size=10, alpha=0.5,
                color="red", legend="Japanese")

        p.triangle(x=american["yr"], y=american["mpg"], size=10, alpha=0.3,
                color="blue", legend="American")

        p.legend.location = "top_left"
        return json.dumps(json_item(p, "myplot"))

    @app.route('/users/<user_id>', methods = ['GET', 'POST', 'DELETE'])
    def user(user_id):
        users = dynamo_resource.Table('users')
        if request.method == 'GET':
            fe = None
            pe = "#usr, last_name"
            # Expression Attribute Names for Projection Expression only.
            ean = { "#usr": "username", }
            esk = None
            response = users.scan()
            return json.dumps(response, indent=4)

        if request.method == 'POST':
            """modify/update the information for <user_id>"""
            # you can use <user_id>, which is a str but could
            # changed to be int or whatever you want, along
            # with your lxml knowledge to make the required
            # changes
            response = users.put_item(
                       Item={
                           'username': user_id,
                           'last_name': random_string(),
                        }
            )
            return "PutItem succeeded:" + json.dumps(response, indent=4)

        if request.method == 'DELETE':
            """delete user with ID <user_id>"""
            return "TODO"

        else:
            # POST Error 405 Method Not Allowed
            return "Error 405 Method Not Allowed"

    @app.route('/latest')
    def latest():
        # test connection to database (local and prod)
        print(ddb)
        print(ddb.tables.all())
        return f"TODO! Not implemented yet. Dynamo contains {ddb.tables.all()}"

    return app
#     app.run(debug = app.config["DEBUG"])

# Todo not sure if I need this part!
# Using WSGI server to allow self contained server
# http_server = WSGIServer(('', 5000), app)
# http_server.serve_forever()
# print("Listening on HTTP port 5000")
