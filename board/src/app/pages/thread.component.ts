import { Component } from '@angular/core';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'analog-app-home',
  imports: [AnalogWelcomeComponent, NgFor,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  template: `
<main>
  <section hlmCard class="mt-4">
    <div *ngFor="let thread of threads" class="border-b size-.25 mb-4 last:border-b-0">
      <div hlmCardHeader>
        <h3 hlmCardTitle>{{thread.title}}</h3>
        <p hlmCardDescription>{{thread.username}}</p>
      </div>
      <p hlmCardContent>{{thread.content}}</p>
    </div>
  </section>

</main>
`,
})
export default class ThreadComponent {
  threadService = inject(ThreadService)
}
