import rdflib
import json
import os

class SpraqlTopic:
    def __init__(self, startID, endID):
        self.g = rdflib.Graph()
        self.g.parse(os.getcwd() + "/ontology/rdf/topic-onto.rdf")
        self.startID = startID
        self.endID = endID
        
    def DFS(self, stack, path, paths):
        print(stack, path, paths)
        if not stack:
            self.DFS([self.startID] + stack, path + [self.startID], paths)
        else:
            if path != [] and path[-1] == self.endID:
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
            
            qres = self.g.query(sparql_query)
            for row in qres:
                self.DFS([row["topicID"].value] + stack, path + [row["topicID"].value], paths)

    def spraqlTopic(self):
        paths = []
        self.DFS([], [], paths)
        with open(os.getcwd() + '/ontology/json/paths.json', 'w') as json_file:
            json.dump(paths, json_file, indent=2)
        print(paths)    
        return paths