import { Component, inject } from '@angular/core';
import { injectActivatedRoute } from '@analogjs/router';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Thread } from '../models';
import { ThreadService } from './services/thread.service';

@Component({
  selector: 'analog-app-home',

  imports: [
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    NgFor,
    NgIf,
    CommonModule
  ],
  template: `
<main>
  <section hlmCard class="mt-4">
    <div *ngIf="thread$ | async as thread; else loading" >
        <div hlmCardHeader>
          <h3 hlmCardTitle>{{thread.title}}</h3>
          <p hlmCardDescription>{{thread.username}}</p>
        </div>
        <p hlmCardContent>{{thread.content}}</p>
</div>
    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  </section>
</main>
`,
})
export default class ThreadComponent {
  private readonly route = injectActivatedRoute();
  threadService = inject(ThreadService)
  thread$!: Observable<Thread>

  ngOnInit() {
    const routeParams = this.route.parent!.snapshot.paramMap;
    const threadId = Number(routeParams.get('id'))
    this.thread$ = this.threadService.get(threadId)
  }
}

