import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { TodoList } from './todo-list/todo-list.component';
import { AppComponent } from './app.component';
import { TodoItem } from './todo-item/todo-item.component';
import { TodoForm } from './todo-form/todo-form.component';
import { TodoService } from './shared/todo.service';




@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        TodoList,
        TodoForm,
        TodoItem
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})

export class AppModule {}