
import { Component } from '@angular/core';

@Component({
  selector: 'top-bar',
  template: `
<ul class="flex justify-between m-4">
  <li class="text-base">Logo</li>
  <li class="text-base">Search</li>
  <li class="text-base">Settings</li>

  </ul>
  `,
})
export default class TopBar {
}

