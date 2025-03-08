import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'reddmar3-home',

  imports: [AnalogWelcomeComponent],
  template: ` <reddmar3-analog-welcome /> `,
})
export default class HomeComponent {}
