import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'mar3-practice-home',

  imports: [AnalogWelcomeComponent],
  template: ` <mar3-practice-analog-welcome /> `,
})
export default class HomeComponent {}
