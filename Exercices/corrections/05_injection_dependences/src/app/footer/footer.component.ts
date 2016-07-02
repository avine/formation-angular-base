import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-footer',
  template: `
    <footer>
      <ng-content></ng-content>
    </footer>
  `,
  styleUrls: ['footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
