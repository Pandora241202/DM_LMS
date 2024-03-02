import { Controller, Get } from "@nestjs/common";
import { OntologyService } from "./ontology.service";

@Controller('/ontology')
export class OntologyController {
    constructor(private readonly ontologyService: OntologyService){}

    @Get()
    async getOntologies() {
        return this.ontologyService.addOnto();
    }
}