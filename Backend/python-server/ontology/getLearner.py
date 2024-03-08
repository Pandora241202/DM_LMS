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
        ?learner onto:learnerID ?learnerID.
        ?learner onto:qualification ?qualification.
        ?learner onto:backgroundKnowledge ?backgroundKnowledge.
        ?learner onto:active_reflective ?active_reflective.
        ?learner onto:global_sequential ?global_sequential.
        ?learner onto:sensitive_intuitive ?sensitive_intuitive.
        ?learner onto:visual_verbal ?visual_verbal.
        ?learner onto:age ?age.
        ?learner onto:name ?name.
        ?learner onto:gender ?gender.
    }}
"""

qres = g.query(sparql_query)
learners = []

for row in qres:
    learner = {
        "name": "",
        "age": 0,
        "gender": "",
        "learnerID": "",
        "backgroundKnowledge": "",
        "qualification": "",
        "active_reflective": 0,
        "global_sequential": 0,
        "sensitive_intuitive": 0,
        "visual_verbal": 0
    }
    
    learner["name"] = row['name'].value
    learner["age"] = int(row['age'].value)
    learner["gender"] = row['gender'].value
    learner["learnerID"] = row['learnerID'].value
    learner["backgroundKnowledge"] = row['backgroundKnowledge'].value
    learner["qualification"] = row['qualification'].value
    learner["active_reflective"] = int(row['active_reflective'].value)
    learner["global_sequential"] = int(row['global_sequential'].value)
    learner["sensitive_intuitive"] = int(row['sensitive_intuitive'].value)
    learner["visual_verbal"] = int(row['visual_verbal'].value)
    
    learners += [learner]

with open('json/learners.json', 'w') as json_file:
    json.dump(learners, json_file, indent=2)