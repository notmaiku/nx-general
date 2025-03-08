
import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { shareReplay, Subject, switchMap, take } from 'rxjs';
import { injectTrpcClient } from '../../trpc-client';

@Component({
  selector: 'dynamic-form',
  imports: [AsyncPipe, FormsModule, NgFor, DatePipe, NgIf, CommonModule],
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
<main class="flex-1 mx-auto">

  <form
    class="mt-8 pb-2 flex items-center"
    #f="ngForm"
    (ngSubmit)="addSurvey(f)"
  >
    <ng-template *ngFor="let field of getKeys(formData)">
      <label class="sr-only" for="dynForm" *ngIf="field == 'name'">name</label>
        <input
        required
        autocomplete="off"
        name="dynForm"
        [(ngModel)]="formData"
        class="w-full inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:text-zinc-950 h-11 px-2 rounded-md"
        />
    </ng-template>
    <button
      class="ml-2 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-zinc-100 hover:text-zinc-950 h-11 px-8 rounded-md"
    >
      +
    </button>
  </form>
/main>
`,
})
export class DynamicForm<T> {
  @Input() formData: T | null = null;
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public notes$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.note.list.query()),
    shareReplay(1)
  );
  public newNote = '';

  addSurvey() { }

  getKeys(obj: any): string[] {
    return Object.keys(obj)
  }

}
