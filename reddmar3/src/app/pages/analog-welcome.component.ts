import { Component, signal } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { shareReplay, Subject, switchMap, take } from 'rxjs';
import { waitFor } from '@analogjs/trpc';
import { injectTrpcClient } from '../../trpc-client';
import { Note } from '../../db';
import { Thread } from '../../db'


import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';


@Component({
  selector: 'reddmar3-analog-welcome',

  imports: [AsyncPipe, FormsModule, DatePipe,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
  ],
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
    <main class="flex-1 mx-auto">
      @if(threadSignal()){
        @for(thread of threadSignal(); track thread.id){
          <section hlmCard>
            <div hlmCardHeader>
              <h3 hlmCardTitle>{{thread.title}}</h3>
            <p hlmCardDescription>{{thread.username}}</p>
            </div>
            <p hlmCardContent>{{thread.content}}</p>
          </section>
        }
      }@else{
        <div>
          <h3>No Data</h3>
        </div>
    }
    </main>
  `,
})
export class AnalogWelcomeComponent {
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  // public notes$ = this.triggerRefresh$.pipe(
  //   switchMap(() => this._trpc.note.list.query()),
  //   shareReplay(1)
  // );
  public thread$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.thread.list.query()),
    shareReplay(1)
  );
  public newNote = '';

  threadSignal = signal<Thread[] | null>(null)

  constructor() {
    // void waitFor(this.notes$);
    void waitFor(this.thread$);
    this.thread$.subscribe((d) => this.threadSignal.set(d));
    this.triggerRefresh$.next();
  }

  public noteTrackBy = (index: number, note: Note) => {
    return note.id;
  };

  public addNote(form: NgForm) {
    if (!form.valid) {
      form.form.markAllAsTouched();
      return;
    }
    this._trpc.note.create
      .mutate({ note: this.newNote })
      .pipe(take(1))
      .subscribe(() => this.triggerRefresh$.next());
    this.newNote = '';
    form.form.reset();
  }

  public removeNote(id: number) {
    this._trpc.note.remove
      .mutate({ id })
      .pipe(take(1))
      .subscribe(() => this.triggerRefresh$.next());
  }
}
