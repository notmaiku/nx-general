import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { DynamicForm } from '../components/form.component';

@Component({
  selector: 'survey-home',

  imports: [AnalogWelcomeComponent, DynamicForm],
  template: `<div>
    <dynamic-form></dynamic-form>
  </div>
`,
})
export default class HomeComponent { }
