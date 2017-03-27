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
const todo_service_1 = require("../shared/todo.service");
let TodoList = class TodoList {
    constructor(todoService) {
        this.todoService = todoService;
        this.errorMessage = false;
    }
    ngOnInit() { this.getTodos(); }
    getTodos() {
        this.todoService.getTodos()
            .subscribe(todos => this.todos = todos);
    }
    toggleAll() {
        this.todoService.toggleAllTodo();
    }
    deleteAll() {
        this.todos = this.todoService.deleteAllTodo();
    }
    remove(todo) {
        this.todoService.removeTodo(todo);
        this.todoService.check();
    }
    deleteSelected() {
        this.todos = this.todoService.deleteSelectedTodo();
    }
    checkTodo() {
        debugger;
        this.todoService.check();
    }
    get isCheckedAll() {
        return this.todoService.isCheckedAll();
    }
};
TodoList = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todo-list',
        templateUrl: 'todo-list.component.html',
        styleUrls: ['todo-list.component.css']
    }), 
    __metadata('design:paramtypes', [todo_service_1.TodoService])
], TodoList);
exports.TodoList = TodoList;
//# sourceMappingURL=todo-list.component.js.map