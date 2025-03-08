import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { shareReplay, Subject, switchMap, take } from 'rxjs';
import { waitFor } from '@analogjs/trpc';
import { injectTrpcClient } from '../../trpc-client';
import { Note } from '../../note';
import { Todo } from './todo';
import { TodoService } from './services/todo.service';


import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';


@Component({
  selector: 'pwc-analog-welcome',

  imports: [AsyncPipe, FormsModule, NgFor, DatePipe, NgIf,
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
      @for (todo of todoList; track todo.id) {
<section hlmCard>
  <div hlmCardHeader>
    <h3 hlmCardTitle>{{todo.title}}</h3>
    <p hlmCardDescription>{{todo.completed}}</p>
  </div>
  <p hlmCardContent>Card Content</p>
  <p hlmCardFooter>Card Footer</p>
</section>

} @empty {
  <p>No items found.</p>
}
    </main>
  `,
})
export class AnalogWelcomeComponent {
  todoService = inject(TodoService)
  todoList!: Todo[]
  todo$ = this.todoService.getTodos()
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public notes$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.note.list.query()),
    shareReplay(1)
  );
  public newNote = '';

  constructor() {
    this.getTodos()
    void waitFor(this.notes$);
    this.triggerRefresh$.next();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(d => this.todoList = d)
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
