import json
from database import *

class SystemOntology:
    def __init__(self):
        self.header = """<?xml version="1.0"?>
<rdf:RDF xmlns="http://www.semanticweb.org/thuha/ontologies/system-ontology/"
     xml:base="http://www.semanticweb.org/thuha/ontologies/system-ontology/"
     xmlns:owl="http://www.w3.org/2002/07/owl#"
     xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
     xmlns:xml="http://www.w3.org/XML/1998/namespace"
     xmlns:xsd="http://www.w3.org/2001/XMLSchema#"
     xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#"
     xmlns:system-ontology="http://www.semanticweb.org/thuha/ontologies/system-ontology#">
    <owl:Ontology rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology"/>\n\n\n"""
        self.footer = "</rdf:RDF>"

    def addLearner(self, newLearners):
        learners = ""
        
        for newLearner in newLearners:
            learner = f"""
        <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learner{'-' + newLearner[0]}">
            <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner"/>
            <system-ontology:learnerID>{newLearner[0]}</system-ontology:learnerID>
            <system-ontology:qualification>{newLearner[1]}</system-ontology:qualification>
            <system-ontology:backgroundKnowledge>{newLearner[2]}</system-ontology:backgroundKnowledge>
            <system-ontology:active_reflective rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner[3]}</system-ontology:active_reflective>
            <system-ontology:visual_verbal rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner[4]}</system-ontology:visual_verbal>
            <system-ontology:global_sequential rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner[5]}</system-ontology:global_sequential>
            <system-ontology:sensitive_intuitive rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner[6]}</system-ontology:sensitive_intuitive>
        </owl:NamedIndividual>



        """
            learners += learner
        
        return learners

    def addLog(self, newLogs):
        learner_logs = ""
        for newLog in newLogs:
            learner_log = f"""
        <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_log{'-' + newLog["learnerID"] + '-' + newLog["lmID"].replace(' ', "_")}">
            <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner_Log"/>
            <system-ontology:learnerID>{newLog["learnerID"]}</system-ontology:learnerID>
            <system-ontology:lmID>{newLog["lmID"]}</system-ontology:lmID>
            <system-ontology:lmID>{newLog["name"]}</system-ontology:lmID>
            <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLog["score"]}</system-ontology:score>
            <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLog["time"]}</system-ontology:time>
            <system-ontology:attempt rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLog["attempt"]}</system-ontology:attempt>
        </owl:NamedIndividual>
        
        
        
        """
            learner_logs += learner_log
        
        return learner_logs

    def addLM(self, newLMs):
        learning_materials = ""
        for lm in newLMs:        
            learning_material = f"""
        <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_material{'-' + lm[0]}">
            <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learning_Material"/>
            <system-ontology:lmID>{lm[0]}</system-ontology:lmID>
            <system-ontology:difficulty rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm[1]}</system-ontology:difficulty>
            <system-ontology:learning_resouce_type>{lm[2]}</system-ontology:learning_resouce_type>
            <system-ontology:material_ratings rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm[3]}</system-ontology:material_ratings>
            <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm[4]}</system-ontology:score>
            <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm[5]}</system-ontology:time>
            <system-ontology:topic>{lm[6]}</system-ontology:topic>
        </owl:NamedIndividual>
        
        
        
        """
            learning_materials += learning_material
            
        return learning_materials

    def addOnto(self):
        # learner_file = 'json/learners.json'
        # log_file = 'json/logs.json'
        # lm_file = 'json/lms.json'
        
        # with open(learner_file, 'r') as json_file:
        #     learners = json.load(json_file)
        
        # with open(log_file, 'r') as json_file:
        #     logs = json.load(json_file)
            
        # with open(lm_file, 'r') as json_file:
        #     lms = json.load(json_file)
            
        conn = connectDatabase()
        
        conn.cursor.execute("SELECT id, qualification, background_knowledge, active_reflective, visual_verbal, global_sequential, sensitive_intuitive FROM leaners")
        learners = conn.cursor.fetchall()
        
        conn.cursor.execute("SELECT  FROM learning_materials")
        lms = conn.cursor.fetchall()
        
        conn.cursor.execute("SELECT id, qualification, background_knowledge, active_reflective, visual_verbal, global_sequential, sensitive_intuitive FROM learning_materials")
        logs = conn.cursor.fetchall()
        
        
        rdf_file = 'rdf/system-onto.rdf'
        newOntology = self.header + self.addLM(lms) + self.addLog(logs) + self.addLearner(learners) + self.footer     
        with open(rdf_file, 'w') as file:
            file.write(newOntology)    