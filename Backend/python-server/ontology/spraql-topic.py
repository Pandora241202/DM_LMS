import rdflib
import json

g = rdflib.Graph()
g.parse("rdf/topic-onto.rdf")

startID = "Matrices and linear algebra fundamentals"
endID = "Machine Learning"

paths = []

def DFS(stack, endID, path, paths):
    if not stack:
        DFS([startID] + stack, endID, path + [startID], paths)
    else:
        if path != [] and path[-1] == endID:
            paths += [path]
            return
        
        sparql_query = f"""
            PREFIX : <http://www.semanticweb.org/thuha/topic-onto/>
            PREFIX owl: <http://www.w3.org/2002/07/owl#>
            PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
            PREFIX xml: <http://www.w3.org/XML/1998/namespace>
            PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
            PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
            PREFIX topics: <http://www.semanticweb.org/thuha/topic-onto#>
            BASE <http://www.semanticweb.org/thuha/topic-onto/>
            SELECT *
            WHERE
            {{
                ?start topics:topicID "{stack[0]}".
                ?start topics:link ?topicID.
            }}
        """
        
        qres = g.query(sparql_query)
        for row in qres:
            DFS([row["topicID"].value] + stack, endID, path + [row["topicID"].value], paths)

DFS([], endID, [], paths)

for path in paths:
    for topic in path:
        print(topic)
        
    print("\n================================")
    
with open('json/paths.json', 'w') as json_file:
    json.dump(paths, json_file, indent=2)