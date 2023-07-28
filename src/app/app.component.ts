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

  constructor(private todoService: TodoService) { }

  onSubmit(data: NgForm) {
    console.log(data.value);
    this.todoService.add(data.value);


    console.log(this.todoService.todoList)
  }

  getValue(value: any) {
    // console.log(value);
  }
}
