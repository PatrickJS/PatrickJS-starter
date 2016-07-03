/**
 * Created by U80830793 on 31.05.2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class PersonDemo {
  nom:string;
  prenom:string;
  sexe:string;

  constructor(private nom:string,
              private prenom:string,
              private sexe:string) {
    this.nom = nom;
    this.prenom = prenom;
    this.sexe = sexe;
  }

  toString():string {
    return this.nom + this.prenom + this.sexe;
  }
}
