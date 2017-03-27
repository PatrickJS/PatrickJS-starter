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
const todo_1 = require('../shared/todo');
let TodoItem = class TodoItem {
    constructor() {
        this.remove = new core_1.EventEmitter();
    }
    onDelete() {
        this.remove.emit(this.todo);
    }
};
__decorate([
    core_1.Input(), 
    __metadata('design:type', todo_1.Todo)
], TodoItem.prototype, "todo", void 0);
__decorate([
    core_1.Output(), 
    __metadata('design:type', Object)
], TodoItem.prototype, "remove", void 0);
TodoItem = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'todo-item',
        templateUrl: 'todo-item.component.html',
        styleUrls: ['todo-item.component.css']
    }), 
    __metadata('design:paramtypes', [])
], TodoItem);
exports.TodoItem = TodoItem;
//# sourceMappingURL=todo-item.component.js.map