import { Controller } from '@nestjs/common';
import { OntologyService } from './ontology.service';

@Controller('/ontology')
export class OntologyController {
  constructor(private readonly ontologyService: OntologyService) {}
}
