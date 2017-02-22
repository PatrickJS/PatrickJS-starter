import { Component } from '@angular/core';
import { TodoService } from '../shared/todo.service';

@Component({
    selector: 'todo-form',
    templateUrl: '/todo-form.component.html',
    styleUrls: ['/todo-form.component.css']
})

export class TodoForm {
    duplicate: boolean = false;

    constructor(private todoService: TodoService){};


    createItem(title: string){
        //this.duplicate = this.todoService.checkedForDuplicate(title);
        if(this.duplicate) return false;
        this.todoService.createItemTodo(title)

    }
}
