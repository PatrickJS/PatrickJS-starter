import {Component, OnInit} from "@angular/core";
import {PersonDemo} from "./persondemo";
import {AutoComplete, Column, DataTable} from "primeng/primeng";
// import {MessageManagerComponent} from "../shared-zas/components/message-manager.component";

@Component({
  selector: 'zas-demo',
  directives: [
    DataTable, Column, AutoComplete
  ],
  template: require('./demo-prime.html'),
  styles: [require('./demo-prime.scss')]
})

export class DemoComponent implements OnInit {

  // Données de démo communes
  private assures:PersonDemo[];

  // Données de démo pour l'autocomplete basic
  private personne:PersonDemo;
  private filteredPeople:PersonDemo[];

  // Données de démo pour l'autocomplete advanced
  private filteredPeopleAdv:PersonDemo[];

  constructor() {
  }

  //
  // constructor(private messages: MessageManagerComponent) {
  // }

  ngOnInit() {
    this.assures = this.sample();

    console.log('hello `Demo` component');
  }

  sample():PersonDemo[] {
    let ret:PersonDemo[] = [
      new PersonDemo('Salou', 'Loic', 'Homme'),
      new PersonDemo('Tatzber', 'Pierre', 'Homme'),
      new PersonDemo('Neuhaus', 'Jean-Baptiste', 'Homme'),
      new PersonDemo('Renevey', 'Gilles', 'Homme'),
      new PersonDemo('Monnier', 'Sandra', 'Femme'),
      new PersonDemo('Nanchen', 'Pierrette', 'Femme')
    ]

    return ret;
  }

  // pour composant "Autocomplete basic"
  colReorder(event:any) {
    // this.messages.setMessage('column reorder: ' + event.columns);

  }

  // pour composant "Autocomplete basic"
  onFilterPerson(p) {
    console.info('query: ' + p.query);
    this.filteredPeople = [];
    for (let i = 0; i < this.assures.length; i++) {
      let assure = this.assures[i];
      if (assure.toString().toLowerCase().indexOf(p.query.toLowerCase()) !== -1) {
        this.filteredPeople.push(assure);
      }
    }
  }

  // pour composant "Autocomplete advanced"
  onFilterPersonAdv(p) {
    console.info('query: ' + p.query);
    this.filteredPeopleAdv = [];
    for (let i = 0; i < this.assures.length; i++) {
      let assure = this.assures[i];
      if (assure.toString().toLowerCase().indexOf(p.query.toLowerCase()) !== -1) {
        this.filteredPeopleAdv.push(assure);
      }
    }
  }

  // pour composant "Autocomplete advanced"
  handleDropdownClickAdv() {
    this.filteredPeopleAdv = [];

    // simule un appel au backend
    setTimeout(() => {
      this.filteredPeopleAdv = this.assures;
    }, 100);
  }

}

