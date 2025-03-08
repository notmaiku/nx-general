import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'pwc-home',

  imports: [AnalogWelcomeComponent],
  template: ` <pwc-analog-welcome /> `,
})
export default class HomeComponent {}
