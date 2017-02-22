import { Injectable } from '@angular/core';
import { Todo } from './todo';
import {Http, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';



@Injectable()
export class TodoService {
    todos: Todo[];
    checkedAll: boolean = false;


    private todosUrl = 'http://localhost:3001/api/todo';

    constructor(private http: Http){}

    getTodos(): Observable <Todo[]> {

        return this.http.get(this.todosUrl)
                        .map(this.extractData)
                        .map((todos) => this.todos = todos)
                        .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };

    }
    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }



    removeTodo(todo: Todo) {
        const index = this.todos.indexOf(todo);
        if(index > -1){
            this.todos.splice(index,1);
        }
        
    }

    checkedForDuplicate(title: string) {
        let duplicate = false;
        this.todos.forEach((index) => {
            if(!duplicate && index.title === title) duplicate = true;
        });
        return duplicate;
    }

    createItemTodo (title: string) {
        if(!!title && title.trim()){
            title = title.trim();

            const todo = new Todo(title);
            this.checkedAll = false;

            return this.http
                .post('http://localhost:3001/api/todo',{title: title})
                .toPromise()
                .then((res: any) => res.json())
                .then(todo  => {
                    this.todos.push(todo)
                })
                .catch(this.handleError);

        }
        
    }

    deleteAllTodo(){
        this.todos = [];
        return this.todos;
    }

    toggleAllTodo(disable: boolean = false){
        if (!disable) this.checkedAll = !this.checkedAll;

        this.todos.forEach((todo) => {
            todo.completed = this.checkedAll;
        });
    }

    deleteSelectedTodo(){
        this.todos = this.todos.filter((todo) => {
            return !todo.completed;
        });
        return this.todos;
    }

    isCheckedAll()  {
        return this.checkedAll;
    }

    check(){
        this.checkedAll = this.todos.filter(item => { return !item.completed; }).length === 0;
    }

}
