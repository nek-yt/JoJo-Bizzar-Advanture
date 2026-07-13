// Use separate imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  name: string;
  email: string;
  job: string;
  completed: boolean;
}

export type StatusFilter = "all" | "completed" | "active";

interface TodoState {
  items: Todo[];
  searchQuery: string;
  statusFilter: StatusFilter;
}

const initialState: TodoState = {
  items: [
    { id: 1, name: "Jotai", email: "somthing@gmail.com", job: "Somthing", completed: false },
    { id: 2, name: "Redux", email: "somthing@gmail.com", job: "Somthing", completed: true },
    { id: 3, name: "ChatGPT", email: "somthing@gmail.com", job: "Somthing", completed: false },
    { id: 4, name: "Gemini", email: "somthing@gmail.com", job: "Somthing", completed: false },
    { id: 5, name: "Claude", email: "somthing@gmail.com", job: "Somthing", completed: true },
  ],
  searchQuery: "",
  statusFilter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ name: string; email: string; job: string }>) => {
      state.items.push({
        id: Date.now(),
        name: action.payload.name,
        email: action.payload.email,
        job: action.payload.job,
        completed: false,
      });
    },
    
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    
    editTodo: (state, action: PayloadAction<{ id: number; name: string; email: string; job: string }>) => {
      const item = state.items.find((todo) => todo.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
        item.email = action.payload.email;
        item.job = action.payload.job;
      }
    },
    
    toggleTodo: (state, action: PayloadAction<number>) => {
      const item = state.items.find((todo) => todo.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },

    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    setStatusFilter: (state, action: PayloadAction<StatusFilter>) => {
      state.statusFilter = action.payload;
    },
  },
});

export const { 
  addTodo, 
  deleteTodo, 
  editTodo, 
  toggleTodo, 
  setSearchQuery, 
  setStatusFilter 
} = todoSlice.actions;

export default todoSlice.reducer;

interface RootState {
  todos: TodoState;
}

export const selectFilteredTodos = (state: RootState) => {
  const { items, searchQuery, statusFilter } = state.todos;
  
  return items.filter((todo) => {
    const matchesSearch = 
      todo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.job.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === "all" ||
      (statusFilter === "completed" && todo.completed) ||
      (statusFilter === "active" && !todo.completed);

    return matchesSearch && matchesStatus;
  });
};