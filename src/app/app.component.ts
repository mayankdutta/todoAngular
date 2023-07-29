import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { iTodoItem } from './models/todo-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'codingNinja';
  userTodoList: iTodoItem[] = [];
  newData: any = {};

  constructor(private todoService: TodoService) {
    this.userTodoList = todoService.todoList;
  }

  onSubmit(data: NgForm) {
    this.userTodoList = this.todoService.add({
      ...data.value,
      id: this.todoService.todoList.length + 1,
    });

    console.log(this.todoService.todoList);
  }

  deleteTask(id: number) {
    this.userTodoList = this.todoService.deleteTask(id);
  }

  addTask() {
    this.userTodoList = this.todoService.add({
      ...this.newData,
      id: this.userTodoList.length + 1,
    });

    this.newData = {}
  }

  onChange(event: any, id: number) {
    this.userTodoList = this.todoService.updateTask(id, {
      [event.target.value]: event.target.value,
    });
  }

  sortAsc(attribute: string) {
    this.userTodoList = this.todoService.sortAsc(attribute);
  }
  sortDesc(attribute: string) {
    this.userTodoList = this.todoService.sortDesc(attribute);
  }

  protected readonly onkeyup = onkeyup;
}
