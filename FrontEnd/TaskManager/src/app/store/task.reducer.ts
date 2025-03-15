

import { createReducer, on } from '@ngrx/store';
import { Task } from './task.actions';
import { addTask, updateTask, deleteTask, loadTasks, loadTasksSuccess, loadTasksFailure } from './task.actions';

export interface TaskState {
  tasks: Task[];
  error: string | null; 
}

export const initialState: TaskState = {
  tasks: [],
  error: null
};

export const taskReducer = createReducer(
  initialState,
  on(loadTasks, state => ({ ...state, error: null })), 
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, tasks, error: null })), 
  on(loadTasksFailure, (state, { error }) => ({ ...state, error })), 
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task]})),
  on(updateTask, (state, { task }) => ({ ...state, tasks: state.tasks.map(t => (t.id === task.id ? task : t))})),
  on(deleteTask, (state, { id }) => ({ ...state, tasks: state.tasks.filter(task => task.id !== id)}))
);
