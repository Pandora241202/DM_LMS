import { Controller, Get } from '@nestjs/common';
import { OntologyService } from './ontology.service';

@Controller('ontology')
export class OntologyController {
  constructor(private readonly ontologyService: OntologyService) {}

  @Get('feature-test')
  async getLearners() {
    return this.ontologyService.getLMs();
  }
}
