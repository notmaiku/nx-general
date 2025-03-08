import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import Layout from './pages/layout.componenet';
import TopBar from './pages/top-bar.component';


@Component({
  selector: 'analog-app-root',
  imports: [RouterOutlet, Layout, TopBar, FormGroup],
  template: ` <layout>
    <top-bar/>
    <router-outlet></router-outlet>
  </layout>`,
})
export class AppComponent {
  userForm: FormGroup

}
