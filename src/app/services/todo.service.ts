import { Injectable } from '@angular/core';
import { iTodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todoList: iTodoItem[] = [];

  add(todoItem: iTodoItem) {
    this.todoList.push(todoItem);
    this.saveToLocalStorage();

    return this.todoList;
  }

  deleteTask(id: number) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
    this.saveToLocalStorage();
    return this.todoList;
  }

  updateTask(id: number, modifyingData: any) {
    this.todoList = this.todoList.map((value) => {
      if (value.id === id) {
        value.title = modifyingData.title ? modifyingData.title : value.title;
        value.description = modifyingData.description
          ? modifyingData.description
          : value.description;
        value.priority = modifyingData.priority
          ? modifyingData.priority
          : value.priority;
        value.status = modifyingData.status
          ? modifyingData.status
          : value.status;
        value.dueDate = modifyingData.dueDate
          ? modifyingData.dueDate
          : value.dueDate;
      }
      return value;
    });

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
    const savedData = localStorage.getItem('todoList');
    if (savedData) {
      this.todoList = JSON.parse(savedData);
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }

  sortBy = {
    id: (elem1: iTodoItem, elem2: iTodoItem) => {
      return elem1.id - elem2.id;
    },
    title: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.title < elem2.title) return -1;
      if (elem1.title > elem2.title) return +1;
      return elem1.id - elem2.id;
    },
    priority: (elem1: iTodoItem, elem2: iTodoItem) => {
      const check = (attribute: string) => {
        attribute = attribute.toLowerCase();
        if (attribute === 'low') return 1;
        if (attribute === 'medium') return 2;
        return 3;
      };

      let priority1 = check(elem1.priority);
      let priority2 = check(elem2.priority);

      if (priority1 !== priority2) return priority1 - priority2;
      return elem1.id - elem2.id;
    },
    status: (elem1: iTodoItem, elem2: iTodoItem) => {
      const check = (attribute: string) => {
        attribute = attribute.toLowerCase();
        if (attribute === 'done') return 3;
        if (attribute === 'todo') return 2;
        return 1;
      };

      let status1 = check(elem1.status);
      let status2 = check(elem2.status);

      if (status1 !== status2) return status1 - status2;
      return elem1.id - elem2.id;
    },
    dueDate: (elem1: iTodoItem, elem2: iTodoItem) => {
      if (elem1.dueDate < elem2.dueDate) return -1;
      if (elem1.dueDate > elem2.dueDate) return +1;
      return elem1.id - elem2.id;
    },
  };
}
