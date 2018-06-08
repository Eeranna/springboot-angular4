import { Injectable } from '@angular/core';

@Injectable()
export class TechService {
  technlogies = ['Angular5', 'SpringBoot', 'MongoDB', 'Rest Services', 'CytoScape' , 'Neo4J'];
  constructor() { }
  getTechnologies() {
    return this.technlogies;
  }

}
