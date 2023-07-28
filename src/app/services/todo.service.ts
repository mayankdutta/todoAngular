import { Injectable } from '@angular/core';
import { iTodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})

export class TodoService {
  todoList: Array<iTodoItem> = [ ]

  add(todoItem: iTodoItem) {
    this.todoList.push(todoItem);
  }

  delete(id: number) {
    this.todoList = this.todoList.filter(todo => todo.id !== id);
  }

  sortPriority() { }
  sortName() {}
  sortId() {}

  constructor() {}
}
