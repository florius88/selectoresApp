import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],

  })

  constructor(private fb: FormBuilder) {}

  guardar() {
    console.log(this.myForm.value);

  }

}
