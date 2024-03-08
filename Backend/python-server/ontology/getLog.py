import rdflib
import json

g = rdflib.Graph()
g.parse("rdf/system-onto.rdf")

sparql_query = f"""
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX xml: <http://www.w3.org/XML/1998/namespace>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX onto: <http://www.semanticweb.org/thuha/ontologies/system-ontology#>
    BASE <http://www.semanticweb.org/thuha/ontologies/system-ontology/>
    SELECT *
    WHERE
    {{
        ?log onto:learnerID ?learnerID.
        ?log onto:material_visited ?material_visited.
        ?log onto:score ?score.
        ?log onto:time ?time.
        ?log onto:attempt ?attempt.
    }}
"""

qres = g.query(sparql_query)
logs = []

for row in qres:
    log = {
        "learnerID": "",
        "material_visited": "",
        "score": "",
        "time": 0,
        "attempt": 0
    }
    
    log["learnerID"] = row['learnerID'].value
    log["material_visited"] = row['material_visited'].value
    log["score"] = float(row['score'].value)
    log["time"] = float(row['time'].value)
    log["attempt"] = int(row['attempt'].value)
    
    logs += [log]

with open('json/logs.json', 'w') as json_file:
    json.dump(logs, json_file, indent=2)