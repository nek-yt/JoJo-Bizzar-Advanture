import { atom } from "jotai";

export interface Todo {
  id: number;
  name: string;
  email: string;
  job: string;
  completed: boolean;
}

export const dataAtom = atom<Todo[]>([
  { id: 1, name: "Jotai", email: "somthing@gmail.com", job: "Somthing", completed: false },
  { id: 2, name: "Redux", email: "somthing@gmail.com", job: "Somthing", completed: true },
  { id: 3, name: "ChatGPT", email: "somthing@gmail.com", job: "Somthing", completed: false },
  { id: 4, name: "Gemini", email: "somthing@gmail.com", job: "Somthing", completed: false },
  { id: 5, name: "Claude", email: "somthing@gmail.com", job: "Somthing", completed: true },
]);

export const deleteUI = atom(null, (get, set, id: number) => {
  const todos = get(dataAtom);
  set(dataAtom, todos.filter((e) => e.id !== id));
});

export const addUI = atom(null, (get, set, payload: { name: string; email: string; job: string }) => {
  const todos = get(dataAtom);
  const newTodo: Todo = {
    id: Date.now(),
    name: payload.name,
    email: payload.email,
    job: payload.job,
    completed: false,
  };
  set(dataAtom, [...todos, newTodo]);
});

export const editUI = atom(null, (get, set, payload: { id: number; name: string; email: string; job: string }) => {
  const todos = get(dataAtom);
  set(
    dataAtom,
    todos.map((todo) => (todo.id === payload.id ? { ...todo, name: payload.name, email: payload.email, job: payload.job } : todo))
  );
});

export const toggleUI = atom(null, (get, set, id: number) => {
  const todos = get(dataAtom);
  set(
    dataAtom,
    todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  );
});