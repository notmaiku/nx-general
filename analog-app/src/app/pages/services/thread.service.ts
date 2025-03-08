import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Thread } from '../../models';


@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Thread[]>('/api/v1/thread');
  }
  get(id: Number) {
    return this.http.get<Thread>('/api/v1/thread/' + id);
  }
}
