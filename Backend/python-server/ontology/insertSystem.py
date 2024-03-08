import json

class SystemOntology:
    def addLearner(self, newLearners):
        learners = ""
        
        for newLearner in newLearners:
            learner = f"""
        <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learner{'-' + newLearner["learnerID"]}">
            <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner"/>
            <system-ontology:learnerID>{newLearner["learnerID"]}</system-ontology:learnerID>
            <system-ontology:name>{newLearner["name"]}</system-ontology:name>
            <system-ontology:gender>{newLearner["gender"]}</system-ontology:gender>
            <system-ontology:age rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner["age"]}</system-ontology:age>
            <system-ontology:qualification>{newLearner["qualification"]}</system-ontology:qualification>
            <system-ontology:backgroundKnowledge>{newLearner["backgroundKnowledge"]}</system-ontology:backgroundKnowledge>
            <system-ontology:active_reflective rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner["active_reflective"]}</system-ontology:active_reflective>
            <system-ontology:visual_verbal rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner["visual_verbal"]}</system-ontology:visual_verbal>
            <system-ontology:global_sequential rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner["global_sequential"]}</system-ontology:global_sequential>
            <system-ontology:sensitive_intuitive rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{newLearner["sensitive_intuitive"]}</system-ontology:sensitive_intuitive>
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
        <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_material{'-' + lm["lmID"].replace(" ", "_")}">
            <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learning_Material"/>
            <system-ontology:difficulty rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm["difficulty"]}</system-ontology:difficulty>
            <system-ontology:learning_resouce_type>{lm["learning_resouce_type"]}</system-ontology:learning_resouce_type>
            <system-ontology:lmID>{lm["lmID"]}</system-ontology:lmID>
            <system-ontology:material_ratings rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm["material_ratings"]}</system-ontology:material_ratings>
            <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm["score"]}</system-ontology:score>
            <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">{lm["time"]}</system-ontology:time>
            <system-ontology:topic>{lm["topic"]}</system-ontology:topic>
        </owl:NamedIndividual>
        
        
        
        """
            learning_materials += learning_material
            
        return learning_materials

    def addOnto(self, learners, logs, lms):
        rdf_file = 'rdf/system-onto.rdf'
        with open(rdf_file, 'r') as file:
            ontology = file.read()

        index = len(ontology) - len("<!-- // index to add // -->") - len('</rdf:RDF>') - 1
        newOntology = ontology[:index] + self.addLM(lms) + self.addLog(logs) + self.addLearner(learners) + ontology[index:]
            
        with open(rdf_file, 'w') as file:
            file.write(newOntology)

if __name__ == "__main__":
    system_onto = 'json/system-onto.json'
    learner_file = 'json/learners.json'
    log_file = 'json/logs.json'
    lm_file = 'json/lms.json'
    
    
    with open(learner_file, 'r') as json_file:
        newLearners = json.load(json_file)
    
    with open(log_file, 'r') as json_file:
        newLogs = json.load(json_file)
        
    with open(lm_file, 'r') as json_file:
        newLMs = json.load(json_file)
        
    ontology = SystemOntology().addOnto(newLearners, newLogs, newLMs)