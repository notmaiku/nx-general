
import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { DynamicForm } from '../components/form.component';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'answering',

  imports: [AnalogWelcomeComponent, DynamicForm],
  template: `<div>
    <h1>Survey</h1>
    <dynamic-form [formData]="[{id: 1, fieldName: 'Favorite Pokemon'}]"></dynamic-form>
  </div>
`,
})
export default class AnsweringPage {
  pokemon!: Pokemon
}
