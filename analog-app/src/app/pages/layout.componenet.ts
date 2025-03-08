import { Component } from '@angular/core';

@Component({
  selector: 'layout',
  template: `
  <section class="grid mx-auto w-[60%]">
    <ng-content></ng-content>
  </section>
  `,
})
export default class Layout {
}

