import {Component} from 'angular2/core';


@Component({
  selector: 'app',
  providers: [],
  templateUrl: 'app/application.html',
  directives: [],
  pipes: []
})
export class Application {
  defaultMeaning: number = 42;
  helloMsg:string = "This is my first component";
  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}
