import { Injectable } from '@angular/core';
import { iTodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: Array<iTodoItem> = [];

  add(todoItem: iTodoItem) {
    this.todoList.push(todoItem);
    this.saveToLocalStorage();
  }

  deleteTask(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
    return this.todoList;
  }

  sortAsc(attribute: string) {
    if (attribute === 'id') this.todoList.sort(this.sortBy.id);
    if (attribute === 'title') this.todoList.sort(this.sortBy.title);
    if (attribute === 'priority') this.todoList.sort(this.sortBy.priority);
    if (attribute === 'status') this.todoList.sort(this.sortBy.status);
    if (attribute === 'dueDate') this.todoList.sort(this.sortBy.dueDate);

    return this.todoList;
  }

  sortDesc(attribute: string) {
    this.todoList = this.sortAsc(attribute);
    this.todoList.reverse();
    return this.todoList;
  }

  constructor() {
    // Fetch data from localStorage when the service is instantiated
    const savedData = localStorage.getItem('todoList');
    if (savedData) {
      this.todoList = JSON.parse(savedData);
    }
  }

  private saveToLocalStorage() {
    // Save data to localStorage whenever the todoList is updated
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  sortBy = {
    id: (elem1: iTodoItem, elem2: iTodoItem) => {
      return elem1.id - elem2.id;
    },
    title: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.title < elem2.title) return -1;
      if (elem1.title > elem2.title) return +1;
      return 0;
    },
    priority: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.priority < elem2.priority) return -1;
      if (elem1.priority > elem2.priority) return +1;
      return 0;
    },
    status: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.status < elem2.status) return -1;
      if (elem1.status > elem2.status) return +1;
      return 0;
    },
    dueDate: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.dueDate < elem2.dueDate) return -1;
      if (elem1.dueDate > elem2.dueDate) return +1;
      return 0;
    },
  };

}
