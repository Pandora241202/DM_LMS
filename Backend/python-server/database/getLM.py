import rdflib
import json
import os

g = rdflib.Graph()
g.parse(os.getcwd() + "/ontology/rdf/system-onto.rdf")

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
        ?lm onto:material_ID ?material_ID.
        ?lm onto:learning_resouce_type ?learning_resouce_type.
        ?lm onto:difficulty ?difficulty.
        ?lm onto:material_ratings ?material_ratings.
        ?lm onto:score ?score.
        ?lm onto:time ?time.
        ?lm onto:topic ?topic.
    }}
"""

qres = g.query(sparql_query)
lms = []

for row in qres:
    lm = {
        "material_ID": "",
        "difficulty": "",
        "learning_resouce_type": "",
        "material_ratings": 0,
        "score": 0,
        "time": 0,
        "topic": 0
    }
    

    lm["material_ID"] = row['material_ID'].value
    lm["difficulty"] = float(row['difficulty'].value)
    lm["learning_resouce_type"] = row['learning_resouce_type'].value
    lm["material_ratings"] = int(row['material_ratings'].value)
    lm["score"] = float(row['score'].value)
    lm["time"] = float(row['time'].value)
    lm["topic"] = row['topic'].value
    
    lms += [lm]

with open('json/lms.json', 'w') as json_file:
    json.dump(lms, json_file, indent=2)