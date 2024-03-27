
export type TodoItemSeverity = 'important' | 'usual'
  
export interface TodoItem {
  id: string;
  title: string;
  severity: TodoItemSeverity;
  completed: boolean;
}

