<template>
  <section class="app-container">
    <div class="header">
      <h1 class="title">My Routine App</h1>
      <h5>Daffa Khaiza Irawan <br>223510613</h5>
    </div>
    <div class="content">
      <div class="form-container">
        <form @submit.prevent="addTodo" class="form">
          <label for="simple-search" class="sr-only">Tambah Kegiatan</label>
          <input v-model="newTodo" type="text" id="simple-search" placeholder="Masukkan Kegiatan" required class="input"/>
          <button @click="addTodo" type="button" class="add-btn">Tambah</button>
          <button @click="toggleHideCompleted" class="toggle-btn">
            {{ hideCompleted ? 'Tampilkan Semua' : 'Sembunyikan' }}
          </button>
        </form>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th scope="col">Nama Kegiatan</th>
            </tr>
          </thead>
          <tbody>
            <ul class="todo-list">
              <li scope="row" v-for="todo in visibleTodos" :key="todo.id" class="todo-item">
                <span :class="{ 'completed': todo.completed }" @click="toggleComplete(todo)" class="todo-text">{{ todo.text }}</span>
                <button v-if="!todo.completed" @click="completeTodo(todo.id)" class="status-btn complete-btn">Selesai</button>
                <button v-if="todo.completed" @click="unCompleteTodo(todo.id)" class="status-btn uncomplete-btn">Belum</button>
                <button @click="removeTodo(todo.id)" class="status-btn remove-btn">Hapus</button>
              </li>
            </ul>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useTodoStore } from '../Stores/todoStore';

export default {
  name: 'App',
  setup() {
    const todoStore = useTodoStore();
    const newTodo = ref('');

    onMounted(() => {
      todoStore.loadFromLocalStorage();
    });

    const addTodo = () => {
      todoStore.addTodo(newTodo.value);
      newTodo.value = '';
    };

    const removeTodo = (id) => {
      todoStore.removeTodo(id);
    };

    const completeTodo = (id) => {
      todoStore.completeTodo(id);
    };

    const unCompleteTodo = (id) => {
      todoStore.unCompleteTodo(id);
    };

    const toggleComplete = (todo) => {
      todoStore.toggleComplete(todo);
    };

    const toggleHideCompleted = () => {
      todoStore.toggleHideCompleted();
    };

    const visibleTodos = computed(() => todoStore.visibleTodos);

    return {
      newTodo,
      addTodo,
      removeTodo,
      completeTodo,
      unCompleteTodo,
      toggleComplete,
      visibleTodos,
      hideCompleted: computed(() => todoStore.hideCompleted),
      toggleHideCompleted,
    };
  }
};
</script>

<style>

.app-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* White with transparency */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.title {
  font-size: 2.5em;
  color: #333;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-container {
  display: flex;
  justify-content: center;
}

.form {
  display: flex;
  gap: 5px;
  width: 100%;
  max-width: 600px;
}

.input {
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-btn, .toggle-btn {
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-btn:hover, .toggle-btn:hover {
  background-color: #0056b3;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #533939;
  text-align: left;
}

.todo-list {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #513c3c;
}

.todo-text {
  flex: 5;
  cursor: pointer;
  transition: color 0.3s;
}

.todo-text.completed {
  text-decoration: line-through;
  color: #aaa;
}

.status-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.complete-btn {
  background-color: #28a745;
  color: #fff;
}

.complete-btn:hover {
  background-color: #218838;
}

.uncomplete-btn {
  background-color: #ffc107;
  color: #fff;
}

.uncomplete-btn:hover {
  background-color: #e0a800;
}

.remove-btn {
  background-color: #dc3545;
  color: #fff;
}

.remove-btn:hover {
  background-color: #c82333;
}
</style>
