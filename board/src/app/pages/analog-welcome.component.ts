import { Component } from '@angular/core';

@Component({
  selector: 'board-analog-welcome',

  host: {
    class:
      'flex min-h-screen flex-col text-zinc-900 bg-zinc-50 px-4 pt-8 pb-32',
  },
  template: `
    <main class="flex-1 mx-auto">

    </main>
  `,
})
export class AnalogWelcomeComponent {
  todosList: Todo[]
}
}
