import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'mar4-home',

  imports: [AnalogWelcomeComponent],
  template: ` <mar4-analog-welcome /> `,
})
export default class HomeComponent {}
