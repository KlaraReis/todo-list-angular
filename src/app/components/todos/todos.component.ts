import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];

  inputTodo: string = '';

  constructor() {}

  async ngOnInit() {
    this.todos = (await axios.get('http://localhost:8000/', {
      headers: {
        'X-CSRFTOKEN':
          '3zf2mziv3lrY1zjcCpcV55KZLQGUUJliYdcCY646oqnBxGSkXhFAQcw3znZhT6tA',
      },
    })).data;
  }
  toggleDone(id: Number | undefined) {
    const todo = this.todos.find(item => item.id === id);
    if(todo && todo.Completed != null) {
      todo.Completed = !todo?.Completed
    }
    
    axios.put (`http://localhost:8000/${id}/`, todo)
  }
  deleteTodo(id: Number | undefined) {
    this.todos = this.todos.filter((todo, i) => todo.id !== id);
    axios.delete('http://localhost:8000/delete/' + id, {
      headers: {
        'X-CSRFTOKEN':
          '3zf2mziv3lrY1zjcCpcV55KZLQGUUJliYdcCY646oqnBxGSkXhFAQcw3znZhT6tA',
      },
    });
  }

  addTodo() {
    this.todos.push({
      id: undefined,
      Title: this.inputTodo,
      Completed: false,
    });
    axios.post(
      'http://localhost:8000/create',
      {
        Title: this.inputTodo,
        Description: ' ',
        Date: '2000-01-01',
      },
      {
        headers: {
          'X-CSRFTOKEN':
            '3zf2mziv3lrY1zjcCpcV55KZLQGUUJliYdcCY646oqnBxGSkXhFAQcw3znZhT6tA',
        },
      }
    );
    this.inputTodo = ' ';
  }
}
