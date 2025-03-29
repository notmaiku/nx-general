import { Component } from '@angular/core';
import { JsonFormComponent, JsonFormControls } from './c/json-form.component';
import { injectTrpcClient } from 'dyn-reactive-form/src/trpc-client';
import { shareReplay, Subject, switchMap } from 'rxjs';
import { waitFor } from '@analogjs/trpc';

@Component({
  selector: 'dyn-reactive-form-home',

  imports: [JsonFormComponent],
  template: `
<div *ngIf="form$ | async as data; else loading">
  <app-json-form [jsonFormData]="data"/>
</div>
<ng-template #loading>
  <p>Loading...</p>
</ng-template>
`,
})
export default class HomeComponent {
  constructor() {
    console.log('test')
    void waitFor(this.form$);
    this.triggerRefresh$.next();
  }

  public noteTrackBy = (_index: number, field: JsonFormControls) => {
    return field.name;
  };

  private _trpc = injectTrpcClient();
  public triggerRefresh$ = new Subject<void>();
  public form$ = this.triggerRefresh$.pipe(
    switchMap(() => this._trpc.note.getJsonFile.query()),
    shareReplay(1)
  );
}
