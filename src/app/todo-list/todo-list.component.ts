import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/todo';
import { TodoService } from "../shared/todo.service";


@Component({
    selector: 'todo-list',
    templateUrl: '/todo-list.component.html',
    styleUrls: ['/todo-list.component.css']
})

export class TodoList implements OnInit {
    todos: Todo[];
    errorMessage: boolean = false;

    constructor(private todoService: TodoService) {}

    ngOnInit () {this.getTodos();}

    getTodos(){
        this.todoService.getTodos()
            .subscribe(
                todos => this.todos = todos);
    }

    toggleAll() {
        this.todoService.toggleAllTodo();
    }

    deleteAll(){
        this.todos = this.todoService.deleteAllTodo();
    }

    remove(todo: Todo){
        this.todoService.removeTodo(todo);
        this.todoService.check();
    }

    deleteSelected(){
        this.todos = this.todoService.deleteSelectedTodo();
    }

    checkTodo() {
        debugger;
        this.todoService.check();
    }

    get isCheckedAll() {
        return this.todoService.isCheckedAll();
    }

}
