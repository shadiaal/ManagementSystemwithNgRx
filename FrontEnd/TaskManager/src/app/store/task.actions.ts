import { createAction, props } from '@ngrx/store';

export interface Task {
    id: number;
    task: string;
    completed?: boolean;  
  }
export const addTask = createAction('[Task] Add Task',props<{ task: Task }>());
export const updateTask = createAction( '[Task] Update Task', props<{ task: Task }>());
export const deleteTask = createAction('[Task] Delete Task',props<{ id: number }>());
export const loadTasks = createAction('[Task] Load Tasks');



