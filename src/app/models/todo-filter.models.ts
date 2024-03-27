import { TodoItemSeverity } from "./todo.models";

export type TodoFilterCompleted =  null | boolean;
export type TodoFilterSeverity =  null | TodoItemSeverity;

export interface TodoFilter {
    completed: TodoFilterCompleted;
    severity: TodoFilterSeverity;
    searchText: string;
}