import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
    @Output() formReady = new EventEmitter<FormGroup>();
    dynamicForm: FormGroup;
    index: number;
    @Input() public credential: FormGroup;
    @Input() public label: string;
    @Input() public block: boolean;
    @Input() public recursiveForm: boolean;

    constructor() { }

    ngOnInit() {
        this.dynamicForm = this.credential;
        this.formReady.emit(this.dynamicForm);
    }

    inputInitialized(name: string, input: FormControl) {
        this.dynamicForm.patchValue({
            [name]: input
        });
    }

    formInitialized(name: string, form: FormGroup) {
        this.dynamicForm.patchValue({
            [name]: form
        });
    }

    credentialKeys(dynamicForm): Array<string> {
        return Object.keys((dynamicForm as FormGroup).controls);
    }

    getClaim(key) {
        return this.credential.get(key) as FormControl;
    }

    valueIsObject(item) {
        const itemValue = (this.credential.get(item) as FormGroup).controls;
        return typeof itemValue === 'object';
    }

    itemKeys(item) {
        return Object.keys((this.credential.get(item) as FormGroup).controls);
    }

}
