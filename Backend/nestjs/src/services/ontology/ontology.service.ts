import { Injectable } from '@nestjs/common';
import { join } from 'path';
import fs = require('fs');
import { graph } from 'rdflib';
class Ontology {
  private filePath: string;
  constructor(type: string) {
    type = 'system';
    this.filePath = `./src/services/ontology/rdf/${type}-onto.rdf`;
  }

  async showRDF() {
    return fs.readFileSync(this.filePath).toString();
  }
}

export class SystemOntology extends Ontology {
  private query: any;
  constructor(type: 'system') {
    super(type);
    this.query = `
                  PREFIX owl: <http://www.w3.org/2002/07/owl#>
                  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
                  PREFIX xml: <http://www.w3.org/XML/1998/namespace>
                  PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
                  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
                  PREFIX onto: <http://www.semanticweb.org/thuha/ontologies/system-ontology#>
                  BASE <http://www.semanticweb.org/thuha/ontologies/system-ontology/>
                  SELECT *
                  WHERE
                  {
                      ?learner onto:qualification "{qualification}".
                      ?learner onto:backgroundKnowledge "{backgroundKnowledge}".
                      ?learner onto:active_reflective "{active_reflective}"^^xsd:decimal.
                      ?learner onto:visual_verbal "{visual_verbal}"^^xsd:decimal.
                      ?learner onto:global_sequential "{global_sequential}"^^xsd:decimal.
                      ?learner onto:sensitive_intuitive "{sensitive_intuitive}"^^xsd:decimal.
                      ?learner onto:learnerID ?learnerID.
                      ?log onto:learnerID ?learnerID.
                      ?log onto:lmID ?lmID.
                      ?log onto:attempt ?attempt.
                      ?log onto:score ?score.
                      ?log onto:time ?time.
                      ?lm onto:lmID ?lmID.
                      ?lm onto:material_ratings ?rating.
                      ?lm onto:topic ?topicID.
                      ?lm onto:score ?maxScore.
                      ?lm onto:time ?maxTime.
                      ?lm onto:difficulty ?difficulty.
                  }`;
    var endpoint = 'http://localhost:8181/ontology';
    var queryUrl = encodeURI(endpoint + '?query=' + this.query);
    var fet = fetch(queryUrl)
      .then((resp) => resp.json())
      .then(function (data) {
        console.log(data);
      });
  }
}

export class TopicOntology extends Ontology {
  constructor(type: 'system') {
    super(type);
  }

  async addTopic() {}
}

@Injectable()
export class OntologyService {}
