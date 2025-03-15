

import { createAction, props } from '@ngrx/store';


export interface Task {
  id: number;
  task: string;
  completed: boolean;
}




export const loadTasks = createAction('[Task] Load Tasks');
export const loadTasksSuccess = createAction('[Task] Load Tasks Success', props<{ tasks: Task[] }>());
export const loadTasksFailure = createAction('[Task] Load Tasks Failure', props<{ error: string }>());

export const addTask = createAction('[Task] Add Task', props<{ task: Task }>());


export const updateTask = createAction('[Task] Update Task', props<{ task: Task }>());


export const deleteTask = createAction('[Task] Delete Task', props<{ id: number }>());


