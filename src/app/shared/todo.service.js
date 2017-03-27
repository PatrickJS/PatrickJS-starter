"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const todo_1 = require('./todo');
const http_1 = require('@angular/http');
const Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
let TodoService = class TodoService {
    constructor(http) {
        this.http = http;
        this.checkedAll = false;
        this.todosUrl = 'http://localhost:3001/api/todo';
    }
    getTodos() {
        return this.http.get(this.todosUrl)
            .map(this.extractData)
            .map((todos) => this.todos = todos)
            .catch(this.handleError);
    }
    extractData(res) {
        let body = res.json();
        return body || {};
    }
    handleError(error) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg;
        if (error instanceof http_1.Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable_1.Observable.throw(errMsg);
    }
    removeTodo(todo) {
        const index = this.todos.indexOf(todo);
        if (index > -1) {
            this.todos.splice(index, 1);
        }
    }
    checkedForDuplicate(title) {
        let duplicate = false;
        this.todos.forEach((index) => {
            if (!duplicate && index.title === title)
                duplicate = true;
        });
        return duplicate;
    }
    createItemTodo(title) {
        if (!!title && title.trim()) {
            title = title.trim();
            const todo = new todo_1.Todo(title);
            this.checkedAll = false;
            return this.http
                .post('http://localhost:3001/api/todo', { title: title })
                .toPromise()
                .then((res) => res.json())
                .then(todo => {
                this.todos.push(todo);
            })
                .catch(this.handleError);
        }
    }
    deleteAllTodo() {
        this.todos = [];
        return this.todos;
    }
    toggleAllTodo(disable = false) {
        if (!disable)
            this.checkedAll = !this.checkedAll;
        this.todos.forEach((todo) => {
            todo.completed = this.checkedAll;
        });
    }
    deleteSelectedTodo() {
        this.todos = this.todos.filter((todo) => {
            return !todo.completed;
        });
        return this.todos;
    }
    isCheckedAll() {
        return this.checkedAll;
    }
    check() {
        this.checkedAll = this.todos.filter(item => { return !item.completed; }).length === 0;
    }
};
TodoService = __decorate([
    core_1.Injectable(), 
    __metadata('design:paramtypes', [http_1.Http])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map