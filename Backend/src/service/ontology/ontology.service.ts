import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OntologyService {
  private learners;
  private lms;
  private log;

  constructor(public readonly prismaService: PrismaService) {
    this.learners = await this.prismaService.learner.findMany({
      select: {
        id: true,
        user: true,
        backgroundKnowledge: true,
        qualification: true,
        activeReflective: true,
        sensitiveIntuitive: true,
        visualVerbal: true,
        globalSequential: true,
      },
    });

    this.lms = await this.prismaService.learningMaterial.findMany({
      select: {
        id: true,
        difficulty: true,
        type: true,
        rating: true,
        score: true,
        time: true,
        Topic: { select: { id: true } },
      },
    });

    this.log = await this.prismaService.learnerLog.findMany({
      select: {
        id: true,
        learningMaterial: { select: { id: true } },
        learner: { select: { id: true } },
        score: true,
        time: true,
        attempts: true,
      },
  });
}

  addLearner(newLearner: any) {
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
}
