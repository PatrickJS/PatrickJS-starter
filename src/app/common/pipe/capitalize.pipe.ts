import {Pipe} from 'angular2/core'

@Pipe({ name: 'capitalize' })
export class CapitalizePipe {
  transform(value: string) {
    return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, m => m.toUpperCase())
  }
}
