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
const todo_service_1 = require('../shared/todo.service');
let TodoForm = class TodoForm {
    constructor(todoService) {
        this.todoService = todoService;
        this.duplicate = false;
    }
    ;
    createItem(title) {
        //this.duplicate = this.todoService.checkedForDuplicate(title);
        if (this.duplicate)
            return false;
        this.todoService.createItemTodo(title);
    }
};
TodoForm = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todo-form',
        templateUrl: 'todo-form.component.html',
        styleUrls: ['todo-form.component.css']
    }), 
    __metadata('design:paramtypes', [todo_service_1.TodoService])
], TodoForm);
exports.TodoForm = TodoForm;
//# sourceMappingURL=todo-form.component.js.map