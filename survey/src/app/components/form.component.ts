import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { shareReplay, Subject, switchMap } from 'rxjs';
import { injectTrpcClient } from '../../trpc-client';
import { newfield } from '../models/newField';

@Component({
  selector: 'dynamic-form',
  imports: [AsyncPipe, FormsModule, NgFor, DatePipe, NgIf, CommonModule],
  standalone: true,
  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
<main class="flex-1 mx-auto flex-col">
  @if(getformDatalength() === 0){
    <form
      class="mt-8 pb-2 flex items-center flex-col gap-2"
      #f="ngForm"
      (ngSubmit)="submit(f)"
    >
      <button type="submit" [disabled]="!f.form.valid">Submit</button>
      <section *ngFor="let newField of newForm; trackBy: getId">
        <input
          required
          autocomplete="off"
          [name]="newField.fieldName"
          [(ngModel)]="newField.fieldName"
          [ngModelOptions]="{standalone: true}"
          class="w-full inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:text-zinc-950 h-11 px-2 rounded-md"
        />
      </section>
      <button
        class="ml-2 inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-zinc-100 hover:text-zinc-950 h-11 px-8 rounded-md"
        (click)="newField()"
      >
        +
      </button>
    </form>
  }@else{
    <section *ngFor="let field of formData; trackBy: getId" >
      <article>
        <h2>Survey</h2>
        <label for="survey-field">{{field.fieldName}}</label>
        <input
          required
          autocomplete="off"
          name="survey-field"
          [(ngModel)]="formData[field.id]"
          class="w-full inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:text-zinc-950 h-11 px-2 rounded-md"
        />
      </article>
    </section>
  }
</main>
`,
})
export class DynamicForm {
  @Input() formData: newfield[] = [];
  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public notes$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.note.list.query()),
    shareReplay(1)
  );
  public surveyFields!: newfield[]
  public newForm: newfield[] = [{ id: this.generateRandomId(), fieldName: '' }]
  public form!: NgForm

  newField() {
    this.newForm.push({ id: this.generateRandomId(), fieldName: '' })
  }

  getId(_index: number, field: any): number {
    return field.id
  }
  getformDatalength() {
    return this.formData.length
  }
  submit(form: NgForm) {
    if (form.valid)
      console.log(this.newForm)
  }

  generateRandomId(): number {
    return Math.floor(Math.random() * 1000000); // Adjust the range as needed
  }
  getModelToUse(theField: newfield) {
    return this.newForm.find(n => n.id === theField.id)
  }
}
