import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { DynamicForm } from '../components/form.component';
import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'survey-home',

  imports: [AnalogWelcomeComponent, DynamicForm],
  template: `<div>
    <dynamic-form [formData]="pokemon"></dynamic-form>
  </div>
`,
})
export default class HomeComponent {
  pokemon!: Pokemon;
}
