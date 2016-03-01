import {NG_VALIDATORS, Validator, Control} from 'angular2/common';
import {Directive, Input, provide} from 'angular2/core';


@Directive({
    selector: '[pattern]',
    providers: [provide(NG_VALIDATORS, {useExisting: PatternValidator, multi: true})]
})
export class PatternValidator implements Validator {
    @Input('pattern') pattern: string;

    validate(c: Control): {[key: string]: any} {
        if(c.value && c.value.match(new RegExp(this.pattern)) ) {
            return null;
        } else {
            return {pattern: true};
        }
    }
}
