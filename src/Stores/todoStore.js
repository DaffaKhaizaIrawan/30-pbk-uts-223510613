// src/stores/todoStore.js
import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    nextId: 1,
    hideCompleted: false
  }),
  getters: {
    visibleTodos(state) {
      return state.hideCompleted ? state.todos.filter(todo => !todo.completed) : state.todos;
    }
  },
  actions: {
    addTodo(text) {
      if (text.trim() !== '') {
        this.todos.push({
          id: this.nextId++,
          text,
          completed: false
        });
        this.saveToLocalStorage();
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveToLocalStorage();
    },
    completeTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
        this.saveToLocalStorage();
      }
    },
    unCompleteTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = false;
        this.saveToLocalStorage();
      }
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
      this.saveToLocalStorage();
    },
    toggleHideCompleted() {
      this.hideCompleted = !this.hideCompleted;
    },
    saveToLocalStorage() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    },
    loadFromLocalStorage() {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        this.todos = JSON.parse(savedTodos);
        this.nextId = Math.max(...this.todos.map(todo => todo.id)) + 1;
      }
    }
  }
});
