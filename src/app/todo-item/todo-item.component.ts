import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../shared/todo';


@Component({
    selector: 'todo-item',
    templateUrl: '/todo-item.component.html',
    styleUrls: ['/todo-item.component.css']
})

export class TodoItem {
    @Input () todo: Todo;
    @Output () remove = new EventEmitter();


    onDelete() {
        this.remove.emit(this.todo);
    }



}
