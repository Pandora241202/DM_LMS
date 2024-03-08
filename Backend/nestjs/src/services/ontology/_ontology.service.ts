// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma/prisma.service';
// import { readFileSync, writeFileSync } from 'fs';
// import { join } from 'path';

// @Injectable()
// class Ontology {
//   private filePath: string;
//   private rdf: any;
//   constructor(type: string) {
//     this.filePath = `./src/services/ontology/rdf/${type}-onto.rdf`;
//     this.rdf = this.rdf.graph();
//   }

//   addNode(nodeInput: string, type: 'system' | 'topic') {
//     let onto = readFileSync(join(process.cwd(), this.filePath), 'utf-8');
//     const index = onto.length - 16; // index of inser to file .rdf
//     const ontoWrite = onto.substring(0, index) + nodeInput + onto.substring(index);
//     writeFileSync(this.filePath, ontoWrite, { flag: 'w' });
//   }

//   showRDF(){
//     return this.rdf
//   }
// }

// export class SystemOntology extends Ontology {
//   constructor(public readonly prismaService: PrismaService) {
//     super('system');
//   }

//   addLearner(newLearner: any) {
//     const learner = `
//       <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learner${'-' + newLearner['learnerID']}">
//           <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner"/>
//           <system-ontology:learnerID>${newLearner['learnerID']}</system-ontology:learnerID>
//           <system-ontology:name>${newLearner['name']}</system-ontology:name>
//           <system-ontology:gender>${newLearner['gender']}</system-ontology:gender>
//           <system-ontology:age rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['age']}</system-ontology:age>
//           <system-ontology:qualification>${newLearner['qualification']}</system-ontology:qualification>
//           <system-ontology:backgroundKnowledge>${newLearner['backgroundKnowledge']}</system-ontology:backgroundKnowledge>
//           <system-ontology:active_reflective rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['active_reflective']}</system-ontology:active_reflective>
//           <system-ontology:visual_verbal rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['visual_verbal']}</system-ontology:visual_verbal>
//           <system-ontology:global_sequential rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['global_sequential']}</system-ontology:global_sequential>
//           <system-ontology:sensitive_intuitive rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLearner['sensitive_intuitive']}</system-ontology:sensitive_intuitive>
//       </owl:NamedIndividual>

//       `;
//     this.addNode(learner, 'system');
//   }

//   addLMS(newLMS: any) {
//     const learning_material = `
//     <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_material${'-' + newLMS['lmID'].replace(' ', '_')}">
//         <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learning_Material"/>
//         <system-ontology:difficulty rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['difficulty']}</system-ontology:difficulty>
//         <system-ontology:learning_resouce_type>${newLMS['learning_resouce_type']}</system-ontology:learning_resouce_type>
//         <system-ontology:lmID>${newLMS['lmID']}</system-ontology:lmID>
//         <system-ontology:material_ratings rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['material_ratings']}</system-ontology:material_ratings>
//         <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['score']}</system-ontology:score>
//         <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLMS['time']}</system-ontology:time>
//         <system-ontology:topic>${newLMS['topic']}</system-ontology:topic>
//     </owl:NamedIndividual>

//     `;

//     this.addNode(learning_material, 'system');
//   }

//   addLog(newLog: any) {
//     const log = `
//     <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/ontologies/system-ontology#learning_log${'-' + newLog['learnerID'] + '-' + newLog['lmID'].replace(' ', '_')}">
//         <rdf:type rdf:resource="http://www.semanticweb.org/thuha/ontologies/system-ontology#Learner_Log"/>
//         <system-ontology:learnerID>${newLog['learnerID']}</system-ontology:learnerID>
//         <system-ontology:lmID>${newLog['lmID']}</system-ontology:lmID>
//         <system-ontology:score rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['score']}</system-ontology:score>
//         <system-ontology:time rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['time']}</system-ontology:time>
//         <system-ontology:attempt rdf:datatype="http://www.w3.org/2001/XMLSchema#decimal">${newLog['attempt']}</system-ontology:attempt>
//     </owl:NamedIndividual>

//     `;
//     this.addNode(log, 'system');
//   }

//   sparqlSystem() {
//     // load onto from file
//     const rdf = fromFile();

//     const sparql_query = `
//         PREFIX owl: <http://www.w3.org/2002/07/owl#>
//         PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
//         PREFIX xml: <http://www.w3.org/XML/1998/namespace>
//         PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
//         PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
//         PREFIX onto: <http://www.semanticweb.org/thuha/ontologies/system-ontology#>
//         BASE <http://www.semanticweb.org/thuha/ontologies/system-ontology/>
//         SELECT *
//         WHERE
//         {{
//             ?lm onto:topic "{topicID}".
//             ?lm onto:lmID ?lmID.
//             ?lm onto:material_ratings ?rating.
//             ?lm onto:score ?maxScore.
//             ?lm onto:time ?maxTime.
//             ?lm onto:difficulty ?difficulty.
//         }}
//     `;
//     // g = rdflib.Graph()
//     // g.parse(os.getcwd() + "/ontology/rdf/system-onto.rdf")

//     // lms = []
//     // for row in qres:
//     //     lms += [(int(row["rating"].value), 0, row["lmID"].value)]

//     // return lms
//   }
// }

// export class TopicOntology extends Ontology {
//   addTopic(newTopic: any) {
//     const topic = '';
//     // const topic = `
//     // <owl:NamedIndividual rdf:about="http://www.semanticweb.org/thuha/topic-onto#topic${row[0]}">
//     //     <rdf:type rdf:resource="http://www.semanticweb.org/thuha/topic-onto#Topic"/>
//     //     <topic-onto:topicID>topic${row[0]}</topic-onto:topicID>`

//     // if (row[3] != ""){
//     //   for (const target of row[3].split(','))
//     //       topic += `\n\t\t<topic-onto:link>topic{target}</topic-onto:link>`

//     //   topic += "\n\t</owl:NamedIndividual>\n"
//     // }
//     this.addNode(topic, 'topic');
//   }

//   sparqlTopic() {}
// }
