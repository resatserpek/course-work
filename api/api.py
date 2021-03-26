from flask import Flask, request
from rdflib import Graph
import time

from werkzeug.exceptions import RequestHeaderFieldsTooLarge
app = Flask(__name__, static_folder='../build', static_url_path='/')

g = Graph()
g.parse("./data/out.ttl", format="turtle")

@app.route('/')
def index():
    return app.send_static_file('index.html') 


@app.route('/api/time')
def home():
    return{'time': time.time()} 

@app.route('/api/trading')
def trading():
    status = request.args.get('status')
    filter = request.args.get('filter')
    
    if status == 'Trading':
        status = 'Yes'
    elif status == 'Not Trading':
        status = 'No'
    else:
        status = 'Temp No'
    query = """
    PREFIX ex: <http://example.org/>
    PREFIX dcterms: <http://purl.org/dc/terms/>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> 
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    SELECT ?name  ?value
    WHERE {
        ?filter a <http://example.org/""" + filter.replace(' Size','') +"""/>.
        ?continues rdf:value '""" +status + """'.
        ?filter dcterms:title ?name.
        ?filter ?continues ?trd.
        ?trd rdf:value ?value

    }
       
    """
    data = []

    for row in g.query(query):
        name, value = row['name'], row['value']
        data.append({'label': name, 'y': value})
        print(name, value)
    
    return{'data': data}
if __name__ == '__main__':
    # Threaded option to enable multiple instances for multiple user access support
    app.run(threaded=True, port=5000)   
