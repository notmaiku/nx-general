import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'board-home',
  
  imports: [AnalogWelcomeComponent],
  template: `
     <board-analog-welcome/>
  `,
})
export default class HomeComponent {
}
