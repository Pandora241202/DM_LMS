import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { readFile, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class OntologyService {
  private learners;
  private lms;
  private log;

  constructor(public readonly prismaService: PrismaService) {}

  createLearnerInfo(newLearner: any) {
    let learner = `
      <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learner${'-' + newLearner['learnerID']}">
          <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner"/>
          <system-ontology:learnerID>${newLearner['learnerID']}</system-ontology:learnerID>
          <system-ontology:name>${newLearner['name']}</system-ontology:name>
          <system-ontology:gender>${newLearner['gender']}</system-ontology:gender>
          <system-ontology:age rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['age']}</system-ontology:age>
          <system-ontology:qualification>${newLearner['qualification']}</system-ontology:qualification>
          <system-ontology:backgroundKnowledge>${newLearner['backgroundKnowledge']}</system-ontology:backgroundKnowledge>
          <system-ontology:active_reflective rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['active_reflective']}</system-ontology:active_reflective>
          <system-ontology:visual_verbal rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['visual_verbal']}</system-ontology:visual_verbal>
          <system-ontology:global_sequential rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['global_sequential']}</system-ontology:global_sequential>
          <system-ontology:sensitive_intuitive rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['sensitive_intuitive']}</system-ontology:sensitive_intuitive>
      </owl:NamedIndividual>



      `;
    return learner;
  }

  createLMSInfo(newLMS: any) {
    let learning_material = `
    <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_material${'-' + newLMS['lmID'].replace(' ', '_')}">
        <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learning_Material"/>
        <system-ontology:difficulty rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['difficulty']}</system-ontology:difficulty>
        <system-ontology:learning_resouce_type>${newLMS['learning_resouce_type']}</system-ontology:learning_resouce_type>
        <system-ontology:lmID>${newLMS['lmID']}</system-ontology:lmID>
        <system-ontology:material_ratings rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['material_ratings']}</system-ontology:material_ratings>
        <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['score']}</system-ontology:score>
        <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['time']}</system-ontology:time>
        <system-ontology:topic>${newLMS['topic']}</system-ontology:topic>
    </owl:NamedIndividual>


    `;

    return learning_material;
  }

  createLogInfo(newLog: any) {
    let log = `
    <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_log${'-' + newLog['learnerID'] + '-' + newLog['lmID'].replace(' ', '_')}">
        <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner_Log"/>
        <system-ontology:learnerID>${newLog['learnerID']}</system-ontology:learnerID>
        <system-ontology:lmID>${newLog['lmID']}</system-ontology:lmID>
        <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['score']}</system-ontology:score>
        <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['time']}</system-ontology:time>
        <system-ontology:attempt rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['attempt']}</system-ontology:attempt>
    </owl:NamedIndividual>
    
    

    `;
    return log;
  }

  addOnto(newLearner: string = "", newLMS: string = "", newLog: string = "") {
    let onto = readFileSync(join(process.cwd(), './src/services/ontology/rdf/system-onto.rdf'), 'utf-8');
    const index = onto.length - 16 // index of inser to file system-onto.rdf
    const ontoWrite = onto.substring(0, index) + newLearner + newLMS + newLog + onto.substring(index)
    writeFileSync('./src/services/ontology/rdf/system.rdf', ontoWrite, {flag: 'w'});
  }
}
