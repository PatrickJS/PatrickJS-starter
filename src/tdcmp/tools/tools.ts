export class Objector {
  public static clone(obj: any): any {
    let res: any = {};
    for (let attribut in obj) {
      if (typeof obj[attribut] === 'object') {
           res[attribut] = Objector.clone(obj[attribut]);
       } else  {
         res[attribut] = obj[attribut];
      }
    }
    return res;
  }

  public static copy(source: any, target: any) {
    for (let attribut in source) {
      if (typeof source[attribut] === 'object') {
           Objector.copy(source[attribut], target[attribut]);
       } else  {
         target[attribut] = source[attribut];
      }
    }
  }
}
