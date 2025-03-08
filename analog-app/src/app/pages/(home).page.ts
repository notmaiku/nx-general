import { Component, inject } from '@angular/core';

import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';

import { AnalogWelcomeComponent } from './analog-welcome.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ThreadService } from './services/thread.service';
import { Observable } from 'rxjs';
import { Thread } from '../models';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'analog-app-home',

  imports: [AnalogWelcomeComponent,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    NgFor,
    NgIf,
    CommonModule,
    RouterLink
  ],
  template: `
<main>
  <section hlmCard class="mt-4">
    <div *ngIf="thread$ | async as threads; else loading" >
      <div *ngFor="let thread of threads" class="border-b size-.25 mb-4 last:border-b-0">
        <div hlmCardHeader>
          <h3 hlmCardTitle> <a [routerLink]="['/thread', thread.id]">Go here{{thread.title}}</a></h3>
          <p hlmCardDescription>{{thread.username}}</p>
        </div>
        <p hlmCardContent>{{thread.content}}</p>
      </div>
    </div>
    <ng-template #loading>
      <p>Loading...</p>
    </ng-template>
  </section>
</main>
`,
})
export default class HomeComponent {
  threadService = inject(ThreadService)
  thread$: Observable<Thread[]> = this.threadService.getAll()
}
