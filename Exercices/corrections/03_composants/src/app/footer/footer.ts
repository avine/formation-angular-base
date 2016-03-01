import {Component} from "angular2/angular2";

@Component({
	selector: 'footer',
	template: `<div class="row">
                <div class="col-lg-12">
                    <p><ng-content></ng-content></p>
                </div>
            </div>`
})
export class FooterComponent {
	
}